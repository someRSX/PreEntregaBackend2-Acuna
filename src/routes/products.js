import express from 'express';
import { getAllProducts } from '../managers/productsManager.js';

const router = express.Router();

router.get('/realtime', (req, res) => {
  res.render('realTimeProducts');
});

export default router;