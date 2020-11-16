class HealthcheckController {
    constructor(ownerService) {
        this.service = ownerService;
    }

    async get(req, res) {
        const data = await this.service.get();
        return res.status(200).json(data);
    }
}

module.exports = HealthcheckController;