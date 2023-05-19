"use strict";

module.exports = (sequelizeDatabase, DataTypes) => {
  // define the table by name, its properties become columns

  return sequelizeDatabase.define("players", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rank: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    order: {
      type: DataTypes.ENUM,
      values: [
        "Copper",
        "Bronze",
        "Silver",
        "Gold",
        "Platinum",
        "Emerald",
        "Diamond",
        "Champion",
      ],
    },
  });
};

// bringing in seqdb and using it to create the route with things such as name, rank, and order.
