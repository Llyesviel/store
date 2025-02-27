const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const app = express();
const PORT = 8080;

// Загрузка Swagger спецификации
const swaggerDocument = YAML.load(path.join(__dirname, 'api-spec.yaml'));

app.use(cors());
app.use(express.json());
app.use(express.static('admin-server'));

// Добавляем Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Добавляем явный маршрут для корневого пути
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin.html'));
});

// Получение всех товаров
app.get('/api/products', (req, res) => {
  const products = JSON.parse(fs.readFileSync('./data/products.json', 'utf8'));
  res.json(products);
});

// Добавление товаров
app.post('/api/products', (req, res) => {
  const products = JSON.parse(fs.readFileSync('./data/products.json', 'utf8'));
  const newProducts = Array.isArray(req.body) ? req.body : [req.body];
  
  newProducts.forEach(product => {
    product.id = Math.max(...products.products.map(p => p.id)) + 1;
    products.products.push(product);
  });

  fs.writeFileSync('./data/products.json', JSON.stringify(products, null, 2));
  res.json({ message: 'Товары успешно добавлены' });
});

// Редактирование товара
app.put('/api/products/:id', (req, res) => {
  const products = JSON.parse(fs.readFileSync('./data/products.json', 'utf8'));
  const id = parseInt(req.params.id);
  const productIndex = products.products.findIndex(p => p.id === id);

  if (productIndex === -1) {
    return res.status(404).json({ message: 'Товар не найден' });
  }

  products.products[productIndex] = { ...products.products[productIndex], ...req.body };
  fs.writeFileSync('./data/products.json', JSON.stringify(products, null, 2));
  res.json({ message: 'Товар успешно обновлен' });
});

// Удаление товара
app.delete('/api/products/:id', (req, res) => {
  const products = JSON.parse(fs.readFileSync('./data/products.json', 'utf8'));
  const id = parseInt(req.params.id);
  const productIndex = products.products.findIndex(p => p.id === id);

  if (productIndex === -1) {
    return res.status(404).json({ message: 'Товар не найден' });
  }

  products.products.splice(productIndex, 1);
  fs.writeFileSync('./data/products.json', JSON.stringify(products, null, 2));
  res.json({ message: 'Товар успешно удален' });
});

app.listen(PORT, () => {
  console.log(`Административный сервер запущен на порту ${PORT}`);
}); 