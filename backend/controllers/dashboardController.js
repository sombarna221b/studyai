const Document = require('../models/Document');
const Flashcard = require('../models/Flashcard');
const Quiz = require('../models/Quiz');

// @desc   Get dashboard overview data
// @route  GET /api/dashboard
// @access Private
const getDashboard = async (req, res) => {
  try {
    const userId = req.user._id;

    // Counts
    const totalDocuments = await Document.countDocuments({ user: userId });
    const totalFlashcardSets = await Flashcard.countDocuments({ user: userId });
    const totalQuizzes = await Quiz.countDocuments({ user: userId });

    // Total cards
    const flashcardAgg = await Flashcard.aggregate([
      { $match: { user: userId } },
      { $group: { _id: null, totalCards: { $sum: '$totalCards' } } },
    ]);
    const totalFlashcards = flashcardAgg[0]?.totalCards || 0;

    // Average quiz score
    const quizAgg = await Quiz.aggregate([
      { $match: { user: userId } },
      { $group: { _id: null, avgScore: { $avg: '$bestScore' } } },
    ]);
    const averageQuizScore = Math.round(quizAgg[0]?.avgScore || 0);

    // Recent documents
    const recentDocuments = await Document.find({ user: userId })
      .select('title fileSize pageCount createdAt')
      .sort({ createdAt: -1 })
      .limit(5);

    // Recent flashcard sets
    const recentFlashcards = await Flashcard.find({ user: userId })
      .populate('document', 'title')
      .select('title totalCards lastReviewed createdAt')
      .sort({ createdAt: -1 })
      .limit(5);

    // Recent quizzes
    const recentQuizzes = await Quiz.find({ user: userId })
      .populate('document', 'title')
      .select('title totalQuestions bestScore createdAt')
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      stats: {
        totalDocuments,
        totalFlashcardSets,
        totalFlashcards,
        totalQuizzes,
        averageQuizScore,
      },
      recentDocuments,
      recentFlashcards,
      recentQuizzes,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getDashboard };