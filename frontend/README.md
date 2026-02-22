# StudyAI - Frontend

A modern, responsive React application for StudyAI — an AI-powered learning platform that transforms PDF documents into flashcards, quizzes, summaries and interactive chat.

## Tech Stack

- **Framework:** React 18
- **Routing:** React Router v6
- **HTTP Client:** Axios
- **Notifications:** React Hot Toast
- **Styling:** Pure CSS with CSS Variables (no Tailwind/Bootstrap)
- **Theme:** Dark / Light mode with persistent toggle

## Features

- 🌗 Dark/Light theme toggle persisted across sessions
- 🔐 JWT authentication with protected routes
- 📄 PDF upload with Cloudinary storage + inline viewer
- 💬 Real-time AI chat with document context
- 🃏 Flashcard viewer with flip animation + favorites
- 🎯 Interactive quiz with scoring and review
- 📊 Dashboard with stats and recent activity timeline
- 👤 Profile with Base64 avatar upload
- 📱 Fully responsive design

## Project Structure

```
frontend/
├── public/
├── src/
│   ├── context/
│   │   ├── AuthContext.js      # JWT + user state
│   │   └── ThemeContext.js     # Dark/light theme
│   ├── components/
│   │   └── Layout.js           # Sidebar + navigation
│   ├── pages/
│   │   ├── LandingPage.js
│   │   ├── LoginPage.js
│   │   ├── RegisterPage.js
│   │   ├── DashboardPage.js
│   │   ├── DocumentsPage.js
│   │   ├── DocumentDetailPage.js
│   │   ├── FlashcardsPage.js
│   │   ├── FlashcardViewerPage.js
│   │   ├── QuizzesPage.js
│   │   ├── QuizTakePage.js
│   │   ├── QuizResultPage.js
│   │   ├── ProfilePage.js
│   │   └── static/
│   │       ├── SharedLayout.js
│   │       ├── AboutPage.js
│   │       ├── BlogPage.js
│   │       ├── CareersPage.js
│   │       ├── ContactPage.js
│   │       ├── CookiesPage.js
│   │       ├── FAQPage.js
│   │       ├── PartnershipsPage.js
│   │       ├── PrivacyPage.js
│   │       ├── SecurityPage.js
│   │       └── TermsPage.js
│   ├── services/
│   │   └── api.js              # All Axios API calls
│   ├── App.js
│   └── index.js
└── package.json
```

## Pages

| Route | Page | Auth |
|-------|------|------|
| / | Landing Page | Public |
| /login | Login | Public |
| /register | Register | Public |
| /app/dashboard | Dashboard | Protected |
| /app/documents | Documents | Protected |
| /app/documents/:id | Document Detail | Protected |
| /app/flashcards | Flashcards | Protected |
| /app/flashcards/:id | Flashcard Viewer | Protected |
| /app/quizzes | Quizzes | Protected |
| /app/quizzes/:id/take | Take Quiz | Protected |
| /app/quizzes/:id/results | Quiz Results | Protected |
| /app/profile | Profile | Protected |
| /about | About | Public |
| /privacy | Privacy Policy | Public |
| /terms | Terms of Service | Public |
| /faq | FAQ | Public |
| /contact | Contact | Public |
| /careers | Careers | Public |
| /blog | Blog | Public |
| /partnerships | Partnerships | Public |
| /security | Security | Public |
| /cookies | Cookie Policy | Public |

## Environment Variables

Create a `.env` file in the frontend root:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

For production:
```env
REACT_APP_API_URL=https://your-render-backend-url.onrender.com/api
```

## Getting Started

```bash
# Install dependencies
npm install

# Run in development
npm start

# Build for production
npm run build
```

## Deployment

Deployed on **Vercel**. Set the `REACT_APP_API_URL` environment variable in Vercel dashboard to point to your Render backend URL.