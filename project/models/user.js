const mongoose = require('mongoose')
// https://plugins.mongoosejs.io/plugins/lean-virtuals
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');
var Schema = mongoose.Schema;
// https://github.com/validatorjs/validator.js
//import isEmail from 'validator/lib/isEmail';
//import isAlphanumeric from 'validator/lib/isAlphanumeric'
// https://www.npmjs.com/package/mongoose-validator
//const validator = require('mongoose-validator')
//const emailValidator = require('./validator/emailValidator')
const usernameValidator = require('./validator/usernameValidator')

// validation https://mongoosejs.com/docs/validation.html
// schema types https://mongoosejs.com/docs/schematypes.html
// unique https://masteringjs.io/tutorials/mongoose/unique

const schema = new Schema({
  username: {
    type: String, index: true, required: true,
    lowercase: true, trim: true, minLength: 6, maxLength: 30,
    // validate: {
    //   validator: function (v) {
    //     return /[a-z]/.test(v); //return /[a-z]/.test(v);
    //   },
    //   message: props => `${props.value} is not a valid phone number!`
    // },
    validate: require('./validator/usernameValidator'),
    unique: 'Two users cannot share the same username ({VALUE})',
  },
  name: {
    first: { type: String, required: true, trim: true, maxlength: 100 },
    last: { type: String, required: true, trim: true, maxlength: 100 },
  },

  // @TODO: validate email
  email: {
    type: String, index: true, required: true,
    lowercase: true, trim: true,
    unique: 'Two users cannot share the same email ({VALUE})',
    validate: require('./validator/emailValidator') //emailValidator     
  }

})

schema.plugin(require('mongoose-autopopulate'));
// Enable beautifying on this schema
//userSchema.plugin(beautifyUnique);
schema.plugin(mongooseLeanVirtuals);

// Create a virtual property `fullName` with a getter and setter.
// https://mongoosejs.com/docs/tutorials/virtuals.html
schema.virtual('fullName').
  get(function () { return `${this.name.first} ${this.name.last}`; }).
  set(function (v) {
    // `v` is the value being set, so use the value to set
    // `firstName` and `lastName`.
    const firstName = v.substring(0, v.indexOf(' '));
    const lastName = v.substring(v.indexOf(' ') + 1);
    this.set({ 'name.first': firstName, 'name.last': lastName });
  });

// https://mongoosejs.com/docs/tutorials/virtuals.html
schema.virtual('email_domain').get(function () {
  return this.email.slice(this.email.indexOf('@') + 1);
});

// Virtual for this user instance URL.
schema.virtual('url').get(function () { return '/u/' + this._id });

// QUERY HELPERS https://mongoosejs.com/docs/guide.html

/*
Animal.find().byName('fido').exec((err, animals) => {
    console.log(animals);
  });

  Animal.findOne().byName('fido').exec((err, animal) => {
    console.log(animal);
  });
*/

schema.query.byUserName = function (userName) {
  return this.where({ username: new RegExp(userName.lower(), 'i') })
};

schema.query.byEmail = function (email) {
  return this.where({ email: new RegExp(email.lower(), 'i') })
};



module.exports = mongoose.model('User', schema);





/// TEST


const User = mongoose.model('User', schema);

const doc = new User();
// Vanilla JavaScript assignment triggers the setter
doc.fullName = 'Jean-Luc Picard';


console.log(doc.fullName); // 'Jean-Luc Picard'
console.log(doc.name.first); // 'Jean-Luc'
console.log(doc.name.last); // 'Picard'

doc.username = 'o1llisi'
doc.email = 'jam@ail.co'
doc.validate()





doc

