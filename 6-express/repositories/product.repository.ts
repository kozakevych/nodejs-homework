import { product } from "../entities/product.entity";

const productsMock: any[] = [product];

class ProductRepository {
  getAllProducts() {
    return productsMock;
  }

  getProductById(id: string) {
    return productsMock.find(product => product.id === id);
  }
}

export default new ProductRepository();
