import express from 'express';
import handlebars from 'express-handlebars';
import path from 'path';
import morgan from 'morgan';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import indexRouter from './routers/index.router.js';
// import { __dirname } from './helpers/utils.js';
import productsApiRouter from './routers/api/products.router.js'
// import productsViewRouter from './routers/views/products.router.js'
import cartsApiRouter from './routers/api/carts.router.js'
import products from './routers/views/products.router.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Obtén la ruta del directorio 'src'
const srcDir = dirname(__dirname);

// Obtén la ruta del directorio 'utils' dentro de 'src'
const utilsDir = path.join(srcDir, 'utils');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

const publicDir = path.join(utilsDir, '../public');
app.use(express.static(publicDir));
app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
  res.send('Hello from backend 🖐️');
});

app.use('/api/products', productsApiRouter);
app.use('/api/carts', cartsApiRouter);
app.use('/products', products);

app.use('/', indexRouter);

app.use((error, req, res, next) => {
  const message = `Ah ocurrido un error desconocido 😨: ${error.message}`;
  console.log(message);
  res.status(500).json({ status: 'error', message });
});

export default app;
