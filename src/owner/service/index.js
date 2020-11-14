const model = require('../model');

const get = async (id) => {
    return await model.findOne({ id }, { '_id': 0 });
};

module.exports = {
    get
};