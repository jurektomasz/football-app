const User = require("../models/user");
const Game = require("../models/game");
// const { faCommentsDollar } = require("@fortawesome/free-solid-svg-icons");

exports.getGames = async (req, res) => {
  const { city } = await req.query;

  const query = city ? { city: city.toLowerCase() } : {};

  try {
    const foundGames = await Game.find(query).populate(
      "host",
      "_id image username"
    );
    return res.json(foundGames);
  } catch (errors) {
    return res.mongoError(errors);
  }
};

exports.getGameById = async (req, res) => {
  const { id } = req.params;
  try {
    const foundGame = await Game.findById(id)
      .populate("host", "_id image username")
      .populate("participants", "_id image username");
    return res.json(foundGame);
  } catch (errors) {
    return res.mongoError(errors);
  }
};

exports.verifyHost = async (req, res) => {
  const { user } = res.locals;
  const { id } = req.params;

  try {
    const game = await Game.findById(id).populate(
      "host",
      "-password -hosting -participating -email -createdAt"
    );

    if (game.host.id !== user.id) {
      return res.sendApiError({
        status: 422,
        title: "Invalid User",
        detail: "You are not hosting this game!",
      });
    }

    return res.json({ status: "verified" });
  } catch (error) {
    return res.mongoError(error);
  }
};

exports.createGame = async (req, res) => {
  const { user } = res.locals;
  const newGameData = req.body;
  newGameData.host = user._id;
  newGameData.participants = [user._id];

  const userUpdate = await User.findById(user._id);

  Game.create(newGameData, (errors, newGame) => {
    if (errors) {
      return res.mongoError(errors);
    }

    userUpdate.updateOne(
      { $push: { participating: newGame._id, hosting: newGame._id } },
      { safe: true, upsert: true, new: true },
      function (error) {
        if (error) {
          return res.send(error);
        }
      }
    );

    return res.json(newGame);
  });
};

exports.updateGame = async (req, res) => {
  const { id } = req.params;
  const { user } = res.locals;
  const updateData = req.body;

  try {
    const game = await Game.findById(id).populate("host", "_id image username");

    if (game.host.id !== user.id) {
      return res.sendApiError({
        status: 422,
        title: "Invalid User",
        detail: "You are not hosting this game!",
      });
    }

    game.set(updateData);
    await game.save();
    return res.json(game);
  } catch (error) {
    return res.mongoError(error);
  }
};

exports.deleteGame = async (req, res) => {
  const { id } = req.params;
  const { user } = res.locals;

  try {
    const game = await Game.findById(id).populate("host", "_id image username");
    const hostUpdate = await User.findById(user._id);

    if (game.host.id !== user.id) {
      return res.sendApiError({
        status: 422,
        title: "Invalid User",
        detail: "You are not hosting this game!",
      });
    }

    if (game.participants.length === game.maxParticipants) {
      return res.sendApiError({
        status: 422,
        title: "Game error",
        detail: "There is already full squad.",
      });
    }

    for (userIndex of game.participants) {
      const userUpdate = await User.findById(userIndex);

      userUpdate.updateOne(
        { $pull: { participating: id } },
        { safe: true, upsert: true, new: true },
        function (error) {
          if (error) {
            throw new Error(error);
          }
        }
      );
    }

    await hostUpdate.updateOne(
      { $pull: { hosting: id } },
      { safe: true, upsert: true, new: true },
      function (error) {
        if (error) {
          throw new Error(error);
        }
      }
    );

    // await game.deleteOne({ id });
    await game.remove();
    return res.json({ id });
  } catch (error) {
    return res.mongoError(error);
  }
};

exports.joinGame = async (req, res) => {
  const { id } = req.params;
  const { user } = res.locals;

  try {
    const gameUpdate = await Game.findById(id).populate(
      "host",
      "_id image username"
    );

    const userUpdate = await User.findById(user._id);

    if (gameUpdate.participants && gameUpdate.participants.includes(user._id)) {
      return res.json("you are already in game");
    }

    const newParticipant = {
      image: user.image,
      _id: user._id,
      username: user.username,
    };

    await gameUpdate.participants.push(newParticipant);
    await gameUpdate
      .populate("participants", "_id image username")
      .execPopulate();
    await gameUpdate.save();

    await userUpdate.updateOne(
      { $push: { participating: id } },
      { safe: true, upsert: true, new: true },
      function (error) {
        if (error) {
          return res.send(error);
        }
      }
    );

    return res.json(gameUpdate);
  } catch (errors) {
    return res.mongoError(errors);
  }
};

exports.leaveGame = async (req, res) => {
  const { id } = req.params;
  const { user } = res.locals;

  try {
    const gameUpdate = await Game.findById(id).populate(
      "host",
      "_id image username"
    );
    const userUpdate = await User.findById(user._id);

    const index = gameUpdate.participants.findIndex(
      (i) => i.toString() === user._id.toString()
    );
    await gameUpdate.participants.splice(index, 1);
    await gameUpdate
      .populate("participants", "_id image username")
      .execPopulate();

    await gameUpdate.save();

    await userUpdate.updateOne(
      { $pull: { participating: id } },
      { safe: true, upsert: true, new: true },
      function (err, result) {
        if (err) {
          return res.send(err);
        }
      }
    );

    return res.json(gameUpdate);
  } catch (errors) {
    return res.mongoError(errors);
  }
};

exports.getHostingGames = async (req, res) => {
  const { user } = res.locals;

  try {
    const games = await Game.find({ host: user });
    return res.json(games);
  } catch (error) {
    return res.mongoError(errors);
  }
};

exports.getParticipateGames = async (req, res) => {
  const { user } = res.locals;

  try {
    const gamesIds = user.participating;
    const games = await Game.find({ _id: { $in: gamesIds } }).populate(
      "participants",
      "-password -hosting -participating -email -createdAt"
    );
    return res.json(games);
  } catch (error) {
    return res.mongoError(errors);
  }
};
