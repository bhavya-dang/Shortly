const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const uri = `mongodb+srv://${process.env.id}:${process.env.pass}@cluster0.qlht9dp.mongodb.net/?retryWrites=true&w=majority`
mongoose.set('strictQuery', false);

const connectDB = async () => {
  try {
    await mongoose.connect(uri);

    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
