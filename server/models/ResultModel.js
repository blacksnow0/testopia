const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  examId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Exam",
    required: true,
  },
  answers: {
    type: Map,
    of: Number,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  attemptedAt: {
    type: Date,
    default: Date.now,
  },
});

resultSchema.index({ userId: 1, examId: 1 }, { unique: true });

module.exports = mongoose.model("Result", resultSchema);
