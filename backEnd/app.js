const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());

require('./models/user.js');

app.use(require('./routes/auth'));

require('dotenv').config({
  path: './config.env',
});

mongoose
  .connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('database connection is Okay');
  });

app.listen(process.env.PORT, () => {
  console.log('hello server started port at', process.env.PORT);
});
