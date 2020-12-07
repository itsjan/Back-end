const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');

const DAYS_VALID_DEFAULT = 30;

const membershipSchema = new mongoose.Schema({

    valid_until : {
        type : Date,
        default: () => Date.now() + DAYS_VALID_DEFAULT*24*60*60*1000
    },
    member_name : {
        type: String,
        required: true
    },
    qr_code_value : {
        type: String,
        index: true,
        default: () => uuidv4()
    }
})

// Virtuals 

membershipSchema.virtual('is_valid').
    get(function () { 
        return Date.now() < this.valid_until 
    });

membershipSchema.virtual('qr_code_url').
    get(function() {
        return `${process.env.QR_CODE_URL}${this.qr_code_value}`;
    });

membershipSchema.set('toJSON', { getters: false, virtuals: true });

// Query helpers

membershipSchema.query.byQrCode = function (code) {
    return this.where({ qr_code_value })
};


module.exports = mongoose.model('Membership', membershipSchema)
