import { CartEntity, CartItemEntity, cart } from '../entities/cart.entity';

const cartsMock: any[] = [cart];

import Product from '../models/product';
import Cart from '../models/cart';

async function getCart(userId: string) {
  try {
    const cart = await Cart.findOne({
      where: {
        userId
      }
    });

    if (!cart || !cart.dataValues) {
      return null;
    }

    const products = await Product.findAll({
      where: {
        id: cart.dataValues.items,
      },
    });
    cart.dataValues.items = products;
    return cart.dataValues
  } catch (error) {
    console.error('Error fetching Carts:', error);
    throw error;
  }
}

class CartRepository {
  async getCartByUserId(userId: string) {
    return getCart(userId);
  }

  createCart(userId: string) {
    const newCart = { userId, items: [] };
    cartsMock.push(newCart);
    return newCart;
  }

  updateCart(userId: string, items: any[]) {
    const cart = cartsMock.find(cart => cart.userId === userId);
    if (cart) {
      cart.items = items;
      return cart;
    }
    return null;
  }

  deleteCart(userId: string) {
    const cart = cartsMock.find(cart => cart.userId === userId);
    if (cart) {
      cart.isDeleted = true;
      return cart;
    }
    return null;
  }

  checkoutCart(userId: string) {
    const cart = cartsMock.find(cart => cart.userId === userId);
    if (cart) {
      const totalPrice = cart.items.reduce((acc: number, item: CartItemEntity) => {
        return acc += item.product.price * item.count;
      }, 0);

      return {
        cart,
        totalPrice
      };
    }
    return null;
  }
}

export default new CartRepository();
