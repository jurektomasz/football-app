const express = require("express");
const mongoose = require("mongoose");

const usersRoutes = require("./routes/users");
const gamesRoutes = require("./routes/games");

const config = require("./config/dev");

const app = express();
const PORT = process.env.PORT || 3001;

const { onlyAuthUser } = require("./controllers/users");
const { provideErrorHandler } = require("./middlewares");

mongoose.connect(
  config.DB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  () => {
    console.log("Connected to DB");
  }
);
mongoose.set("useFindAndModify", false);

app.use(express.json());

app.get("/api/v1/secret", onlyAuthUser, (req, res) => {
  const user = res.locals.user;
  return res.json({ message: `secret message for: ${user.username}` });
});
app.use(provideErrorHandler);

app.use("/api/v1/users", usersRoutes);
app.use("/api/v1/games", gamesRoutes);

app.listen(PORT, () => {
  console.log("Server is running...");
});
