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
    res.status(201).json({
      data: {
        cart: newCart,
        totalPrice: 0
      },
      error: null
    });
  }

  async updateCart(req: Request, res: Response) {
    const { userId } = req as any;
    const { items } = req.body;

    const productSchema = Joi.object({
      id: Joi.string().uuid().required(),
      title: Joi.string().required(),
      description: Joi.string().required(),
      price: Joi.number().positive().required()
    });

    const itemSchema = Joi.object({
      product: productSchema,
      count: Joi.number().integer().positive().required()
    });

    const requestSchema = Joi.object({
      id: Joi.string().uuid().required(),
      items: Joi.array().items(itemSchema).min(1).required()
    });

    const { error } = requestSchema.validate(req.body);

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

  async deleteCart(req: Request, res: Response) {
    const { userId } = req as any;
    const cart = await CartService.deleteCart(userId);
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }
    res.status(200).json({
      data: {
        success: true
      },
      error: null
    });
  }
}

export default new CartController();
