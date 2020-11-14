const service = require('../service');

const get = (req, res, next) => {
    service.get(req.params.id)
        .then(data => res.json(data))
        .catch(err => next(err));
};

const getNear = (req, res, next) => {
    service.getNear(req.query)
        .then(data => res.json(data))
        .catch(err => next(err));
};

const create = (req, res, next) => {
    service.create(req.body)
        .then(() => res.sendStatus(201))
        .catch(err => next(err));
};

module.exports = {
    get,
    getNear,
    create
};
