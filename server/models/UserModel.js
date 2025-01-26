const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "student"],
    required: true,
    default: "admin",
  },
});

userSchema.statics.register = async function (username, password, role) {
  try {
    const existingUser = await this.findOne({ username });
    if (existingUser) {
      throw new Error("Username already exists. Please choose another.");
    }
    const user = new this({ username, password, role });

    await user.save();
    return user;
  } catch (error) {
    throw error;
  }
};

userSchema.statics.login = async function (username, password) {
  try {
    const user = await this.findOne({ username });
    if (!user) {
      throw new Error("User not found.");
    }
    if (user.password !== password) {
      throw new Error("Password is incorrect.");
    }
    return user;
  } catch (error) {
    throw error;
  }
};

module.exports = mongoose.model("User", userSchema);
