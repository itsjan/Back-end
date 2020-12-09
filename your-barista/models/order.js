const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const orderSchema = new mongoose.Schema({
    drink : { type: Schema.Types.ObjectId, ref: 'Drink' },
    createdTime: { type: Date, default : Date.now},
    redeemed_time : {type: Date},
    redeemed_by_member_name : { 
        type: String
    },
    redeemed_by_membership_id : {
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

orderSchema.virtual('redeem_order_qr_code_url').
    // @TODO . Tähän tarvitaan GET url, johon lähetetään orderID, ja memberID, ja member QR-code
    // -------------> route palauttaa 200 OK jos redemption onnistuu
    //         -----> 401 Denied jos membership ei voimassa, tms
    
    get(function() {0
        return `${process.env.QR_CODE_URL}${this._id}`;
    });

orderSchema.set('toJSON', { getters: false, virtuals: true });

module.exports = mongoose.model('Order', orderSchema);