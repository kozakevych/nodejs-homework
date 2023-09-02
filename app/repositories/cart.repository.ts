import { CartEntity, CartItemEntity, cart } from '../entities/cart.entity';

const cartsMock: any[] = [cart];

class CartRepository {
  getCartByUserId(userId: string) {
    return cartsMock.find(cart => (cart.userId === userId) && !cart.isDeleted);
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
