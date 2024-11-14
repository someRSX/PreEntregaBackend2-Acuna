import express from 'express';
import path from 'path';
import ProductsManager from '../managers/productsManager.js';

const router = express.Router();
const productsManager = new ProductsManager();

router.get('/', (req, res) => {
  const allProducts = productsManager.getAll();
  res.render('home', { products: allProducts });
});

router.post('/add-product', (req, res) => {
  const { name, price, description } = req.body;
  const newProduct = { name, price, description };
  productsManager.addProduct(newProduct);
  res.redirect('/');
});

export default router;