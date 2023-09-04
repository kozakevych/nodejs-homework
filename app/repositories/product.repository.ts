import { ProductEntity } from '../entities/product.entity';
import Product from '../models/product';

async function getProducts() {
  try {
    const productsList = await Product.findAll();
    return productsList;
  } catch (error) {
    console.error('Error fetching Products:', error);
    throw error;
  }
}

export async function getProductFromDB(productId: string): Promise<ProductEntity | null> {
  try {
    const product = await Product.findOne({
      where: {
        id: productId
      }
    });
    return product;
  } catch (error) {
    console.error('Error fetching Products:', error);
    throw error;
  }
}

class ProductRepository {
  getAllProducts() {
    return getProducts();
  }

  getProductById(id: string): Promise<ProductEntity | null> {
    return getProductFromDB(id);
  }
}

export default new ProductRepository();
