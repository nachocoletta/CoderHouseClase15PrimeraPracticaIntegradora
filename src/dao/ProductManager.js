import ProductModel from '../models/product.model.js';
import { Exception } from '../helpers/utils.js';

export default class ProductManager {
    static async get(query = {}) {
        const criteria = {};
        // if (query.course) {
        //     criteria.course = query.course;
        // }
        return await ProductModel.find(criteria);
    }

    static async getById(pid) {
        const product = await ProductModel.findById(pid);
        // console.log("product", product)
        if (!product) {
            throw new Exception("No existe el producto", 404)
        }
        return product;
    }
    static async create(data) {
        try {
            const product = await ProductModel.create(data);
            console.log(`Producto creado exitosamente`);
            return product;
        } catch (error) {
            console.log(`Error: ${error.message}`);
            throw new Exception(`Ha ocurrido un error en el servidor`, 500)
        }
    }

    static async updateById(pid, data) {
        const product = await ProductModel.findById(pid);
        if (!product) {
            throw new Exception('No existe el producto', 404);
        }
        const criteria = { _id: pid };
        const operation = { $set: data };
        await ProductModel.updateOne(criteria, operation);
        console.log('Producto actualizado correctamente')
    }

    static async deleteById(pid) {
        const product = await ProductModel.findById(pid);
        if (!product) {
            throw new Exception('No existe el producto', 404);
        }
        const criteria = { _id: pid };
        await ProductModel.deleteOne(criteria);
        console.log('Producto eliminado correctamente')
    }
}