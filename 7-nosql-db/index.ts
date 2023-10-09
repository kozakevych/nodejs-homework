import express from 'express';
import bodyParser from 'body-parser';
import cartRoutes from './routes/cartRoutes';
import productRoutes from './routes/productRoutes';
import mongoose from 'mongoose';
const uri = 'mongodb://mongoadmin:bdung@localhost:27017';
const PORT = 3000;

const app = express();

async function main() {
  await mongoose.connect(uri);
  app.listen(3000);
  console.log(`Server started on port ${PORT}`);
}

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

main();
