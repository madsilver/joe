const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const HealtcheckService = require('../service/healthcheck.service');
const HealthcheckController = require('./healthcheck.controller');

describe('HealthcheckController', () => {
    describe('get', () => {
        let healthCheckService, json, status, res;

        beforeEach(() => {
            healthCheckService = new HealtcheckService();
            json = sinon.spy();
            status = sinon.stub();
            res = { json, status };
            status.returns(res);
        });

        it('it should get the healthcheck message', async () => {
            const stubValue = { message: 'joe api - it\'s working!' };
            const stub = sinon.stub(healthCheckService, 'get').returns(stubValue);

            const healthcheckController = new HealthcheckController(healthCheckService);
            const req = { body: {} };
            await healthcheckController.get(req, res);

            expect(stub.calledOnce).to.be.true;
            expect(status.calledOnce).to.be.true;
            expect(status.args[0][0]).to.equal(200);
            expect(json.calledOnce).to.be.true;
            expect(json.args[0][0]).to.equal(stubValue);
        });
    });
});
