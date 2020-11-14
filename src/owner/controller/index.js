const service = require('../service');

const get = (req, res) => {
    service.get(req.params.id)
        .then(data => res.json(data));
};

const getNear = (req, res) => {
    const coord = req.query;

    service.getNear(coord)
        .then(data => res.json(data));
};

module.exports = {
    get,
    getNear
};
