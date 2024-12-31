const mongoose = require('mongoose');
const connectdb = async () => {
  await mongoose.connect(
    'mongodb+srv://bhandariprateek64:A7liQ3HLpb6VVAWk@hellomongo.q2jvm.mongodb.net/eCommerce'
  );
};

module.exports = connectdb;
