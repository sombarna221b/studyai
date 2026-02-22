import axios from 'axios';

const API = axios.create({
  baseURL: '/api',
});

// Attach token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 globally
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth
export const registerUser = (data) => API.post('/auth/register', data);
export const loginUser = (data) => API.post('/auth/login', data);
export const getProfile = () => API.get('/auth/profile');
export const updateProfile = (data) => API.put('/auth/profile', data);
export const updatePassword = (data) => API.put('/auth/update-password', data);

// Documents
export const uploadDocument = (formData) => API.post('/documents/upload', formData);
export const getDocuments = () => API.get('/documents');
export const getDocumentById = (id) => API.get(`/documents/${id}`);
export const deleteDocument = (id) => API.delete(`/documents/${id}`);

// AI
export const generateFlashcards = (docId, count) => API.post(`/ai/generate-flashcards/${docId}`, { count });
export const generateQuiz = (docId, count) => API.post(`/ai/generate-quiz/${docId}`, { count });
export const generateSummary = (docId) => API.post(`/ai/summary/${docId}`);
export const explainConcept = (docId, concept) => API.post(`/ai/explain/${docId}`, { concept });
export const sendChatMessage = (docId, message) => API.post(`/ai/chat/${docId}`, { message });
export const getChatHistory = (docId) => API.get(`/ai/chat/${docId}/history`);
export const clearChatHistory = (docId) => API.delete(`/ai/chat/${docId}/history`);

// Flashcards
export const getAllFlashcards = () => API.get('/flashcards');
export const getFlashcardsByDocument = (docId) => API.get(`/flashcards/document/${docId}`);
export const getFlashcardById = (id) => API.get(`/flashcards/${id}`);
export const markFlashcardReviewed = (id) => API.put(`/flashcards/${id}/review`);
export const toggleFavorite = (id, cardId) => API.put(`/flashcards/${id}/cards/${cardId}/favorite`);
export const deleteFlashcard = (id) => API.delete(`/flashcards/${id}`);

// Quizzes
export const getAllQuizzes = () => API.get('/quizzes');
export const getQuizzesByDocument = (docId) => API.get(`/quizzes/document/${docId}`);
export const getQuizById = (id) => API.get(`/quizzes/${id}`);
export const submitQuiz = (id, answers) => API.post(`/quizzes/${id}/submit`, { answers });
export const getQuizResults = (id) => API.get(`/quizzes/${id}/results`);
export const deleteQuiz = (id) => API.delete(`/quizzes/${id}`);

// Dashboard
export const getDashboard = () => API.get('/dashboard');

export default API;