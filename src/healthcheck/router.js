const express = require('express');
const router = express.Router();
const HealthcheckController = require('./controller/healthcheck.controller');
const { healthcheckService } = require('./dependency');

const healthcheckController = new HealthcheckController(healthcheckService);

router.get('/', (req, res) => healthcheckController.get(req, res));

module.exports = router;