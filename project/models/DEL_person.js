var mongoose = require('mongoose')
var Schema = mongoose.Schema;



const personSchema = new Schema(
    // Schema definition ->
    {
    name: {
        first: { type: String, required: true, trim: true,  maxlength: 100 },
        last: { type: String, required: true, trim: true,  maxlength: 100 },
    },
    date_of_birth: { type: Date },

  });


  // Virtual for this person instance URL.
  personSchema.virtual('url').get( () => '/person/' + this._id );

  // To create a model in Mongoose, you call the mongoose.model() function with a schema as the 2nd parameter. 
  module.exports =  mongoose.model('Person', personSchema)

  