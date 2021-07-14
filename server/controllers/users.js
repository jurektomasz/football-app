const jwt = require("jsonwebtoken");
const config = require("../config");
const User = require("../models/user");

exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.sendApiError({
      status: 422,
      title: "User error",
      detail: "Email or password not provided",
    });
  }

  User.findOne({ email }, (error, foundUser) => {
    if (error) {
      return res.mongoError(error);
    }
    if (!foundUser) {
      return res.status(422).send({
        errors: [
          {
            title: "User error",
            detail: "User with this email doesn't exist",
          },
        ],
      });
    }

    if (foundUser.hasSamePassword(password)) {
      const token = jwt.sign(
        {
          sub: foundUser.id,
          username: foundUser.username,
        },
        config.JWT_SECRET,
        { expiresIn: "2h" }
      );

      return res.json(token);
    } else {
      return res.status(422).send({
        errors: [
          {
            title: "User error",
            detail: "Wrong password",
          },
        ],
      });
    }
  });
};

exports.register = (req, res) => {
  const { username, email, password, passwordConfirmation } = req.body;

  if (!email || !password) {
    return res.status(422).send({
      errors: [
        { title: "User error", detail: "Email or password not provided" },
      ],
    });
  }

  if (password !== passwordConfirmation) {
    return res.status(422).send({
      errors: [
        {
          title: "User error",
          detail: "Password and password confirmation must be the same",
        },
      ],
    });
  }

  User.findOne({ email }, (error, existingUser) => {
    if (error) {
      return res.mongoError(error);
    }
    if (existingUser) {
      return res.status(422).send({
        errors: [
          {
            title: "User error",
            detail: "User with this email already exist",
          },
        ],
      });
    }

    const user = new User({ username, email, password });
    user.save((error) => {
      if (error) {
        return res.mongoError(error);
      }

      return res.json({ status: "registered" });
    });
  });
};

exports.onlyAuthUser = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    const { decodedToken, error } = parseToken(token);

    if (error) {
      return res.status(422).send(error.message);
    }

    User.findById(decodedToken.sub, (error, foundUser) => {
      if (error) {
        return res.mongoError(error);
      }

      if (foundUser) {
        res.locals.user = foundUser;
        next();
      } else {
        return notAuthorized(res);
      }
    });
  } else {
    return notAuthorized(res);
  }
};

function parseToken(token) {
  try {
    const decodedToken = jwt.verify(token.split(" ")[1], config.JWT_SECRET);

    return { decodedToken };
  } catch (error) {
    return { error };
  }
}

function notAuthorized(res) {
  return res.status(401).send({
    errors: [{ title: "not authorized", detail: "you need to log in first" }],
  });
}

exports.getUsers = (req, res) => {
  User.find({}, "-password", (errors, foundUsers) => {
    if (errors) {
      return User.sendError(res, {
        status: 422,
        detail: "Cannot retrive users data",
      });
    }
    return res.json(foundUsers);
  });
};

exports.getUserById = (req, res) => {
  const { id } = req.params;

  User.findById(id, "-password", (errors, foundUser) => {
    if (errors) {
      return User.sendError(res, {
        status: 422,
        detail: "Cannot retrive user data",
      });
    }
    return res.json(foundUser);
  });
};

exports.remove = async (req, res) => {
  const { user } = res.locals;
  try {
    if (user.participating.length > 0) {
      return res.sendApiError({
        status: 422,
        title: "User error",
        detail: "You have still some games to play.",
      });
    }
    if (user.hosting.length > 0) {
      return res.sendApiError({
        status: 422,
        title: "User error",
        detail: "You are still hosting some games.",
      });
    }
    await User.findByIdAndDelete(user._id);
    return res.json(user._id);
  } catch (error) {
    return res.mongoError(error);
  }
};
