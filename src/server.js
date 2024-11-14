import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';  
import { engine } from 'express-handlebars';
import http from 'http';
import { Server as SocketIO } from 'socket.io';
import { getAllProducts, addProduct, removeProduct } from './managers/productsManager.js';
import productsRouter from './routes/products.js'; 

const app = express();
const port = 8080;

const __filename = fileURLToPath(import.meta.url);  
const __dirname = path.dirname(__filename);

app.engine('hbs', engine({ 
  extname: 'hbs',
  layoutsDir: false,
  defaultLayout: false 
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../views'));

const server = http.createServer(app);
const io = new SocketIO(server);

app.get('/', (req, res) => {
  res.render('home');
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/products', productsRouter);

io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado');

  socket.emit('productsList', getAllProducts());

  socket.on('addProduct', (product) => {
    addProduct(product);
    io.sockets.emit('productsList', getAllProducts());
  });

  socket.on('removeProduct', (productId) => {
    removeProduct(productId);
    io.sockets.emit('productsList', getAllProducts());
  });

  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

server.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});