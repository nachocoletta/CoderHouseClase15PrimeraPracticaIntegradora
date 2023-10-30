import { Router } from "express";
import CartManager from "../../dao/CartManager.js";

const router = Router();

router.get('/', async (req, res) => {
    const carts = await CartManager.get();
    res.status(200).json(carts);
});

router.get('/:cid', async (req, res) => {
    try {
        const { cid } = req.params;
        const cart = await CartManager.getById(cid);
        res.status(200).json(cart)
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message })
    }
})

router.post('/', async (req, res) => {
    try {
        const cart = await CartManager.create();
        res.status(201).json(cart);
    } catch (error) {
        console.error("Error al crear el carrito", error)
        res.status(error.statusCode || 500).json({ message: error.message })
    }
});

router.post('/:cartId', async (req, res) => {
    try {
        const { cartId } = req.params
        const { productId, quantity } = req.body;
        const product = await CartManager.addProductToCart(cartId, productId, quantity)
        res.status(201).json(product)
    } catch (error) {
        console.error(error.message)
        res.status(error.statusCode || 500).json({ message: error.message })
    }
})

router.delete('/:cartId', async (req, res) => {
    const { cartId } = req.params;

    try {
        await CartManager.deleteById(cartId);
        res.status(204).end();
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message })
    }
})

export default router;