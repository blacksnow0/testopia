const express = require("express");

const {
  submitExam,
  sayHi,
  getTakenExams,
} = require("../controller/resultController");

const resultRouter = express.Router();

resultRouter.get("/say-hi", sayHi);

resultRouter.get("/get-taken-exams/:userId", getTakenExams);

resultRouter.post("/submit-exam", submitExam);

module.exports = resultRouter;
