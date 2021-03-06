const express = require('express');
const app = express();
const router = require('./routes/routes');
require("dotenv").config();

app.use(express.static('./public'))

app.use("/", router);

module.exports = app
