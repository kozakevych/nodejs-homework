import { Request, Response } from 'express';
import ProductService from '../services/product.service';

class ProductController {
  async getAllProducts(req: Request, res: Response) {
    const products = await ProductService.getAllProducts();
    res.status(200).json({
      data: products,
      error: null
    });
  }

  async getProductById(req: Request, res: Response) {
    const product = await ProductService.getProductById(req.params.id);
    if (!product) {
      return res.status(404).json({
        data: null,
        error: {
          message: 'No product with such id'
        }
      });
    }
    const { title, description, id, price } = product;
    res.status(200).json({
      data: {
        title,
        description,
        id,
        price
      },
      error: null
    });
  }
}

export default new ProductController();
