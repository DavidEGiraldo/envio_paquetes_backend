const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const Schema = mongoose.Schema;

let userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: (value) => {
      if (!validator.isEmail(value)) {
        throw new error({ error: "Invalid Email Address" });
      }
    },
  },
  password: {
    type: String,
    required: true,
    minLength: 7,
  },
  tokens: [
    {
      token: String,
    },
  ],
});

userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();

  const salt = await bcrypt.genSalt(+process.env.BCRYPT_ROUNDS);
  user.password = await bcrypt.hash(user.password, salt);

  console.log(bcrypt.compareSync("1234567", user.password));
  next();
});

module.exports = mongoose.model("User", userSchema);
