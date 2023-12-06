// mongo.js
// Create a MongoDB connection script
// Replace 'YOUR_MONGODB_CONNECTION_STRING' with your actual MongoDB connection string

const MongoClient = require('mongodb').MongoClient;

const mongoURI = 'YOUR_MONGODB_CONNECTION_STRING';

async function connectToMongo() {
  try {
    const client = await MongoClient.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');
    return client.db(); // Return the database instance
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

module.exports = connectToMongo;
