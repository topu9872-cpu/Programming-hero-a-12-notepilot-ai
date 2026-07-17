# NotePilot AI - Development Guidelines

## Project Overview

Build a production-ready full-stack AI-powered note management platform.

Project Name:
NotePilot AI

Purpose:
A smart note application where users can create, manage, organize, and enhance notes using Artificial Intelligence.

The application must demonstrate:
- Full-stack development
- AI integration
- Authentication
- Authorization
- Database management
- Professional UI/UX
- Agentic AI workflow


# Technology Stack

## Frontend

Framework:
- React 19
- Vite

Language:
- TypeScript only

Styling:
- Tailwind CSS

Libraries:
- React Router DOM
- TanStack Query
- Axios
- React Hook Form
- Framer Motion
- React Icons
- Sonner
- Recharts


## Backend

Runtime:
- Node.js

Framework:
- Express.js

Language:
- TypeScript only

Database:
- MongoDB Native Driver

Authentication:
- JWT
- Google OAuth


## AI

Provider:
- Groq API

AI Features:
1. AI Note Summary
2. AI Auto Tagging
3. AI Context Assistant


# Coding Rules

Follow these rules strictly:

- Use TypeScript everywhere.
- Never use JavaScript files.
- Use arrow functions.
- Use functional React components.
- Avoid unnecessary complexity.
- Write clean readable code.
- Use meaningful variable names.
- Do not use any unless absolutely necessary.
- Create reusable components.
- Keep components small.
- Separate business logic from UI.
- Use proper error handling.


# Frontend Rules

Folder structure:

src/
 ├── components/
 ├── pages/
 ├── layouts/
 ├── hooks/
 ├── services/
 ├── api/
 ├── types/
 ├── utils/
 ├── context/


Rules:

- Components must be reusable.
- Pages should not contain huge logic.
- API calls must be separated.
- Use TanStack Query for server state.
- Use Axios for HTTP requests.


# Backend Rules

Structure:

src/
 ├── routes/
 ├── controllers/
 ├── services/
 ├── middleware/
 ├── db/
 ├── utils/
 ├── types/


Rules:

- Keep routes clean.
- Business logic goes into services.
- Validate user input.
- Handle errors properly.
- Protect private routes.


# UI Rules

Follow professional SaaS design.

Requirements:

- Responsive on mobile, tablet, desktop.
- Maximum 3 primary colors.
- Consistent spacing.
- Same card style.
- Smooth animations.
- No placeholder content.


# AI Development Rules

Never build the whole project at once.

Work phase by phase.

Before writing code:
1. Explain the plan.
2. Wait for approval.

When writing code:
- Explain file changes.
- Generate clean code.
- Mention dependencies.

After coding:
- Explain how to test.


# Development Workflow

Follow:

Planning
↓
Architecture
↓
Implementation
↓
Testing
↓
Optimization
↓
Deployment


# Important

Do not make assumptions.

Ask questions when requirements are unclear.

Always prioritize:
1. Code quality
2. Maintainability
3. Security
4. Performance
5. User experience