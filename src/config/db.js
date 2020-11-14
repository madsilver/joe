const mongoose = require('mongoose');
require('dotenv').config();

const host = process.env.NODE_ENV === 'production'
    ? process.env.DB_HOST
    : 'localhost';
const port = process.env.DB_PORT;
const dbname = process.env.DB_NAME;
const dbUri = `mongodb://${host}:${port}/${dbname}`;

mongoose.connect(dbUri, {
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