const express = require('express');
const app = express();
const morgan = require('morgan');
const connectdb = require('./src/config/database');
const categoryRouter = require('./src/routes/categoryRouter');
const productRouter = require('./src/routes/productRouter');
//Middlewares
app.use(morgan('tiny'));
app.use(express.json());
app.use('/', categoryRouter);
app.use('/', productRouter);

// Connect to the database and start the server
connectdb()
  .then(() => {
    console.log('DB is connected');
    app.listen(3000, () => {
      console.log('Server is listening at port 3000');
    });
  })
  .catch((error) => {
    console.error('ERROR IN CONNECTING DB:', error);
  });
