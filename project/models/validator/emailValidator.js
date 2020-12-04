// https://www.npmjs.com/package/mongoose-validator
var validate = require('mongoose-validator')

// uses:
// https://github.com/validatorjs/validator.js

import isEmail from 'validator/lib/isEmail';
import isAlphanumeric from 'validator/lib/isAlphanumeric'

 
var emailValidator = [
  validate({
    validator: 'isLength',
    arguments: [3, 10],
    message: 'Email should be between {ARGS[0]} and {ARGS[1]} characters',
  }),
  validate({
    validator: 'isEmail',
    passIfEmpty: true,
    message: 'Email should be correctly formed',
  }),
]

module.exports = emailValidator;

