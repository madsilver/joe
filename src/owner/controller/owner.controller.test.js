const { expect } = require('chai');
const sinon = require('sinon');
const OwnerService = require('../service/owner.service');
const OwnerController = require('./owner.controller');

describe('OwnerController', () => {
    describe('get', () => {
        let ownerService, json, status, res, payload;

        beforeEach(() => {
            const ownerRepo = sinon.spy();
            ownerService = new OwnerService(ownerRepo);
            json = sinon.spy();
            status = sinon.stub();
            res = { json, status };
            status.returns(res);
            payload = {
                id: 1,
                tradingName: 'Adega da Cerveja - Pinheiros',
                ownerName: 'Zé da Silva',
                document: '1432132123891/0001',
                coverageArea: {
                    type: 'MultiPolygon',
                    coordinates: [
                        [[[30, 20], [45, 40], [10, 40], [30, 20]]],
                        [[[15, 5], [40, 10], [10, 20], [5, 10], [15, 5]]]
                    ]
                },
                address: {
                    type: 'Point',
                    coordinates: [-46.57421, -21.785741]
                }
            };
        });

        it('it should get a owner', async () => {
            const stub = sinon.stub(ownerService, 'get').resolves(payload);

            const ownerController = new OwnerController(ownerService);
            const req = { params: { id: 1 } };
            await ownerController.get(req, res);

            expect(stub.calledOnce).to.be.true;
            expect(status.calledOnce).to.be.true;
            expect(status.args[0][0]).to.equal(200);
            expect(json.calledOnce).to.be.true;
            expect(json.args[0][0]).to.equal(payload);
        });

        it('it should get a nearest owner', async () => {
            const stub = sinon.stub(ownerService, 'getNear').resolves(payload);

            const ownerController = new OwnerController(ownerService);
            const req = { query: { long: '-46.57421', lat: '-21.785741' } };
            await ownerController.getNear(req, res);

            expect(stub.calledOnce).to.be.true;
            expect(status.calledOnce).to.be.true;
            expect(status.args[0][0]).to.equal(200);
            expect(json.calledOnce).to.be.true;
            expect(json.args[0][0]).to.equal(payload);
        });

        it('it should create a owner', async () => {
            const stub = sinon.stub(ownerService, 'create').resolves();

            const ownerController = new OwnerController(ownerService);
            const req = { body: payload };
            await ownerController.create(req, res);

            expect(stub.calledOnce).to.be.true;
            expect(status.calledOnce).to.be.true;
            expect(status.args[0][0]).to.equal(201);
            expect(json.calledOnce).to.be.false;
        });
    });
});
