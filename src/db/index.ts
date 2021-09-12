// to fix typescript config error Cannot redeclare block-scoped variable 'env'
import mongoose = require('mongoose');
import { config as configDotenv } from 'dotenv';

export {};

// require('./bot');

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}/${process.env.MONGO_DATABASE_NAME}?retryWrites=true&w=majority`,{});

const { connection: db } = mongoose;
db.on('connected', () => {
  // eslint-disable-next-line no-console
  console.log('DB Connected');
});

db.on('disconnected', () => {
  // eslint-disable-next-line no-console
  console.log('DB Disconnected');
});
db.on('error', () => {
  // eslint-disable-next-line no-console
  console.log('DB Error');
});

module.exports = db;