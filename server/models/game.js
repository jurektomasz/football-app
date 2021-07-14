const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gameSchema = new Schema({
  date: { type: Date, min: Date.now, required: true },
  time: { type: String, required: true },
  host: { type: Schema.Types.ObjectId, ref: "User" },
  price: { type: Number, required: true },
  maxParticipants: { type: Number, required: true },
  participants: [{ type: Schema.Types.ObjectId, ref: "User" }],
  place: { type: String, required: true, lowercase: true },
  city: { type: String, required: true, lowercase: true },
  description: { type: String, maxlength: 160 },
  createdAt: { type: Date, default: Date.now },
});

gameSchema.statics.sendError = function (res, config) {
  const { status, detail } = config;
  return res.status(status).send({ errors: [{ title: "Game error", detail }] });
};

module.exports = mongoose.model("Game", gameSchema);
