const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.DB_HOST;

mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

process.on('SIGNIT', () => {
    mongoose.connection.close(function() {
        process.exit();
    });
});