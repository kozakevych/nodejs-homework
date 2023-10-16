const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require("path");

async function seedCarts() {
  const url = 'mongodb://mongoadmin:bdung@localhost:27017'; // Connection URL
  const dbName = 'mydatabase'; // Name of your MongoDB database
  const client = new MongoClient(url);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(dbName);
    const collection = db.collection('Carts'); // Replace with your cart collection name

    // Read the cart seed data file
    const seedData = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'carts.json'), 'utf8'));

    // Insert the seed data into the collection
    const result = await collection.insertMany(seedData);
    console.log(`${result.insertedCount} carts inserted`);
  } catch (error) {
    console.error('Error seeding carts:', error);
  } finally {
    client.close();
  }
}

seedCarts();
