"use strict";

require("dotenv").config();
const env = "" + process.env.NODE_ENV;

// Express init
const express = require("express");
const app = express();

const bodyConfig = {
    limit: "10mb",
    extended: true
};
app.use(express.urlencoded(bodyConfig));
app.use(express.json(bodyConfig));

// Middleware
const middleware = require("./config/middleware");
app.use(middleware.cors);
app.use(express.static('public'));


// Mongo connection
const config = require("./config/config")[env || "development"];
const mongoose = require("mongoose");

console.log("Trying to connect to database...");
const conn = mongoose.createConnection(config.database);
// mongoose.connect(config.database, config.mongoConfig, err => {
//     if (err) {
//         console.log("Could not connect to database.");
//         console.log(err);
//     } else {
//         console.log(`Connected to ${process.env.DB_NAME}.`);
//     }
// });

// Init GFS
const Grid = require('gridfs-stream');
const crypto = require('crypto');
let gfs;
conn.once('open', () => {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('sounds');
})


// Import routes
const routes = require("./src/routes");
app.use("", routes);

const PORT = process.env.PORT || 8081;
app.listen(PORT);
console.log("Application listening on PORT: " + PORT);
console.log("http://localhost:" + PORT);

module.exports = app;
