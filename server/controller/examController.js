const Exam = require("../models/ExamModel");

const createExam = async (req, res) => {
  const { title, description, questions, createdBy } = req.body;
  try {
    const exam = await Exam.create({
      title,
      description,
      questions,
      createdBy,
    });
    res.status(200).json(exam);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getExamController = async (req, res) => {
  res.status(200).json({ message: "Exam Controller" });
};

const getAllExams = async (req, res) => {
  try {
    const exams = await Exam.find().populate("createdBy", "username");
    res.status(200).json(exams);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch exams.", error: error.message });
  }
};

module.exports = { createExam, getExamController, getAllExams };
