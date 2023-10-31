import { Router } from "express";

import { emitFromApi } from '../../socket.js';
// import { ProductManager } from '../../dao/ProductManager.js';


const router = Router();

router.get('/', (req, res) => {
    res.render('products');
})
export default router;