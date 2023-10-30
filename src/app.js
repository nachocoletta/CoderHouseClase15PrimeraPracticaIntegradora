import express from 'express';
import handlebars from 'express-handlebars';
import path from 'path';

import indexRouter from './routers/index.router.js';
import { __dirname } from './helpers/utils.js';
import productsApiRouter from './routers/api/products.router.js'
// import productsViewRouter from './routers/views/products.router.js'
import cartsApiRouter from './routers/api/carts.router.js'

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
  res.send('Hello from backend 🖐️');
});

app.use('/api/products', productsApiRouter);
app.use('/api/carts', cartsApiRouter);

app.use('/', indexRouter);

app.use((error, req, res, next) => {
  const message = `Ah ocurrido un error desconocido 😨: ${error.message}`;
  console.log(message);
  res.status(500).json({ status: 'error', message });
});

export default app;
