import { Router } from "express";

import { emitFromApi } from '../../socket.js';
import ProductManager from "../../dao/ProductManager.js";
// import { ProductManager } from '../../dao/ProductManager.js';


const router = Router();

router.get('/', (req, res) => {
    res.render('products');
})
// router.get('/', async (req, res) => {
//     let products = await ProductManager.get();
//     console.log("products", products);
//     res.render('productsBis', { products: products.map(p => p.toJSON()) })
// })
export default router;