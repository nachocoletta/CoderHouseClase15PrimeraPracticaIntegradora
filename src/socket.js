// socket.js
import { initDb } from './db/mongodb.js'
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import ProductManager from './dao/ProductManager.js';

import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const absolutePath = path.resolve(__dirname, '../src/data/products.json');

let io;


export const init = async (httpServer) => {

    await initDb();

    io = new Server(httpServer);

    io.on('connection', async (socketClient) => {
        io = new Server(httpServer);

        io.on('connection', async (socketClient) => {
            console.log(`Se ha conectado un nuevo cliente 🎉 (${socketClient.id})`);

            const products = await ProductManager.get()
            socketClient.emit('listProducts', products)

            socketClient.on('addProduct', async (newProduct) => {
                await ProductManager.create(newProduct);
                let products = await ProductManager.get();
                io.emit('listProducts', products)
            })

            socketClient.on('deleteProduct', async (productId) => {
                await ProductManager.deleteById(productId);
                let products = await ProductManager.get();
                io.emit('listProducts', products)
            })

            socketClient.on('updateProduct', async (product) => {
                await ProductManager.updateById(product._id, product)
                let products = await ProductManager.get();
                io.emit('listProducts', products)
            })

            socketClient.on('disconnect', () => {
                console.log(`Se ha desconectado el cliente con id ${socketClient.id}`)
            })
        })
        console.log('Server socket running 🚀');
    });
}

export const emitFromApi = (event, data) => io.emit(event, data);
