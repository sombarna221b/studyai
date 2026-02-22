const express = require('express');
const router = express.Router();
const {
  generateFlashcards,
  generateQuiz,
  generateSummary,
  explainConcept,
  chatWithDocument,
  getChatHistory,
  clearChatHistory,
} = require('../controllers/aiController');
const { protect } = require('../middleware/authMiddleware');

router.post('/generate-flashcards/:documentId', protect, generateFlashcards);
router.post('/generate-quiz/:documentId', protect, generateQuiz);
router.post('/summary/:documentId', protect, generateSummary);
router.post('/explain/:documentId', protect, explainConcept);
router.post('/chat/:documentId', protect, chatWithDocument);
router.get('/chat/:documentId/history', protect, getChatHistory);
router.delete('/chat/:documentId/history', protect, clearChatHistory);

module.exports = router;