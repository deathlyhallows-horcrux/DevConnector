const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true
  },
  handle: {
    type: String,
    required: true,
    max: 40
  },
  company: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: false
  },
  status: {
    type: Date,
    default: Date.now
  },
  skills: {
    type: [string],
    required: true
  },
  githubusername:{
    type: string,
  },
  experience: [{
    title: {
      type: string,
      required: true
    },
    company: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: false
    },
    status: {
      type: Date,
      default: Date.now
    },
    skills: {
      type: [string],
      required: true
    }
  }]
});

module.exports = Profiles = mongoose.model('users', ProfileSchema);
