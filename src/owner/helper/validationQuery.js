const { query } = require('express-validator');
const { validationResult } = require('express-validator');

const isLatLong = (value, {req}) => {
    if (value === undefined) {
        return false;
    }
    const arr = value.split('.');
    if (arr.length !== 2
        || isNaN(arr[0])
        || isNaN(arr[1]) ) {
        return false;
    }
    return true;
};

const schema = [
    query('lat')
        .notEmpty().withMessage('Field lat is required')
        .custom(isLatLong),
    query('long')
        .notEmpty().withMessage('Field long is required')
        .custom(isLatLong)
];

const validator = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    next();
};

module.exports = { schema, validator };

