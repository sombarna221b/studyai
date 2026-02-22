const express = require('express');
const router = express.Router();
const {
  getFlashcardsByDocument,
  getAllFlashcards,
  getFlashcardById,
  markReviewed,
  toggleFavorite,
  deleteFlashcard,
} = require('../controllers/flashcardController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getAllFlashcards);
router.get('/document/:documentId', protect, getFlashcardsByDocument);
router.get('/:id', protect, getFlashcardById);
router.put('/:id/review', protect, markReviewed);
router.put('/:id/cards/:cardId/favorite', protect, toggleFavorite);
router.delete('/:id', protect, deleteFlashcard);

module.exports = router;