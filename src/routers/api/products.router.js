import { Router } from "express";
import ProductManager from "../../dao/ProductManager.js";

const router = Router();

router.get('/', async (req, res) => {
    const products = await ProductManager.get()
    res.status(200).json(products);
})

router.get('/:pid', async (req, res) => {
    try {
        const { pid } = req.params;

        const product = await ProductManager.getById(pid);
        res.status(200).json(product);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message })
    }
})


router.post('/', async (req, res) => {
    const { body } = req;

    try {
        const product = await ProductManager.create(body);
        res.status(201).json(product);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
})

router.put('/:pid', async (req, res) => {
    const { pid } = req.params;
    const { body } = req
    try {
        await ProductManager.updateById(pid, body)
        res.status(204).end();
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message })
    }
})

router.delete('/:pid', async (req, res) => {
    try {
        const { pid } = req.params;

        await ProductManager.deleteById(pid);
        res.status(204).end();
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message })
    }
})

export default router;