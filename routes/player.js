const express = require("express");
const router = express.Router();

// include the required database models
const { playerModel, statsModel } = require("../src/models");

router.get("/", async (req, res, next) => {
  // get all players
  let allPlayers = await playerModel.findAll();
  res.status(200).send(allPlayers);
});

router.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  let player = await playerModel.findAll({ where: { id: id } });

  res.status(200).send(player);
});

router.get("/:id/with-stats", async (req, res, next) => {
  const id = req.params.id;
  const player = await playerModel.findAll({ where: { id: id } });
  const stats = await statsModel.findAll({ where: { id: id } });

  res.status(200).send({ player, stats });
});

router.post("/new", async (req, res, next) => {
  let newPlayer = await playerModel.create(req.body);
  let newStats = await statsModel.create({
    id: newPlayer.id,
    wins: 0,
    losses: 0,
    wl: 0.0,
  });

  res.status(200).send(newPlayer, newStats);
});

module.exports = router;
