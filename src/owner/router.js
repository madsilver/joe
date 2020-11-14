const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.get('/', controller.getNear);
router.get('/:id', controller.get);

module.exports = router;