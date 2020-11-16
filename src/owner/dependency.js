const OwnerRepository = require('./repository/owner.repository');
const OwnerService = require('./service/owner.service');

const ownerRepository = new OwnerRepository();
const ownerService = new OwnerService(ownerRepository);

module.exports = {
    ownerRepository,
    ownerService
};
