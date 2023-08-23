const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.JWT_SECRET;

const consumerSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Please provide a valid email"],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please enter a valid email",
      ],
      unique: true,
    },
    profilePicture: {
      type: String,
    },

    password: {
      type: String,
      required: [true, "Please enter a password"],
      minLength: [8, "Password cannot be less than 8 characters"],
    },
    pastWorks: {
      type: Array,
      default: [],
    },
    currentTickets: {
      type: Array,
      default: [],
    },
    points: {
      type: Number,
    },
    code: {
      type: String,
    }
  },
  { timestamps: true }
);

consumerSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(7);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
  }
  next();
});

consumerSchema.methods.createJWT = function () {
  return jwt.sign(
    {
      userid: this._id,
    },
    secret,
    { expiresIn: "30d" }
  );
};

consumerSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

const Consumer = mongoose.model("consumers", consumerSchema);
module.exports = Consumer;
