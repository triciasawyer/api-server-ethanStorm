const express = require("express");
const router = express.Router();

const calculateStats = require("../src/lib/calculateStats");

// include the required database models
const { playerModel, statsModel } = require("../src/models");

router.get("/", async (req, res, next) => {
  // get all players
  let allStats = await statsModel.findAll();
  res.status(200).send(allStats);
});

router.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  let stats = await statsModel.findAll({ where: { id: id } });

  res.status(200).send(stats);
});

router.get("/:id/with-player", async (req, res, next) => {
  const id = req.params.id;
  const stats = await statsModel.findAll({ where: { id: id } });
  const player = await playerModel.findAll({ where: { id: id } });

  res.status(200).send({ stats, player });
});

const updateStats = async (id, type) => {
  // get old stats
  const oldStats = await statsModel.findAll({ where: { id: id } });
  // create new stats
  const newStats = calculateStats(oldStats[0].dataValues, type);
  // update with the database
  const updatedStats = await statsModel.update(newStats, {
    where: {
      id: id,
    },
    returning: true,
  });

  return updatedStats;
};

router.put("/:id/update/wins", async (req, res, next) => {
  const id = req.params.id;

  res.status(202).send(await updateStats(id, "wins"));
});

router.put("/:id/update/losses", async (req, res, next) => {
  const id = req.params.id;

  res.status(200).send(await updateStats(id, "losses"));
});

router.post("/new", async (req, res, next) => {
  let newPlayer = await playerModel.create(req.body);
  let newStats = await statsModel.create({
    id: newPlayer.id,
    wins: 0,
    losses: 0,
    wl: 0.0,
  });

  res.status(200).send({ newPlayer, newStats });
});

router.delete("/:id", async (req, res, next) => {
  let id = req.params.id;
  let deletedPlayer = await playerModel.destroy({ where: { id: id } });
  let deletedStats = await statsModel.destroy({ where: { id: id } });

  res.status(200).send({ deletedPlayer, deletedStats });
});

module.exports = router;

//assinging id, stats, and players to the models
//includes crud, such as getting, deleting, posting, update
//Creating routes with the crud for stats
