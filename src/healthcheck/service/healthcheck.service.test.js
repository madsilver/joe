const chai = require('chai');
const expect = chai.expect;
const HealtcheckService = require('../service/healthcheck.service');

describe('HealthcheckService', () => {
    describe('get', () => {
        it('it should check healthcheck', async () => {
            const healthcheckService = new HealtcheckService();
            const data = await healthcheckService.get();
            expect(data).to.a('object');
            expect(data).to.property('message');
            expect(data.message).to.equal('joe api - it\'s working!');
        });
    });
});