const { isLatLong } = require('./owner.schemas');
const faker = require('faker');
const { assert } = require('chai');

describe('OwnerSchema', () => {
    describe('isLatLong', () => {

        it('should validate the longitude and latitude', async () => {
            const long = faker.address.longitude();
            const lat = faker.address.latitude();

            assert.isTrue(isLatLong(long));
            assert.isTrue(isLatLong(lat));
        });

        it('should invalidate the longitude and latitude', async () => {
            const long = faker.random.alpha();
            const lat = faker.random.alpha();

            assert.isFalse(isLatLong(long));
            assert.isFalse(isLatLong(lat));
        });

    });
});