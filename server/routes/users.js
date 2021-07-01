const express = require("express");
const router = express.Router();
const { onlyAuthUser } = require("../controllers/users");

const {
  getUsers,
  getUserById,
  login,
  register,
  remove,
} = require("../controllers/users");

router.get("", getUsers);
router.get("/:id", onlyAuthUser, getUserById);
router.post("/login", login);
router.post("/register", register);
router.delete("/remove-account", onlyAuthUser, remove);

module.exports = router;
