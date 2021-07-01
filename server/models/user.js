const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: {
    type: String,
    required: true,
    minLength: [8, "Minimum password length 8 characters!"],
  },
  image: {
    type: String,
    default: "https://randomuser.me/api/portraits/med/lego/1.jpg",
  },
  hosting: [{ type: Schema.Types.ObjectId, ref: "Game" }],
  participating: [{ type: Schema.Types.ObjectId, ref: "Game" }],
  createdAt: { type: Date, default: Date.now },
});

userSchema.methods.hasSamePassword = function (providedPassword) {
  return bcrypt.compareSync(providedPassword, this.password);
};

userSchema.pre("save", function (next) {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(this.password, salt, (err, hash) => {
      this.password = hash;
      next();
    });
  });
});

// userSchema.statics.sendError = function (res, config) {
//   const { status, detail } = config;
//   return res.status(status).send({
//     errors: [{ title: "User error", detail }],
//   });
// };

module.exports = mongoose.model("User", userSchema);
