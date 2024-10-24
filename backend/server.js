import express, { json } from 'express';
import sequelize from './src/config/database.js';
import cors from 'cors';

import userRoutes from './src/routes/userRoutes.js';
import roleRoutes from './src/routes/roleRoutes.js';
import productRoutes from './src/routes/productRoutes.js';
import supplierRoutes from './src/routes/supplierRoutes.js';
import categoryRoutes from './src/routes/categoryRoutes.js';
import productCategoryRoutes from './src/routes/productCategoryRoutes.js';
import cartRoutes from './src/routes/cartRoutes.js';
import cartItemRoutes from './src/routes/cartItemRoutes.js';

const app = express();
const port = 3000;

// Middleware para parsear JSON
app.use(json());
app.use(cors()); 

// Middleware para las rutas
app.use('/api/users', userRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/product', productRoutes)
app.use('/api/suppliers', supplierRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/product-categories', productCategoryRoutes);
app.use('/api/carts', cartRoutes);
app.use('/api/cart-item', cartItemRoutes)   


// Iniciar el servidor y conectar a la base de datos
sequelize.sync()
  .then(() => {
    app.listen(port, () => {
      console.log(`Servidor escuchando en http://localhost:${port}`);
    });
    console.log('Conexión a la base de datos exitosa.');
  })
  .catch(err => {
    console.error('No se pudo conectar a la base de datos:', err);
  });
