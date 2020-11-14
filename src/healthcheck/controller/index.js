const service = require('../service');

const get = (req, res) => {
    res.json(service.get());
};

module.exports = {
    get
};