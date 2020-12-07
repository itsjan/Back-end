const mongoose = require('mongoose')
// https://plugins.mongoosejs.io/plugins/lean-virtuals
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');
var Schema = mongoose.Schema;


const schema = new Schema({
  username: {
    type: String, index: true, required: true,
    lowercase: true, trim: true, minLength: 6, maxLength: 30,
    validate: require('./validator/usernameValidator'),
    unique: 'Two users cannot share the same username ({VALUE})',
  },
  name: {
    first: { type: String, required: true, trim: true, maxlength: 100 },
    last: { type: String, required: true, trim: true, maxlength: 100 },
  },
  email: {
    type: String, index: true, required: true,
    lowercase: true, trim: true,
    unique: 'Two users cannot share the same email ({VALUE})',
    validate: require('./validator/emailValidator') 
  }
})

// Create a virtual property `fullName` with a getter and setter.
// https://mongoosejs.com/docs/tutorials/virtuals.html
schema.virtual('fullname').
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

schema.plugin(mongooseLeanVirtuals);


/// QUERY HELPERS 
/// https://mongoosejs.com/docs/guide.html#query-helpers


schema.query.byUserName = function (username) {
  return this.where({ username })
};


schema.query.byUserNames = function (usernamesArray ) {
  return this.where({ username : usernamesArray  })
};

schema.query.byEmail = function (email) {
  return this.where({ email: new RegExp(email, 'i') })
};

// schema.query.missingUserNames = function (usernamesArray) {
//   return usernamesArray.filter (username => this.disctinct('username').indexOf(username) == -1);
// }

module.exports = mongoose.model('User', schema);
