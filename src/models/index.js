"use strict";

// include sequelize for handling database
const { Sequelize, DataTypes } = require("sequelize");
// include schemas for player and stats
const player = require("./player");
const stats = require("./stats");

// get the database url
const DATABASE_URL = process.env.DATABASE_URL;

// database singleton
const sequelizeDatabase = new Sequelize(DATABASE_URL);

// create a model and add it to the database
const playerModel = player(sequelizeDatabase, DataTypes);
const statsModel = stats(sequelizeDatabase, DataTypes);

module.exports = {
  sequelizeDatabase,
  playerModel,
  statsModel,
};
