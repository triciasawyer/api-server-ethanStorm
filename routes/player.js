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

  res.status(200).send({ newPlayer, newStats });
});

router.put("/:id/update", async (req, res, next) => {
  let id = req.params.id;
  let updatedPlayer = await playerModel.update(req.body, {
    where: { id: id },
    returning: true,
  });

  res.status(200).send(updatedPlayer);
});

router.delete("/:id", async (req, res, next) => {
  let id = req.params.id;
  let deletedPlayer = await playerModel.destroy({ where: { id: id } });
  let deletedStats = await statsModel.destroy({ where: { id: id } });

  res.status(200).send({ deletedPlayer, deletedStats });
});

module.exports = router;


//implementing crud and using the assigne values such as id, player, and stats
