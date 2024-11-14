import fs from 'fs';
import path from 'path';

class CartsManager {
    static getAllCarts() {
        const carts = CartsManager.readCarts();
        return carts;
    }

    static createCart() {
        const carts = CartsManager.readCarts();
        const newCart = { id: carts.length + 1, products: [] };
        carts.push(newCart);
        CartsManager.writeCarts(carts);
        return newCart;
    }

    static getCartById(cid) {
        const carts = CartsManager.readCarts();
        return carts.find((c) => c.id === cid);
    }

    static addProductToCart(cid, pid) {
        const carts = CartsManager.readCarts();
        const cart = carts.find((c) => c.id === cid);
        
        if (cart) {
            const existingProduct = cart.products.find((p) => p.product === pid);
            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                cart.products.push({ product: pid, quantity: 1 });
            }
            CartsManager.writeCarts(carts);
            return cart;
        }
        return null;
    }

    static removeProductFromCart(cid, pid) {
        const carts = CartsManager.readCarts();
        const cart = carts.find((c) => c.id === cid);

        if (cart) {
            cart.products = cart.products.filter((p) => p.product !== pid);
            CartsManager.writeCarts(carts);
            return cart;
        }
        return null;
    }

    static readCarts() {
        const cartsPath = path.resolve('src/data/cart.json');
        const carts = JSON.parse(fs.readFileSync(cartsPath, 'utf-8'));
        return carts;
    }

    static writeCarts(carts) {
        const cartsPath = path.resolve('src/data/cart.json');
        fs.writeFileSync(cartsPath, JSON.stringify(carts, null, 2));
    }
}

export default CartsManager;