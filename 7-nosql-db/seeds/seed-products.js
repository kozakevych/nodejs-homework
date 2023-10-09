const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require("path");

async function seedProducts() {
  const url = 'mongodb://mongoadmin:bdung@localhost:27017'; // Connection URL
  const dbName = 'mydatabase'; // Name of your MongoDB database
  const client = new MongoClient(url);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(dbName);
    const collection = db.collection('Products'); // Replace with your collection name

    // Read the product seed data file
    const seedData = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'products.json'), 'utf8'));

    // Insert the seed data into the collection
    const result = await collection.insertMany(seedData);
    console.log(`${result.insertedCount} products inserted`);
  } catch (error) {
    console.error('Error seeding products:', error);
  } finally {
    client.close();
  }
}

seedProducts();
