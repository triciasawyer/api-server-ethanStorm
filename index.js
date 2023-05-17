"use strict";

// prepare env, port, and server
require("dotenv").config();
const PORT = process.env.PORT;
const { start } = require("./src/server");

// import database functions and instance
const { sequelizeDatabase } = require("./src/models");

// async connect the database then start the server to avoid problems
sequelizeDatabase
  .sync()
  .then(() => {
    console.log("Database connected!");
    start(PORT);
  })
  .catch((error) => {
    console.error(error);
  });
