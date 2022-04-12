const mongoose = require('mongoose');

const options = {
  keepAlive: true,
  connectTimeoutMS: 30000,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

class Database {
  connect(DB_URL) {
    mongoose.connect(DB_URL, options)
      .then(async () => {
        console.log(`Successfully connected to ${DB_URL}`);
      })
      .catch((err) => {
        console.error(`There was a db connection error ${err}`);
        process.exit(0);
      });

    const db = mongoose.connection;

    db.once('disconnected', () => {
      console.error(`Successfully disconnected from ${DB_URL}`);
    });
    process.on('SIGINT', () => {
      mongoose.connection.close(() => {
        console.error('dBase connection closed due to app termination');
        process.exit(0);
      });
    });
  }
}

module.exports = Database;
