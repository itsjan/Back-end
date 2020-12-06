// https://www.npmjs.com/package/mongoose-validator
var validate = require('mongoose-validator')
// uses:
// https://github.com/validatorjs/validator.js


var emailValidator = [

  validate({
    validator: 'isEmail',
    passIfEmpty: true,
    message: 'Email should be correctly formed',
  }),
]

module.exports = emailValidator;

