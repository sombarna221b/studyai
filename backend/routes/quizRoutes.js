const express = require('express');
const router = express.Router();
const {
  getQuizzesByDocument,
  getAllQuizzes,
  getQuizById,
  submitQuiz,
  getQuizResults,
  deleteQuiz,
} = require('../controllers/quizController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getAllQuizzes);
router.get('/document/:documentId', protect, getQuizzesByDocument);
router.get('/:id', protect, getQuizById);
router.post('/:id/submit', protect, submitQuiz);
router.get('/:id/results', protect, getQuizResults);
router.delete('/:id', protect, deleteQuiz);

module.exports = router;