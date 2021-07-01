const express = require("express");
const router = express.Router();
const { onlyAuthUser } = require("../controllers/users");

const {
  getGames,
  getGameById,
  createGame,
  updateGame,
  deleteGame,
  joinGame,
  leaveGame,
  getHostingGames,
  getParticipateGames,
  verifyHost,
} = require("../controllers/games");

router.get("", onlyAuthUser, getGames);
router.get("/hosting", onlyAuthUser, getHostingGames);
router.get("/participating", onlyAuthUser, getParticipateGames);
router.get("/:id", getGameById);
router.get("/:id/verify-host", onlyAuthUser, verifyHost);
router.post("/create-game", onlyAuthUser, createGame);
router.patch("/:id", onlyAuthUser, updateGame);
router.delete("/:id", onlyAuthUser, deleteGame);
router.patch("/:id/join-game", onlyAuthUser, joinGame);
router.patch("/:id/leave-game", onlyAuthUser, leaveGame);

module.exports = router;
