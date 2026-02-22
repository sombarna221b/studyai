const Flashcard = require('../models/Flashcard');

// @desc   Get all flashcard sets for a document
// @route  GET /api/flashcards/document/:documentId
// @access Private
const getFlashcardsByDocument = async (req, res) => {
  try {
    const flashcards = await Flashcard.find({
      user: req.user._id,
      document: req.params.documentId,
    }).sort({ createdAt: -1 });

    res.json(flashcards);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Get all flashcard sets for user
// @route  GET /api/flashcards
// @access Private
const getAllFlashcards = async (req, res) => {
  try {
    const flashcards = await Flashcard.find({ user: req.user._id })
      .populate('document', 'title')
      .sort({ createdAt: -1 });

    res.json(flashcards);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Get single flashcard set by ID
// @route  GET /api/flashcards/:id
// @access Private
const getFlashcardById = async (req, res) => {
  try {
    const flashcard = await Flashcard.findOne({
      _id: req.params.id,
      user: req.user._id,
    }).populate('document', 'title');

    if (!flashcard) {
      return res.status(404).json({ message: 'Flashcard set not found' });
    }

    res.json(flashcard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Mark a flashcard set as reviewed
// @route  PUT /api/flashcards/:id/review
// @access Private
const markReviewed = async (req, res) => {
  try {
    const flashcard = await Flashcard.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!flashcard) {
      return res.status(404).json({ message: 'Flashcard set not found' });
    }

    flashcard.reviewedCount += 1;
    flashcard.lastReviewed = new Date();
    await flashcard.save();

    res.json({ message: 'Reviewed count updated', reviewedCount: flashcard.reviewedCount });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Toggle favorite on a single card
// @route  PUT /api/flashcards/:id/cards/:cardId/favorite
// @access Private
const toggleFavorite = async (req, res) => {
  try {
    const flashcard = await Flashcard.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!flashcard) {
      return res.status(404).json({ message: 'Flashcard set not found' });
    }

    const card = flashcard.cards.id(req.params.cardId);
    if (!card) {
      return res.status(404).json({ message: 'Card not found' });
    }

    card.isFavorite = !card.isFavorite;
    await flashcard.save();

    res.json({ isFavorite: card.isFavorite });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Delete a flashcard set
// @route  DELETE /api/flashcards/:id
// @access Private
const deleteFlashcard = async (req, res) => {
  try {
    const flashcard = await Flashcard.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!flashcard) {
      return res.status(404).json({ message: 'Flashcard set not found' });
    }

    await flashcard.deleteOne();
    res.json({ message: 'Flashcard set deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getFlashcardsByDocument,
  getAllFlashcards,
  getFlashcardById,
  markReviewed,
  toggleFavorite,
  deleteFlashcard,
};