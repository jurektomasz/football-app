const { users, games } = require("./data");
const User = require("../models/user");
const Game = require("../models/game");

class FakeDb {
  async cleanDb() {
    await User.deleteMany({});
    await Game.deleteMany({});
  }

  async addData() {
    await User.create(users);
    await Game.create(games);
  }

  async populateDb() {
    await this.cleanDb();
    await this.addData();
  }
}

module.exports = FakeDb;
