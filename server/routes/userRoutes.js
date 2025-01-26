const express = require("express");

const userRouter = express.Router();

const { loginUser, registerUser } = require("../controller/userController");

userRouter.get("/", (req, res) => {
  res.status(200).json({ message: "Hello, from the TESTOPIA user routes!" });
});

userRouter.post("/login", loginUser);

userRouter.post("/register", registerUser);

module.exports = { userRouter };
