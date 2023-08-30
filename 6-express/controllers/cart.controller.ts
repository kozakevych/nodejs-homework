import { Request, Response } from 'express';
import CartService from '../services/cart.service';
import Joi from 'joi';

class CartController {
  async getCart(req: Request, res: Response) {
    const { userId } = req as any;
    const cart = await CartService.getCartByUserId(userId);
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }
    res.status(200).json({
      data: {
        cart
      },
      error: null
    });
  }

  async createCart(req: Request, res: Response) {
    const { userId } = req as any;
    const newCart = await CartService.createCart(userId);
    res.status(201).json(newCart);
  }

  async updateCart(req: Request, res: Response) {
    const { userId } = req as any;
    const { items } = req.body;

    const itemsSchema = Joi.array().items(
      Joi.object({
        productId: Joi.string().required(),
        quantity: Joi.number().integer().min(1).required(),
      })
    );

    const { error } = itemsSchema.validate(items);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    try {
      const updatedCart = await CartService.updateCart(userId, items);
      res.status(200).json(updatedCart);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }
}

export default new CartController();
