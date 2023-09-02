import pool from '../db';

async function getProducts() {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM "Products"');
    client.release();
    return result.rows;
  } catch (error) {
    console.error('Error fetching Products:', error);
    throw error;
  }
}

class ProductRepository {
  getAllProducts() {
    return getProducts();
  }

  async getProductById(id: string) {
    const products = await getProducts();
    return products.find(product => product.id === id);
  }
}

export default new ProductRepository();
