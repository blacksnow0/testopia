const express = require("express");
const { createExam, getAllExams } = require("../controller/examController");

const examRouter = express.Router();

examRouter.get("/get-all-exams", getAllExams);

examRouter.post("/create-exam", createExam);

module.exports = examRouter;
