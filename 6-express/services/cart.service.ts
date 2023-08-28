import CartRepository from '../repositories/cart.repository';

class CartService {
  async getCartByUserId(userId: string) {
    return CartRepository.getCartByUserId(userId);
  }

  async createCart(userId: string) {
    return CartRepository.createCart(userId);
  }

  async updateCart(userId: string, items: any[]) {
    return CartRepository.updateCart(userId, items);
  }

  // remove cart
  // get checkout
}

export default new CartService();
