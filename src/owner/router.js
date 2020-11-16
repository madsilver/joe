const express = require('express');
const router = express.Router();
const { schemaPoint, schemaOwner } = require('./helper/validation/owner.schemas');
const validator = require('./helper/validation/validator');
const OwnerController = require('./controller/owner.controller');
const { ownerService } = require('./dependency');

const ownerController = new OwnerController(ownerService);

router.post('/', schemaOwner, validator, (req, res, next) => ownerController.create(req, res, next));
router.get('/', schemaPoint, validator, (req, res, next) => ownerController.getNear(req, res, next));
router.get('/:id', (req, res, next) => ownerController.get(req, res, next));

module.exports = router;