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
        type: {
            type: String,
            enum: ['MultiPolygon'],
            required: true
        },
        coordinates: {
            type: [[[[Number]]]],
            required: true
        }
    },
    address: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    }
},{
    versionKey: false
});

module.exports = mongoose.model('Owners', OwnerSchema);