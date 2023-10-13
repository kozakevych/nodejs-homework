import { Product } from '../models/product.model';

class ProductRepository {
  async getAllProducts() {
    const Products = await Product.find({});
    return Products;
  }

  async getProductById(id: string) {
    const Products = await Product.find({id});
    return Products;
  }
}

export default new ProductRepository();
