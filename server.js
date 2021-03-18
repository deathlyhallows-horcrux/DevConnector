const express = require('express');
const bodyParser = require('body-parser'); //revisit
const mongoose = require('mongoose');
const path = require('path');
const app = express(); //creates an instance of express

const users = require('./routes/api/users');
const passport = require('passport');

//body parser config
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//passport config
app.use(passport.initialize());
require('./config/passport')(passport);

//Db config
const db = require('./config/keys').mongoURI;
mongoose
  .connect(db, {useNewUrlParser: true})
  .then(() => console.log('MongoDb connected'))
  .catch(err => console.log(err));

// //first route --contains request and response 
// app.get('/', (req, res) => {
//   res.send("Hello World, Meghana");
// });

app.use('/api/users', users);

if(process.env.NODE_ENV === 'production'){
  //in prod when user hits url askin express to use the build folder
    app.use(express.static('client/build'));
    //whatever url the user comes to asking to go to where the current application is deployed at this path, without needing CRA at the cloud 
    app.get('*', (req , res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const port = process.env.PORT || 9000;
app.listen(port, () => console.log(`server is running on the port ${port}`));