const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
  role: {
    type: String,
    enum: ["admin", "employee", "user"],
    default: "user",
  },
});
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
userSchema.methods.generateAuthToken = async function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION || "7d",
  });
  this.tokens = this.tokens.concat({ token });
  await this.save();
  return token;
};
userSchema.statics.findByCredentials = async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) {
    console.log("User not found for email:", email);
    throw new Error("Invalid login credentials");
  }
  console.log("User found, comparing password...");
  const isMatch = await user.comparePassword(password);
  console.log("Password match result:", isMatch);
  if (!isMatch) {
    throw new Error("Invalid login credentials");
  }
  return user;
};
const User = mongoose.model("User", userSchema);
module.exports = User;
