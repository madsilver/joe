class OwnerController {
    constructor(ownerService) {
        this.service = ownerService;
    }

    async get(req, res, next) {
        this.service.get(req.params.id)
            .then(data => res.status(200).json(data))
            .catch(err => next(err));
    }

    async getNear(req, res, next) {
        this.service.getNear(req.query)
            .then(data => res.status(200).json(data))
            .catch(err => next(err));
    }

    async create(req, res, next) {
        this.service.create(req.body)
            .then(() => res.status(201).send())
            .catch(err => next(err));
    }
}

module.exports = OwnerController;
