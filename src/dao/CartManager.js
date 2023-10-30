import CartModel from "../models/cart.model.js";
import { Exception } from '../helpers/utils.js';

export default class CartManager {
    static async get(query = {}) {
        const criteria = {};
        return await CartModel.find(criteria)
    }

    static async getById(cid) {
        const cart = await CartModel.findById(cid);
        if (!cart) {
            throw new Exception('No existe el carrito', 404)
        }
        return cart;
    }

    static async create() {
        try {
            const cart = await CartModel.create({})
            return cart;
        } catch (error) {
            console.error('Error al crear el carrito', error.message)
            throw new Exception("No se pudo crear el carrito ", 500);
        }
    }

    static async addProductToCart(cartId, productId, quantity) {
        try {
            const cart = await CartModel.findById(cartId);

            if (!cart) {
                throw new Exception('No se encontro el carrito', 404)
            }
            const existingProductIndex = cart.products.findIndex(
                (product) => product.productId === productId
            );

            if (existingProductIndex !== -1) {
                cart.products[existingProductIndex].quantity += quantity
            } else {
                cart.products.push({ productId, quantity })
            }
            const updatedCart = await cart.save();
            // const productAndQuantity = await CartModel.findByIdAndUpdate(
            //     cartId,
            //     { $push: { products: { productId, quantity } } },
            //     { new: true }
            // )
            // return productAndQuantity
            return updatedCart;
        } catch (error) {
            console.error("Error", error.message);
            throw new Exception("Error al agregar producto al carrito", 500)

        }
    }

    static async deleteById(cid) {
        const cart = await CartModel.findById(cid);

        if (!cart) {
            throw new Exception('No existe el carrito', 404);
        }
        const criteria = { _id: cid };
        await CartModel.deleteOne(criteria)
        console.log('Carrito eliminado correctamente')
    }
} 