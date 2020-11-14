const express = require('express');
const app = express();
const cors = require('cors');
const routerHealthcheck = require('./src/healthcheck/router');
const routerOwner = require('./src/owner/router');
require('./src/config/db');

app.use(cors());

app.use('/api/healthcheck', routerHealthcheck);
app.use('/api/owners', routerOwner);

const port = process.env.API_PORT || 3000;

app.listen(port, () => {
    console.log(`server running on port ${port}`);
});

module.exports = app;