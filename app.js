const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const router = require('./routes/routes');
require("dotenv").config();

app.use("/", router);

module.exports = app
