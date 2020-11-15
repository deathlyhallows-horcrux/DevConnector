const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    required: false
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model('users', UserSchema);




// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// //create schema for user - column called name type string
// const UserSchema = new Schema({
//   name: {
//     type: String,
//     required: true
//   },
//   email: {
//     type: String,
//     required: true
//   },
//   password: {
//     type: String,
//     required: true
//   },
//   //check if their gravatar exists and get the link of image if found
//   avatar: {
//     type: String,
//     required: false
//   },
//   date: {
//     type: Date,
//     default: Date.now
//   }
// });

// //askuing mongoose db to create a model for your userschema
// module.export = User = mongoose.model('users', UserSchema); //referring the collection users in db
