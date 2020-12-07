// https://www.npmjs.com/package/mongoose-validator
var validate = require('mongoose-validator')

// uses:
// https://github.com/validatorjs/validator.js

// import isEmail from 'validator/lib/isEmail';
// import isAlphanumeric from 'validator/lib/isAlphanumeric'

 
var emailValidator = [
  validate({
    validator: 'isLength',
    arguments: [6, 20],
    message: 'Username should be between {ARGS[0]} and {ARGS[1]} characters',
  }),
  validate({
    validator: 'isAlphanumeric',
    arguments: [/*'sv-SE'*/],
    passIfEmpty: false,
    message: 'Username should only cointain alphanumeric characters ',
  }),
]

module.exports = emailValidator;