const User = require("../models/UserModel");

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.login(username, password);

    if (user.role === "student") {
      res.status(200).json({
        message: `Welcome ${user.username}!, you are logged in as a student`,
        user,
      });
    } else {
      res.status(200).json({
        message: `Welcome ${user.username}!, you are logged in as an admin`,
        user,
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const registerUser = async (req, res) => {
  const { username, password, role } = req.body;
  try {
    const user = await User.register(username, password, role);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { loginUser, registerUser };
