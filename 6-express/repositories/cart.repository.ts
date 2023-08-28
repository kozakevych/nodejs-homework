const carts: any[] = [];

class CartRepository {
  getCartByUserId(userId: string) {
    return carts.find(cart => cart.userId === userId);
  }

  createCart(userId: string) {
    const newCart = { userId, items: [] };
    carts.push(newCart);
    return newCart;
  }

  updateCart(userId: string, items: any[]) {
    const cart = carts.find(cart => cart.userId === userId);
    if (cart) {
      cart.items = items;
      return cart;
    }
    return null;
  }
}

export default new CartRepository();
