const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name required"],
  },
  age: {
    type: Number,
    required: [true, "age required"],
  },
  status: {
    type: String,
    enum: ["active", "non active"],
    default: "non active",
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
