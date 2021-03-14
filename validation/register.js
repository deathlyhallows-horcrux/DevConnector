const { default: validator } = require('validator');
const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data){
  let errors = {};

  if(!Validator.isLength(data.name, {min: 2, max: 30})){
    errors.name = 'Name must be between 2 and 30 characters in length';
  }
  if(isEmpty(data.name)){
    errors.name = "Name field is required";
  }
  if(!validator.isEmail){
    errors.email = "Email is Invalid";
  }
  if(isEmpty(data.password)){
    errors.password = "Password field is required";
  }
  if(!Validator.isLength(data.name, {min: 6, max: 30})){
    errors.name = 'Name must be between 6 and 30 characters in length';
  }
  if(isEmpty(data.email)){
    errors.email = "Email field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}