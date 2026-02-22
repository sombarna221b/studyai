const { GoogleGenerativeAI } = require('@google/generative-ai');
const Document = require('../models/Document');
const Flashcard = require('../models/Flashcard');
const Quiz = require('../models/Quiz');
const ChatHistory = require('../models/ChatHistory');

const getGemini = () => {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  return genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
};

// Truncate text to avoid token limits
const truncateText = (text, maxChars = 15000) => {
  if (!text) return '';
  if (text.length <= maxChars) return text;
  return text.substring(0, maxChars) + '... [text truncated]';
};

// @desc   Generate flashcards from document
// @route  POST /api/ai/generate-flashcards/:documentId
// @access Private
const generateFlashcards = async (req, res) => {
  try {
    const { count = 10 } = req.body;

    const document = await Document.findOne({
      _id: req.params.documentId,
      user: req.user._id,
    });

    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    if (!document.extractedText) {
      return res.status(400).json({ message: 'Document has no extractable text' });
    }

    const model = getGemini();
    const prompt = `Based on the following document content, generate exactly ${count} flashcards for studying. 
    Return ONLY a valid JSON array in this exact format, no extra text:
    [{"question": "...", "answer": "..."}]
    
    Document content:
    ${truncateText(document.extractedText)}`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    // Parse JSON safely
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      return res.status(500).json({ message: 'Failed to parse AI response' });
    }
    const cards = JSON.parse(jsonMatch[0]);

    // Save to DB
    const flashcard = await Flashcard.create({
      user: req.user._id,
      document: document._id,
      title: `Flashcards - ${document.title}`,
      cards,
      totalCards: cards.length,
    });

    res.status(201).json(flashcard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Generate quiz from document
// @route  POST /api/ai/generate-quiz/:documentId
// @access Private
const generateQuiz = async (req, res) => {
  try {
    const { count = 5 } = req.body;

    const document = await Document.findOne({
      _id: req.params.documentId,
      user: req.user._id,
    });

    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    if (!document.extractedText) {
      return res.status(400).json({ message: 'Document has no extractable text' });
    }

    const model = getGemini();
    const prompt = `Based on the following document content, generate exactly ${count} multiple choice questions.
    Return ONLY a valid JSON array in this exact format, no extra text:
    [{"question": "...", "options": ["A", "B", "C", "D"], "correctAnswer": 0, "explanation": "..."}]
    correctAnswer is the index (0-3) of the correct option.
    
    Document content:
    ${truncateText(document.extractedText)}`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      return res.status(500).json({ message: 'Failed to parse AI response' });
    }
    const questions = JSON.parse(jsonMatch[0]);

    const quiz = await Quiz.create({
      user: req.user._id,
      document: document._id,
      title: `Quiz - ${document.title}`,
      questions,
      totalQuestions: questions.length,
    });

    res.status(201).json(quiz);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Generate document summary
// @route  POST /api/ai/summary/:documentId
// @access Private
const generateSummary = async (req, res) => {
  try {
    const document = await Document.findOne({
      _id: req.params.documentId,
      user: req.user._id,
    });

    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    if (!document.extractedText) {
      return res.status(400).json({ message: 'Document has no extractable text' });
    }

    const model = getGemini();
    const prompt = `Please provide a concise, well-structured summary of the following document. 
    Include: main topics, key points, and important takeaways. Use clear headings.
    
    Document content:
    ${truncateText(document.extractedText)}`;

    const result = await model.generateContent(prompt);
    const summary = result.response.text();

    // Cache summary in document
    document.summary = summary;
    await document.save();

    res.json({ summary });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Explain a concept from the document
// @route  POST /api/ai/explain/:documentId
// @access Private
const explainConcept = async (req, res) => {
  try {
    const { concept } = req.body;

    if (!concept) {
      return res.status(400).json({ message: 'Please provide a concept to explain' });
    }

    const document = await Document.findOne({
      _id: req.params.documentId,
      user: req.user._id,
    });

    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    const model = getGemini();
    const prompt = `Based on the following document, explain the concept of "${concept}" in detail.
    Provide clear explanations, examples if applicable, and how it relates to the document's main topics.
    
    Document content:
    ${truncateText(document.extractedText)}`;

    const result = await model.generateContent(prompt);
    const explanation = result.response.text();

    res.json({ explanation });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// @desc   AI Chat with document context
// @route  POST /api/ai/chat/:documentId
// @access Private
const chatWithDocument = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ message: 'Message is required' });
    }

    const document = await Document.findOne({
      _id: req.params.documentId,
      user: req.user._id,
    });

    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    // ✅ ADD THIS SAFETY CHECK
    if (!document.extractedText) {
      return res.status(400).json({ message: 'Document has no extractable text' });
    }

    // Get or create chat history
    let chatHistory = await ChatHistory.findOne({
      user: req.user._id,
      document: req.params.documentId,
    });

    if (!chatHistory) {
      chatHistory = await ChatHistory.create({
        user: req.user._id,
        document: req.params.documentId,
        messages: [],
      });
    }

    const model = getGemini();

    // Build conversation context
    const recentMessages = chatHistory.messages.slice(-10);
    const history = recentMessages
      .map((m) => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`)
      .join('\n');

    const prompt = `You are an AI learning assistant. Answer questions based on the provided document.
    Be helpful, accurate, and educational.
    
    Document: "${document.title}"
    Content: ${truncateText(document.extractedText, 8000)}
    
    ${history ? `Conversation history:\n${history}\n` : ''}
    User: ${message}
    Assistant:`;

    const result = await model.generateContent(prompt);
    const aiResponse = result.response.text();

    // Save messages
    chatHistory.messages.push({ role: 'user', content: message });
    chatHistory.messages.push({ role: 'assistant', content: aiResponse });
    await chatHistory.save();

    res.json({ response: aiResponse });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Get chat history for a document
// @route  GET /api/ai/chat/:documentId/history
// @access Private
const getChatHistory = async (req, res) => {
  try {
    const chatHistory = await ChatHistory.findOne({
      user: req.user._id,
      document: req.params.documentId,
    });

    res.json(chatHistory ? chatHistory.messages : []);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Clear chat history for a document
// @route  DELETE /api/ai/chat/:documentId/history
// @access Private
const clearChatHistory = async (req, res) => {
  try {
    await ChatHistory.findOneAndDelete({
      user: req.user._id,
      document: req.params.documentId,
    });

    res.json({ message: 'Chat history cleared' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  generateFlashcards,
  generateQuiz,
  generateSummary,
  explainConcept,
  chatWithDocument,
  getChatHistory,
  clearChatHistory,
};