import express from 'express';
import bodyParser from 'body-parser';
import cartRoutes from './routes/cartRoutes';
import productRoutes from './routes/productRoutes';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/profile/cart', cartRoutes);
app.use('/api/products', productRoutes);

app.use((err: any, req: any, res: any, next: any) => {
  console.error(err.stack);
  res.status(500).json({
    data: null,
    error: {
      message: "Ooops, something went wrong"
    }
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
