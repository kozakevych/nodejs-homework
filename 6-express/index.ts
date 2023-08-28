import express from 'express';
import bodyParser from 'body-parser';
import cartRoutes from './routes/cartRoutes';
import productRoutes from './routes/productRoutes';

const app = express();

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/profile/cart', cartRoutes);
app.use('/api/products', productRoutes);

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
