const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const faker = require('faker');
const ownerModel = require('../model/owner.model');
const OwnerRepository = require('./owner.repository');

describe('OwnerRepository', () => {
    const stubValue = {
        id: faker.random.uuid(),
        tradingName: faker.company.companyName(),
        ownerName: faker.name.findName(),
        document: faker.random.uuid(),
        coverageArea: {
            type: 'MultiPolygon',
            coordinates: [
                [[
                    [faker.address.longitude, faker.address.latitude ],
                    [faker.address.longitude, faker.address.latitude ],
                    [faker.address.longitude, faker.address.latitude ]
                ]]
            ]
        },
        address: {
            type: 'Point',
            coordinates: [faker.address.longitude, faker.address.latitude ]
        }
    };

    describe('create', () => {
        it('should add a new owner to the db', async function() {
            const stub = sinon.stub(ownerModel, 'create').returns(stubValue);
            const ownerRepository = new OwnerRepository();
            await ownerRepository.create(stubValue);

            expect(stub.calledOnce).to.be.true;
        });
    });

    describe('get', () => {
        it('should retrieve one owner', async function() {
            const stub = sinon.stub(ownerModel, 'findOne').returns(stubValue);
            const ownerRepository = new OwnerRepository();
            const owner = await ownerRepository.get({ id: 1 });

            expect(stub.calledOnce).to.be.true;
            expect(owner.id).to.equal(stubValue.id);
        });
    });

});
