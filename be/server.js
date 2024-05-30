const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Import routes
app.use(require("./routes"));

module.exports = app;
