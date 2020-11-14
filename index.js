const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const routerHealthcheck = require('./src/healthcheck/router');
const routerOwner = require('./src/owner/router');
const errorHandler = require('./src/config/errorHandler');
require('./src/config/db');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: 'application/json' }));
app.use(cors());

app.use('/api/healthcheck', routerHealthcheck);
app.use('/api/owners', routerOwner);

app.use(errorHandler);

const port = process.env.API_PORT || 3000;

app.listen(port, () => {
    console.log(`server running on port ${port}`);
});

module.exports = app;