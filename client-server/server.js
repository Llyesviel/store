const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const { ApolloServer, gql } = require('apollo-server-express');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.static('client-server/public'));

app.get('/api/categories', (req, res) => {
  const products = JSON.parse(fs.readFileSync('./data/products.json', 'utf8'));
  const categories = new Set();
  products.products.forEach(product => {
    product.categories.forEach(category => categories.add(category));
  });
  res.json(Array.from(categories));
});

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

const typeDefs = gql`
  type Product {
    id: ID!
    name: String!
    price: Float!
    description: String!
    categories: [String!]!
  }

  type Query {
    products(category: String): [Product]
    productNames: [Product]
    productPrices(category: String): [Product]
    productDescriptions: [Product]
  }
`;

const resolvers = {
  Query: {
    products: (_, { category }) => {
      const products = JSON.parse(fs.readFileSync('./data/products.json', 'utf8')).products;
      if (category) {
        return products.filter(product => product.categories.includes(category));
      }
      return products;
    },
    productNames: () => {
      const products = JSON.parse(fs.readFileSync('./data/products.json', 'utf8')).products;
      return products.map(({ id, name }) => ({ id, name }));
    },
    productPrices: (_, { category }) => {
      const products = JSON.parse(fs.readFileSync('./data/products.json', 'utf8')).products;
      let filteredProducts = products;
      if (category) {
        filteredProducts = products.filter(product => product.categories.includes(category));
      }
      return filteredProducts.map(({ id, name, price }) => ({ id, name, price }));
    },
    productDescriptions: () => {
      const products = JSON.parse(fs.readFileSync('./data/products.json', 'utf8')).products;
      return products.map(({ id, name, description }) => ({ id, name, description }));
    },
  },
};

async function startApolloServer() {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app });
}

startApolloServer();

app.listen(PORT, () => {
  console.log(`Клиентский сервер запущен на порту ${PORT}`);
}); 