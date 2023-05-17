"use strict";

module.exports = (sequelizeDatabase, DataTypes) => {
  // define the table by name, its properties become columns

  return sequelizeDatabase.define("stats", {
    wins: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    losses: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    wl: {
      type: DataTypes.FLOAT,
    },
  });
};
