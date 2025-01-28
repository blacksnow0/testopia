const express = require("express");
const {
  createExam,
  getAllExams,
  getExamById,
} = require("../controller/examController");

const examRouter = express.Router();

examRouter.get("/get-all-exams", getAllExams);

examRouter.post("/create-exam", createExam);

examRouter.get("/get-exam/:exam_id", getExamById);

module.exports = examRouter;
