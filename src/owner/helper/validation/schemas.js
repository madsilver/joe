const { query, body } = require('express-validator');

const msg = field => `Field ${field} is required`;
const isLatLong = (value, {req}) => {
    if (value === undefined)  return false;

    const arr = value.split('.');
    if (arr.length !== 2
        || isNaN(arr[0])
        || isNaN(arr[1]) ) {
        return false;
    }
    return true;
};

const schemaPoint = [
    query('lat')
        .notEmpty().withMessage(msg('lat'))
        .custom(isLatLong),
    query('long')
        .notEmpty().withMessage(msg('long'))
        .custom(isLatLong)
];

const schemaOwner = [
    body('id')
        .notEmpty().withMessage(msg('id')),
    body('tradingName')
        .notEmpty().withMessage(msg('tradingName')),
    body('ownerName')
        .notEmpty().withMessage(msg('ownerName')),
    body('document')
        .notEmpty().withMessage(msg('document')),
    body('coverageArea.type')
        .notEmpty().withMessage(msg('coverageArea.type'))
        .isString(),
    body('coverageArea.coordinates')
        .notEmpty().withMessage(msg('coverageArea.coordinates'))
        .isArray(),
    body('address.type')
        .notEmpty().withMessage(msg('address.type'))
        .isString(),
    body('address.coordinates')
        .notEmpty().withMessage(msg('address.coordinates'))
        .isArray(),
];

module.exports = {
    schemaPoint,
    schemaOwner
};

