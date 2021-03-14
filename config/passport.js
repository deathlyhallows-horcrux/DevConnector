//passport is needed to extract the token from header in request
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const mongoose = require('mongoose');
const User = mongoose.model('users');
const keys = require('../config/keys');

const opts = {};
//passport docs requires these two parameters to be passed
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport =>{
  passport.use(new JwtStrategy(opts, (payload, done) => {
    console.log(payload);
    User.findById(payload.id)
      .then(
        user => {
          if (user){
            return done(null, user);
          }
          return done(null, false);
        }
      )
      .catch(err => console.log(err));
  }));
}