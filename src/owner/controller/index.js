const service = require('../service');

const get = (req, res) => {
    service.get(req.params.id)
        .then(data => res.json(data));
};

module.exports = {
    get
};
