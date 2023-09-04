import Cart from '../models/cart';

async function getCart(userId: string) {
  try {
    const cart = await Cart.findOne({
      where: {
        userId
      }
    });

    if (!cart || !cart.dataValues || cart.isDeleted) {
      return null;
    }
    cart.dataValues.items = JSON.parse(cart.dataValues.items);
    delete cart.dataValues.isDeleted;
    return cart.dataValues
  } catch (error) {
    console.error('Error fetching Carts:', error);
    throw error;
  }
}

async function createCartDB(userId: string) {
  try {
    const cart = await Cart.create({ userId });
    return cart;
  } catch (error: any) {
    throw new Error(`Error creating cart: ${error.message}`);
  }
}

async function updateCartDB(userId: string, items: any) {
  try {
    const cart = await Cart.findOne({
      where: {
        userId
      }
    });

    if (!cart) {
      throw new Error('Cart not found');
    }

    cart.items = [JSON.stringify(items)];

    await cart.save();
    return cart;
  } catch (error: any) {
    throw new Error(`Error updating cart: ${error.message}`);
  }
}

async function deleteCartDB(userId: string) {
  try {
    const cart = await Cart.findOne({
      where: {
        userId
      }
    });

    if (!cart) {
      throw new Error('Cart not found');
    }

    cart.isDeleted = true;
    await cart.save();
    return cart;
  } catch (error: any) {
    throw new Error(`Error deleting cart: ${error.message}`);
  }
}

class CartRepository {
  async getCartByUserId(userId: string) {
    return getCart(userId);
  }

  async createCart(userId: string) {
    const newCart = await createCartDB(userId);
    return newCart;
  }

  async updateCart(userId: string, items: any[]) {
    const cart = await updateCartDB(userId, items) as any;
    if (cart) {
      cart.items = JSON.parse(cart.items);
      return cart;
    }
    return null;
  }

  async deleteCart(userId: string) {
    const deletedCart = await deleteCartDB(userId);
    return deletedCart; 
  }

  async checkoutCart(userId: string) {
    const cart = await getCart(userId);
    if (cart) {
      const totalPrice = cart.items.reduce((acc: number, item: any) => {
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
