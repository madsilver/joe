const model = require('../model');
require('dotenv').config();

const get = async (id) => {
    return await (await model.findOne({ id }, { '_id': 0 }));
};

const getNear = async (coord) => {
    const maxDistance = process.env.MAX_DISTANCE || 10000;

    const point = {
        type: 'Point',
        coordinates: [
            parseFloat(coord['long']),
            parseFloat(coord['lat'])
        ]
    };

    const agg = [{
        $geoNear: {
            near: point,
            query: { coverageArea: { $geoIntersects: { $geometry: point }}},
            distanceField: maxDistance,
            spherical: true
        }
    }];

    return await model.aggregate(agg).exec();
};

module.exports = {
    get,
    getNear
};