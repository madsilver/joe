const HealthcheckService = require('./service/healthcheck.service');

const healthcheckService = new HealthcheckService();

module.exports = {
    healthcheckService
};