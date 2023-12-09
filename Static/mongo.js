const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://parthkikani02:Iot@weather.zxwfoi7.mongodb.net/';
const dbName = 'Weather_Station';
const collectionName = 'Weather_Data';

const mongoClient = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function connectToDatabase() {
  try {            
    await mongoClient.connect();
    console.log('Connected to the database successfully!');
    const db = mongoClient.db(dbName);
    return db.collection(collectionName);
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw error;
  }
}

async function store(data) {
  try {
    const collection = await connectToDatabase();
    await collection.insertOne(data);
    console.log('Data inserted successfully!');
  } catch (error) {
    console.error('Error inserting data:', error);
    throw error;
  }
}

async function read(query) {
  try {
    const collection = await connectToDatabase();
    return collection.find(query).toArray();
  } catch (error) {
    console.error('Error retrieving data from MongoDB:', error);
    throw error;
  }
}

module.exports = {
  connectToDatabase,
  store,
  read,
};




