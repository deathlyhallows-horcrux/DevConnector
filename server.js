const express = require('express');
const mongoose = require('mongoose');
const app = express(); //creates an instance of express

//Db config
const db = require('./config/keys').mongoURI;
mongoose
  .connect(db)
  .then(() => console.log('MongoDb connected'))
  .catch(err => console.log(err));

//first route --contains request and response 
app.get('/', (req, res) => {
  res.send("Hello World, Meghana");
});

const port = 9000;
app.listen(port, () => console.log(`server is running on the port ${port}`));