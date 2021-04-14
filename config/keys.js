// module.exports = {
//   mongoURI : 'mongodb+srv://kaladmin:J0UFBrn6FOz4inEz@devconnector.f40on.mongodb.net/devconnectordb?retryWrites=true&w=majority',
//   secretOrKey: 'secret'
// }

if(process.env.NODE_ENV === 'production'){
  module.exports = require('./keys_prod');
}else{
  module.exports = require('./keys_dev');
}