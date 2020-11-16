class HealthcheckService {
    async get() {
        return { message: 'joe api - it\'s working!' };
    }
}

module.exports = HealthcheckService;