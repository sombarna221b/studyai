const mongoose = require('mongoose');

const flashcardSchema = new mongoose.Schema(
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
    cards: [
      {
        question: { type: String, required: true },
        answer: { type: String, required: true },
        isFavorite: { type: Boolean, default: false },
      },
    ],
    totalCards: {
      type: Number,
      default: 0,
    },
    reviewedCount: {
      type: Number,
      default: 0,
    },
    lastReviewed: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Flashcard', flashcardSchema);