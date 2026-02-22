# StudyAI 🎓

An AI-powered learning platform that transforms PDF documents into interactive study materials — flashcards, quizzes, summaries and contextual chat — built with the MERN stack and Google Gemini AI.

## Live Demo
🔗 **[studyai.vercel.app](https://studyai.vercel.app)** *(replace with your actual URL after deployment)*

---

## What it does

Upload any PDF — textbook, research paper, lecture notes — and StudyAI will:

- 🃏 **Generate flashcards** — AI creates Q&A cards from your document
- 🎯 **Generate quizzes** — Multiple choice questions with explanations and scoring
- 📝 **Summarize** — Get a concise AI summary of any document
- 💬 **Chat** — Ask questions about your document in natural language
- 📊 **Track progress** — Dashboard with stats, scores and activity timeline

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, React Router v6, CSS Variables |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas |
| AI | Google Gemini AI |
| File Storage | Cloudinary |
| Auth | JWT + bcryptjs |
| Deployment | Vercel (frontend) + Render (backend) |

---

## Project Structure

```
studyai/
├── frontend/          # React app
│   ├── src/
│   │   ├── pages/     # 22 pages
│   │   ├── components/
│   │   ├── context/   # Auth + Theme
│   │   └── services/  # API calls
│   └── README.md
│
├── backend/           # Express API
│   ├── controllers/   # 6 controllers
│   ├── models/        # 5 Mongoose models
│   ├── routes/        # 6 route files
│   ├── config/        # Cloudinary config
│   └── README.md
│
└── README.md
```

---

## Getting Started Locally

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)
- Google Gemini API key
- Cloudinary account

### Backend
```bash
cd backend
npm install
# Create .env with your credentials (see backend/README.md)
npm run dev
```

### Frontend
```bash
cd frontend
npm install
# Create .env with REACT_APP_API_URL=http://localhost:5000/api
npm start
```

---

## Key Features

- 🌗 Dark / Light theme toggle
- 🔐 JWT authentication with protected routes
- 📱 Fully responsive design
- 👤 Profile with avatar upload
- 📄 PDF viewer with Google Docs integration
- ⚡ Real-time AI generation with loading states
- 🗑️ Full CRUD for documents, flashcards and quizzes

---

## Screenshots



---

## Author

**Sombarna Basu** — Built as a college project / portfolio piece.

---

## License

MIT