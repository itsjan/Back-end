const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Redemption = require('../models/redemption');

const DAYS_VALID_DEFAULT = 30;

const membershipSchema = new mongoose.Schema({

    valid_until: {
        type: Date,
        default: () => Date.now() + DAYS_VALID_DEFAULT * 24 * 60 * 60 * 1000
    },
    member_name: {
        type: String,
        required: true
    },
    qr_code_value: {
        type: String,
        index: true,
        default: () => uuidv4()
    },
    redemptions: [{
        type: Schema.Types.ObjectId,
        ref: 'Redemption',
        autopopulate: true
    }]
})
membershipSchema.plugin(require('mongoose-autopopulate'));
// Virtuals 

membershipSchema.virtual('is_valid').
    get(function () {
        return Date.now() < this.valid_until
    });

membershipSchema.virtual('number_of_redemptions_today').
    get(function () {
        var num = this.redemptions.reduce((acc, r) => {
            const today = new Date();
            const redemptionDate = new Date(r.time);
            if (today.getDate() == redemptionDate.getDate() &&
                today.getMonth() == redemptionDate.getMonth() &&
                today.getFullYear() == redemptionDate.getFullYear()) {
                    acc += 1;
            }
           
            return acc;

        }, 0)
        return num;
    });

membershipSchema.virtual('minutes_since_last_redemption').
    get(function ()  {
        if (this.redemptions.length == 0)
            return NaN;
        const now = new Date();
        return Math.floor( 
            (now - new Date(this.redemptions[this.redemptions.length-1].time)) / 60000 );

    })

membershipSchema.virtual('can_redeem').
    get(function () {

        if (!this.is_valid) {
            return false;
        
        if (this.redemptions.length == 0)
            return true;

        }
        if (this.redemptions.length == 0) {
            return true;
        }
        const today = new Date();


        return ( this.number_of_redemptions_today < 5 && this.minutes_since_last_redemption >= 30 );
    })

membershipSchema.virtual('qr_code_url').
    get(function () {
        return `${process.env.QR_CODE_URL}${this.qr_code_value}`;
    });

membershipSchema.set('toJSON', { getters: false, virtuals: true });


module.exports = mongoose.model('Membership', membershipSchema)




