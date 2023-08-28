const products: any[] = [];

class ProductRepository {
  getAllProducts() {
    return products;
  }

  getProductById(id: string) {
    return products.find(product => product.id === id);
  }
}

export default new ProductRepository();
