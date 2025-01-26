const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  choices: {
    type: [String],
    required: true,
    validate: [
      (choices) => choices.length === 4,
      "Question must have exactly 4 choices.",
    ],
  },
  correctChoice: {
    type: String,
    required: true,
    min: 0,
    max: 3,
  },
});

const examSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    questions: {
      type: [questionSchema],
      required: true,
      validate: [
        (questions) => questions.length > 0,
        "There must be at least one question.",
      ],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Exam", examSchema);
