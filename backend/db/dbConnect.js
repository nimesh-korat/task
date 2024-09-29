const mongoose = require('mongoose')

//MongoDB Connection
async function connectDB() {

  // mongodb connection string
  const dbUrl = process.env.MONGO_URI;
  try {

    // Connect to MongoDB
    await mongoose.connect(dbUrl);
    console.log('MongoDB connected successfully');
  } catch (error) {

    // Error handling
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

module.exports = connectDB;