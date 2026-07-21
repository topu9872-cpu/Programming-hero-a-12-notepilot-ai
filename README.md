# NotePilot AI

NotePilot AI is a full-stack AI-powered note management platform designed to help users create, organize, explore, and manage their notes with intelligent AI assistance.

The application provides secure authentication, personalized note management, favorites, AI-powered summarization, automatic note classification, and a modern responsive dashboard.

## Live Demo

- Frontend: https://notepilot-frontend.vercel.app
- Backend API: https://notepilot-backend.vercel.app

## Features

### Authentication
- Email and password authentication
- Google OAuth login
- Secure session management with Better Auth
- Protected routes
- User-specific note access
- Secure authorization for protected backend APIs

### Note Management
- Create notes
- View all public notes
- View individual note details
- Update notes
- Delete notes
- View personal notes
- Responsive note details page

### Favorites
- Add notes to favorites
- Remove notes from favorites
- View favorite notes
- Protected favorite operations
- User-specific favorite management

### AI Features

#### AI Note Summarization
Users can generate concise summaries from their notes using Google Gemini AI.

#### AI Auto Classification & Tagging
The AI analyzes note content and automatically generates:
- Category
- Relevant tags
- Difficulty level

Example:

```json
{
  "category": "Frontend Development",
  "tags": [
    "React",
    "React Hooks",
    "JavaScript"
  ],
  "difficulty": "Beginner"
}



Tech Stack
Frontend
React
TypeScript
Vite
Tailwind CSS
React Router
Better Auth React Client
React Icons
Sonner
Backend
Node.js
Express.js
TypeScript
MongoDB
Better Auth
Google Gemini AI
REST API
Deployment
Vercel
MongoDB Atlas
Project Structure
NotePilot AI
│
├── api
│   ├── ai
│   │   └── gemini.ts
│   ├── auth.ts
│   ├── db.ts
│   └── server
│
├── src
│   ├── api
│   │   └── ServerRoute.ts
│   ├── components
│   ├── lib
│   │   └── auth-client.ts
│   ├── pages
│   │   ├── Explore
│   │   ├── Dashboard
│   │   └── Profile
│   └── main.tsx
│
└── README.md
API Endpoints
Health Check
GET /api
Authentication
GET /api/auth/get-session
POST /api/auth/sign-in/email
POST /api/auth/sign-up/email
POST /api/auth/sign-out
Notes
GET /api/all-notes
GET /api/all-notes/:id
GET /api/my-notes
GET /api/my-notes/:id
POST /api/all-notes
PATCH /api/all-notes/:id
DELETE /api/delete-student-notes/:id
Favorites
GET /api/favorited
POST /api/favorited
DELETE /api/favorited
GET /api/favorited/:id
AI
POST /api/ai/summary
POST /api/ai/classify
Environment Variables
Frontend

Create a .env file in the frontend/root project:

VITE_API_URL=https://notepilot-backend.vercel.app/api

For local development:

VITE_API_URL=http://localhost:3000/api
Backend

Create environment variables for the backend:

MONGODB_URI=your_mongodb_connection_string

BETTER_AUTH_SECRET=your_better_auth_secret

BETTER_AUTH_URL=https://notepilot-backend.vercel.app

GOOGLE_CLIENT_ID=your_google_client_id

GOOGLE_CLIENT_SECRET=your_google_client_secret

GEMINI_API_KEY=your_gemini_api_key

GEMINI_MODEL=your_supported_gemini_model

Never commit .env files or secret API keys to GitHub.

Installation

Clone the repository:

git clone https://github.com/topu9872-cpu/Programming-hero-a-12-notepilot-ai.git

Go to the project directory:

cd Programming-hero-a-12-notepilot-ai

Install dependencies:

npm install

If the backend has a separate package:

cd api
npm install
Run Locally
Start Frontend

From the frontend/root directory:

npm run dev

The frontend will run on:

http://localhost:5173
Start Backend

From the backend directory:

npm run dev

The backend will run on:

http://localhost:3000
Google OAuth Configuration

For production Google login, configure the following in Google Cloud Console.

Authorized JavaScript Origin
https://notepilot-frontend.vercel.app
Authorized Redirect URI
https://notepilot-backend.vercel.app/api/auth/callback/google

The frontend Google login redirects users back to:

https://notepilot-frontend.vercel.app/
Security
Better Auth session-based authentication
Protected backend routes
Server-side authorization
Client-supplied user IDs are not trusted for authorization
Authenticated requests use session cookies
credentials: "include" is used for authenticated frontend API requests
Sensitive environment variables are kept outside source control
Production Verification

The production backend has been verified for:

Health check
Better Auth session
Email authentication routes
Google OAuth authentication
Public notes
Individual note details
Protected personal notes
Note creation
Note updates
Note deletion
Favorites
AI summarization
AI classification

Protected endpoints correctly reject unauthenticated requests.

AI endpoints are powered by Google Gemini and return structured JSON responses.

Author
Mehedi Hasan Topu

Frontend & Full-Stack Developer

Portfolio: https://topudev.vercel.app
GitHub: https://github.com/topu9872-cpu
License

This project was developed as a full-stack TypeScript and AI-powered application project.