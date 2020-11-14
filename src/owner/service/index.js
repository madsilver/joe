const model = require('../model');
require('dotenv').config();

const get = async (id) => {
    return await model.findOne({ id }, { _id: 0 });
};

const getNear = async (data) => {
    const point = {
        type: 'Point',
        coordinates: [
            parseFloat(data['long']),
            parseFloat(data['lat'])
        ]
    };

    const agg = [{
        $geoNear: {
            near: point,
            query: { coverageArea: { $geoIntersects: { $geometry: point }}},
            distanceField: 'distance',
            spherical: true
        }
    }, {
        $project: { _id: 0 }
    }];

    return await model.aggregate(agg).exec();
};

const create = async (data) => {
    return await model.create(data);
};

module.exports = {
    get,
    getNear,
    create
};