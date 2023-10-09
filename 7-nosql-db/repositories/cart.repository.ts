import { CartItemEntity } from '../entities/cart.entity';
import { Cart } from '../models/cart.model';

class CartRepository {
  async getCartByUserId(userId: string) {
    const cartById = await Cart.findOne({userId});
    if (!cartById) {
      return null;
    }
    return cartById;
  }

  async createCart(userId: string) {
    const newCart = new Cart({userId, items: [] });
    await newCart.save();
    return {userId, items: [] };
  }

  async updateCart(userId: string, items: any[]) {
    const cart = await Cart.findOneAndUpdate({userId}, {items}, { new: true });
    if (cart) {
      return cart;
    }
    return null;
  }

  async deleteCart(userId: string) {
    const cart = await Cart.findOneAndUpdate({userId}, {isDeleted: true}, { new: true });
    if (cart) {
      return cart;
    }
    return null;
  }

  async checkoutCart(userId: string) {
    const cartById = await Cart.findOne({userId});
    if (cartById && cartById.items) {
      const {id, userId, items} = cartById;
      const totalPrice = (items as any).reduce((acc: number, item: CartItemEntity) => {
        return acc += item.product.price * item.count;
      }, 0);
      return {
        id,
        user: userId,
        items,
        totalPrice
      };
    }
    return null;
  }
}

export default new CartRepository();
