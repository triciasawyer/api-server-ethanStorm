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

//bringing in seqdb to use for defining stats and the 3 things that you are defining within stats (wins, losses, wl)
//
