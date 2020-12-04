var mongoose = require('mongoose')
var Schema = mongoose.Schema;



const commsSchema = new Schema({
    person: { type: Schema.ObjectId 
        //, ref: 'Person', required: true 
    },
    comms_type: {type: String, required: true, 
        enum:['EMAIL', 'TEL', 'SMS', 'WHATSAPP', 'TELEGRAM'], 
        required: true
    },
    //email addr / phone #
    locator: { type: String, required: true },
    created_date: { type: Date, default: Date.now, required: true },
    verification_requested: { type: Date },
    verification_key: { type: String },
    verified_date: { type: Date },
    
  });

  commsSchema.index({ type: 1, locator: 1, person: 1 });

//module.exports =  mongoose.model('Comms', commsSchema)
// https://stackoverflow.com/questions/54084206/importing-a-custom-mongoose-schema-in-another-schema
//   const { carSchema , carModel } = require('./Car.js');

  module.exports.commsSchema = commsSchema;
  module.exports.commsModel = mongoose.model('Comms', commsSchema);