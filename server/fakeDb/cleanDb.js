const mongoose = require("mongoose");
const FakeDb = require("./fakeDb");
const config = require("../config/dev");

mongoose.connect(
  config.DB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  async () => {
    const fakeDb = new FakeDb();
    console.log("start cleaning db");
    await fakeDb.populateDb();
    await mongoose.connection.close();
    console.log("DB populated");
  }
);
