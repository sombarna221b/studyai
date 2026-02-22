const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    document: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Document',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    questions: [
      {
        question: { type: String, required: true },
        options: [{ type: String }],
        correctAnswer: { type: Number, required: true }, // index of the correct option
        explanation: { type: String, default: '' },
      },
    ],
    totalQuestions: {
      type: Number,
      default: 0,
    },
    results: [
      {
        attemptDate: { type: Date, default: Date.now },
        score: { type: Number },
        totalQuestions: { type: Number },
        percentage: { type: Number },
        answers: [{ type: Number }], // user's selected option indexes
      },
    ],
    bestScore: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Quiz', quizSchema);