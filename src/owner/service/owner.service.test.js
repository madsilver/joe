const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const faker = require('faker');
const OwnerService = require('./owner.service');
const OwnerRepository = require('../repository/owner.repository');

describe('OwnerService', () => {
    const stubValue = {
        id: faker.random.uuid(),
        tradingName: faker.company.companyName(),
        ownerName: faker.name.findName(),
        document: faker.random.uuid(),
        coverageArea: {
            type: 'MultiPolygon',
            coordinates: [
                [[
                    [faker.address.longitude(), faker.address.latitude() ],
                    [faker.address.longitude(), faker.address.latitude() ],
                    [faker.address.longitude(), faker.address.latitude() ]
                ]]
            ]
        },
        address: {
            type: 'Point',
            coordinates: [faker.address.longitude(), faker.address.latitude() ]
        }
    };

    describe('get', () => {
        it('should get one owner', async () => {
            const ownerRepo = new OwnerRepository();
            const stub = sinon.stub(ownerRepo, 'get').returns(stubValue);

            const ownerService = new OwnerService(ownerRepo);
            const owner = await ownerService.get(stubValue.id);

            expect(stub.calledOnce).to.be.true;
            expect(owner.id).to.equal(stubValue.id);
        });
    });

    describe('getNear', () => {
        it('should get a nearest owner', async () => {
            const ownerRepo = new OwnerRepository();
            const stub = sinon.stub(ownerRepo, 'getNear').returns(stubValue);

            const ownerService = new OwnerService(ownerRepo);
            const target = {
                long: faker.address.longitude(),
                lat: faker.address.latitude()
            };
            const owner = await ownerService.getNear(target);

            expect(stub.calledOnce).to.be.true;
            expect(owner.id).to.equal(stubValue.id);
        });
    });

    describe('create', () => {
        it('should create a new owner', async () => {
            const ownerRepo = new OwnerRepository();
            const stub = sinon.stub(ownerRepo, 'create');

            const ownerService = new OwnerService(ownerRepo);
            const owner = await ownerService.create(stubValue);

            expect(stub.calledOnce).to.be.true;
        });
    });

});
