const model = require('../model');

const get = async (id) => {
    return await model.findOne({ id });
};

const create = async (data) => {

};

module.exports = {
    get,
    create
};