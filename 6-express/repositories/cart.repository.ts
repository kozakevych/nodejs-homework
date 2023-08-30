import { cart } from '../entities/cart.entity';

const cartsMock: any[] = [cart];

class CartRepository {
  getCartByUserId(userId: string) {
    return cartsMock.find(cart => cart.userId === userId);
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
}

export default new CartRepository();
