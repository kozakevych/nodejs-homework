import { Request, Response } from 'express';
import ProductService from '../services/product.service';

class ProductController {
  async getAllProducts(req: Request, res: Response) {
    const products = await ProductService.getAllProducts();
    res.status(200).json(products);
  }

  async getProductById(req: Request, res: Response) {
    const { userId } = req;
    const product = await ProductService.getProductById(userId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json(product);
  }
}

export default new ProductController();
