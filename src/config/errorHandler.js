const errorHandler = (err, req, res, next) => {
    if (err.code === 11000) {
        return res.status(400)
            .json({ message: 'Duplicate key', key: err.keyValue });
    }

    if (typeof (err.message) === 'string') {
        return res.status(400)
            .json({ message: err.message });
    }

    return res.status(500)
        .json({ message: err.message });
};

module.exports = errorHandler;