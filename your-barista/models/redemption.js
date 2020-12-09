const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const redemptionSchema = new mongoose.Schema({
    time : { type: Date, default : Date.now},
    order_id : { type: Schema.Types.ObjectId, ref: 'Order' }
})

module.exports.redemptionSchema = redemptionSchema;

module.exports.Redemption = mongoose.model('Redemption', redemptionSchema);