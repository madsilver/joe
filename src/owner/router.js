const express = require('express');
const router = express.Router();
const controller = require('./controller');
const { schema, validator } = require('./helper/validationQuery');

router.get('/', schema, validator, controller.getNear);
router.get('/:id', controller.get);

module.exports = router;