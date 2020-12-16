const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const orderSchema = new mongoose.Schema({
    drink: { type: String, required: true },
    createdTime: { type: Date, default: Date.now },
    redeemed_time: { type: Date },
    redeemed_by_member_name: {
        type: String
    },
    redeemed_by_membership_id: {
        type: Schema.Types.ObjectId,
        ref: 'Membership'

    },
    redemption: {
        type: Schema.Types.ObjectId,
        ref: 'Redemption',
        autopopulate: true
    }
})
orderSchema.plugin(require('mongoose-autopopulate'));

orderSchema.virtual('is_redeemed').
    get(function () {
        return this.redemption != null;
    });

orderSchema.set('toJSON', { getters: false, virtuals: true });

module.exports = mongoose.model('Order', orderSchema);