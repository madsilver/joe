const ownerModel = require('../model/owner.model');

class OwnerRepository {
    constructor() {
        this.owner = ownerModel;
    }

    async get(id) {
        return this.owner.findOne({ id }, { _id: 0 });
    }

    async getNear(data) {
        const point = {
            type: 'Point',
            coordinates: [ parseFloat(data['long']), parseFloat(data['lat']) ]
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

        return this.owner.aggregate(agg).exec();
    }

    async create(data) {
        return this.owner.create(data);
    }
}

module.exports = OwnerRepository;