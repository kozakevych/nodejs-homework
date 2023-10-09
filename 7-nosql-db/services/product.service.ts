import ProductRepository from '../repositories/product.repository';

class ProductService {
  async getAllProducts() {
    return ProductRepository.getAllProducts();
  }

  async getProductById(id: string) {
    return ProductRepository.getProductById(id);
  }
}

export default new ProductService();
