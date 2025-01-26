const express = require("express");
const connectDb = require("./config/db");
const { userRouter } = require("./routes/userRoutes");
const examRouter = require("./routes/examRoutes");
const resultRouter = require("./routes/resultRoutes");
const cors = require("cors");

connectDb();
const app = express();

app.use(express.json());

app.use(cors());

app.use("/api/user", userRouter);

app.use("/api/exam", examRouter);

app.use("/api/result", resultRouter);

app.use("/", (req, res) => {
  res.status(200).json({ message: "Hello, from the TESTOPIA server!" });
});

app.listen(5003, () => {
  console.log("Hello, from the TESTOPIA server!");
});
