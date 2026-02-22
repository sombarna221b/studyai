const Quiz = require('../models/Quiz');

// @desc   Get all quizzes for a document
// @route  GET /api/quizzes/document/:documentId
// @access Private
const getQuizzesByDocument = async (req, res) => {
  try {
    const quizzes = await Quiz.find({
      user: req.user._id,
      document: req.params.documentId,
    })
      .select('-questions.correctAnswer')
      .sort({ createdAt: -1 });

    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Get all quizzes for user
// @route  GET /api/quizzes
// @access Private
const getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find({ user: req.user._id })
      .populate('document', 'title')
      .sort({ createdAt: -1 });

    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Get a single quiz by ID (for taking the quiz - no correct answers)
// @route  GET /api/quizzes/:id
// @access Private
const getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findOne({
      _id: req.params.id,
      user: req.user._id,
    }).populate('document', 'title');

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    // Strip correct answers before sending
    const safeQuiz = {
      ...quiz.toObject(),
      questions: quiz.questions.map((q) => ({
        _id: q._id,
        question: q.question,
        options: q.options,
      })),
    };

    res.json(safeQuiz);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Submit quiz answers and get results
// @route  POST /api/quizzes/:id/submit
// @access Private
const submitQuiz = async (req, res) => {
  try {
    const { answers } = req.body; // array of selected option indexes

    const quiz = await Quiz.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    // Calculate score
    let score = 0;
    const breakdown = quiz.questions.map((q, i) => {
      const isCorrect = answers[i] === q.correctAnswer;
      if (isCorrect) score++;
      return {
        question: q.question,
        options: q.options,
        selectedAnswer: answers[i],
        correctAnswer: q.correctAnswer,
        isCorrect,
        explanation: q.explanation,
      };
    });

    const percentage = Math.round((score / quiz.questions.length) * 100);

    // Save result
    quiz.results.push({
      score,
      totalQuestions: quiz.questions.length,
      percentage,
      answers,
    });

    if (percentage > quiz.bestScore) {
      quiz.bestScore = percentage;
    }

    await quiz.save();

    res.json({
      score,
      totalQuestions: quiz.questions.length,
      percentage,
      breakdown,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Get quiz results history
// @route  GET /api/quizzes/:id/results
// @access Private
const getQuizResults = async (req, res) => {
  try {
    const quiz = await Quiz.findOne({
      _id: req.params.id,
      user: req.user._id,
    }).select('title results bestScore totalQuestions');

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    res.json(quiz);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Delete a quiz
// @route  DELETE /api/quizzes/:id
// @access Private
const deleteQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    await quiz.deleteOne();
    res.json({ message: 'Quiz deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getQuizzesByDocument,
  getAllQuizzes,
  getQuizById,
  submitQuiz,
  getQuizResults,
  deleteQuiz,
};