const express = require('express');
const router = express.Router();
const controller = require('./controller');
const { schemaPoint, schemaOwner } = require('./helper/validation/schemas');
const validator = require('./helper/validation/validator');

router.post('/', schemaOwner, validator, controller.create);
router.get('/', schemaPoint, validator, controller.getNear);
router.get('/:id', controller.get);

module.exports = router;