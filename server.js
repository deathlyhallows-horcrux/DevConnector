const express = require('express');
const bodyParser = require('body-parser'); //revisit
const mongoose = require('mongoose');
const app = express(); //creates an instance of express

const users = require('./routes/api/users');
//body parser config
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

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

app.use('/api/users', users);

const port = 9000;
app.listen(port, () => console.log(`server is running on the port ${port}`));