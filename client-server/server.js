const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.static('client-server/public'));

// Получение всех категорий
app.get('/api/categories', (req, res) => {
  const products = JSON.parse(fs.readFileSync('./data/products.json', 'utf8'));
  const categories = new Set();
  products.products.forEach(product => {
    product.categories.forEach(category => categories.add(category));
  });
  res.json(Array.from(categories));
});

// Получение товаров с опциональной фильтрацией по категории
app.get('/api/products', (req, res) => {
  const category = req.query.category;
  const products = JSON.parse(fs.readFileSync('./data/products.json', 'utf8'));
  
  if (category) {
    const filteredProducts = {
      products: products.products.filter(product => 
        product.categories.includes(category)
      )
    };
    res.json(filteredProducts);
  } else {
    res.json(products);
  }
});

app.listen(PORT, () => {
  console.log(`Клиентский сервер запущен на порту ${PORT}`);
}); 