const Result = require("../models/ResultModel");
const Exam = require("../models/ExamModel");

const sayHi = (req, res) => {
  res.status(200).json({ message: "Hello from the result controller!" });
};

const submitExam = async (req, res) => {
  try {
    const { userId, examId, answers } = req.body;

    const exam = await Exam.findById(examId);
    if (!exam) {
      return res.status(404).json({ message: "Exam not found." });
    }

    const existingResult = await Result.findOne({ userId, examId });
    if (existingResult) {
      return res
        .status(400)
        .json({ message: "You have already submitted the exam." });
    }

    let score = 0;

    exam.questions.forEach((question, index) => {
      if (answers[index] == question.correctChoice) {
        score++;
      }
    });

    const result = new Result({ userId, examId, answers, score });
    await result.save();

    res.status(200).json({ message: "Exam submitted successfully." });
  } catch (err) {
    if (err.code === 11000) {
      return res
        .status(400)
        .json({ message: "You have already taken this exam." });
    }

    res.status(500).json({ message: "Server error" });
  }
};

const getTakenExams = async (req, res) => {
  try {
    const { userId } = req.params;
    const results = await Result.find({ userId }).populate(
      "examId",
      "title description"
    );

    if (results.length === 0) {
      return res.status(200).json({ message: "No exams taken yet." });
    }

    const examData = results.map((result) => ({
      examTitle: result.examId.title,
      examDescription: result.examId.description,
      score: result.score,
      attemptedAt: result.attemptedAt,
    }));

    res.status(200).json({ exams: examData });
  } catch (error) {}
};

module.exports = { submitExam, sayHi, getTakenExams };
