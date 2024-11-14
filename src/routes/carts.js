import { Router } from 'express';
import CartsManager from '../managers/cartsManager.js';

const router = Router();

router.post('/', (req, res) => {
    const newCart = CartsManager.createCart();
    res.status(201).json(newCart);
});

router.get('/:cid', (req, res) => {
    const cid = parseInt(req.params.cid);
    const cart = CartsManager.getCartById(cid);

    if (cart) {
        res.json(cart.products);
    } else {
        res.status(404).json({ error: 'Cart not found' });
    }
});

router.post('/:cid/product/:pid', (req, res) => {
    const cid = parseInt(req.params.cid);
    const pid = parseInt(req.params.pid);
    const updatedCart = CartsManager.addProductToCart(cid, pid);

    if (updatedCart) {
        res.status(201).json(updatedCart);
    } else {
        res.status(404).json({ error: 'Cart not found' });
    }
});

router.delete('/:cid/product/:pid', (req, res) => {
    const cid = parseInt(req.params.cid);
    const pid = parseInt(req.params.pid);
    const updatedCart = CartsManager.removeProductFromCart(cid, pid);

    if (updatedCart) {
        res.status(204).end();
    } else {
        res.status(404).json({ error: 'Cart not found' });
    }
});

export default router;