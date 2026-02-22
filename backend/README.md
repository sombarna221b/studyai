# StudyAI - Backend API

A robust REST API built with Node.js, Express, and MongoDB powering the StudyAI platform — an AI-driven learning assistant that transforms PDF documents into interactive study materials.

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB Atlas + Mongoose
- **Authentication:** JWT (JSON Web Tokens) + bcryptjs
- **File Storage:** Cloudinary
- **AI Integration:** Google Gemini AI
- **File Upload:** Multer

## Features

- 🔐 JWT-based authentication (register, login, profile management)
- 📄 PDF upload and text extraction via pdf-parse
- 🤖 AI-powered flashcard generation using Google Gemini
- 🎯 AI-powered quiz generation with auto-scoring
- 💬 Context-aware AI chat with document history
- 📝 AI document summarization and concept explanation
- 🃏 Flashcard management with review tracking and favorites
- 📊 Dashboard with learning statistics

## Project Structure

```
backend/
├── config/
│   └── cloudinary.js       # Cloudinary storage config
├── controllers/
│   ├── authController.js   # Auth logic
│   ├── documentController.js
│   ├── flashcardController.js
│   ├── quizController.js
│   ├── aiController.js
│   └── dashboardController.js
├── middleware/
│   └── authMiddleware.js   # JWT protect middleware
├── models/
│   ├── User.js
│   ├── Document.js
│   ├── Flashcard.js
│   ├── Quiz.js
│   └── ChatHistory.js
├── routes/
│   ├── authRoutes.js
│   ├── documentRoutes.js
│   ├── flashcardRoutes.js
│   ├── quizRoutes.js
│   ├── aiRoutes.js
│   └── dashboardRoutes.js
├── .env
├── server.js
└── package.json
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register new user |
| POST | /api/auth/login | Login user |
| GET | /api/auth/profile | Get user profile |
| PUT | /api/auth/profile | Update profile + avatar |
| PUT | /api/auth/update-password | Change password |
| GET | /api/documents | Get all documents |
| POST | /api/documents/upload | Upload PDF |
| GET | /api/documents/:id | Get document by ID |
| DELETE | /api/documents/:id | Delete document |
| POST | /api/ai/generate-flashcards/:id | Generate flashcards |
| POST | /api/ai/generate-quiz/:id | Generate quiz |
| POST | /api/ai/summary/:id | Generate summary |
| POST | /api/ai/chat/:id | Chat with document |
| GET | /api/ai/chat/:id/history | Get chat history |
| GET | /api/flashcards | Get all flashcard sets |
| PUT | /api/flashcards/:id/review | Mark as reviewed |
| GET | /api/quizzes | Get all quizzes |
| POST | /api/quizzes/:id/submit | Submit quiz answers |
| GET | /api/dashboard | Get dashboard stats |

## Environment Variables

Create a `.env` file in the backend root:

```env
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
GEMINI_API_KEY=your_google_gemini_api_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

## Getting Started

```bash
# Install dependencies
npm install

# Run in development
npm run dev

# Run in production
npm start
```

## Deployment

The backend is deployed on Render in production mode with environment variables securely configured via the Render dashboard.

- Auto-deploy enabled from GitHub
- Production CORS configuration
- MongoDB Atlas cloud connection

## Live API

Base URL:
https://your-backend-name.onrender.com

Health Check:
https://your-backend-name.onrender.com/api/health

## Architecture Overview

- RESTful API architecture
- JWT authentication with protected routes
- Modular MVC pattern (Routes → Controllers → Models)
- Cloudinary for scalable media storage
- MongoDB Atlas for cloud database
- Deployed backend on Render (production environment)
- CORS configured for Vercel frontend integration

## Security Features

- Password hashing using bcryptjs
- JWT authentication with protected middleware
- Environment variable management
- CORS production configuration
- Input validation and centralized error handling