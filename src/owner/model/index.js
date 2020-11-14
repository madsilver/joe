const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OwnerSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    tradingName: {
        type: String,
        required: true
    },
    ownerName: {
        type: String,
        required: true
    },
    document: {
        type: String,
        required: true,
        unique: true
    },
    coverageArea: {

    },
    address: {

    }
},{
    versionKey: false
});

module.exports = mongoose.model('Owner', OwnerSchema);