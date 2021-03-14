const { default: validator } = require('validator');
const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data){
  let errors = {};

  if(!validator.isEmail){
    errors.email = "Email is Invalid";
  }

  if(isEmpty(data.email)){
    errors.email = "Email field is required";
  }
  if(isEmpty(data.password)){
    errors.password = "Password field is required";
  }
  
  return {
    errors,
    isValid: isEmpty(errors)
  }
}