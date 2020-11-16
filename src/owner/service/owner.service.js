class OwnerService {
    constructor(ownerRepository) {
        this.repository = ownerRepository;
    }

    async get(id) {
        return this.repository.get(id);
    }

    async getNear(data) {
        return this.repository.getNear(data);
    }

    async create(data) {
        return this.repository.create(data);
    }
}

module.exports = OwnerService;
