# AI Finance Manager

A modern, full-stack finance management platform powered by AI. Built with Next.js, Supabase, Prisma, Tailwind CSS, Inngest, ArcJet, and Shadcn UI, this project enables users to manage accounts, track budgets, analyze transactions, and leverage AI for smarter financial workflows.

---

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Folder Structure](#folder-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Credits](#credits)

---

## Overview
AI Finance Manager provides a robust foundation for personal or small business finance management. It supports user authentication, account and transaction management, budget tracking, AI-powered receipt scanning, and more. The project is designed for extensibility, scalability, and modern developer experience.

---

## Features
- **User Authentication**: Secure sign-up and sign-in flows
- **Account Management**: Create and manage multiple financial accounts
- **Transaction Tracking**: Add, view, and categorize transactions
- **Budgeting**: Set and monitor budgets with progress visualization
- **AI Receipt Scanner**: Extract transaction data from receipts using AI
- **Email Notifications**: Automated email alerts and summaries
- **Modern UI**: Responsive, accessible, and customizable interface
- **Event-Driven Backend**: Inngest for background jobs and workflows

---

## Architecture
- **Frontend**: Next.js (App Router), React, Tailwind CSS, Shadcn UI
- **Backend**: Next.js API routes, Supabase (Postgres), Prisma ORM
- **AI & Automation**: Inngest (event-driven jobs), Gemini API (AI), ArcJet (security)
- **Email**: Resend API for transactional emails

---

## Folder Structure
```
├── actions/           # Server-side business logic (accounts, budgets, transactions)
├── app/               # Next.js app directory
│   ├── (auth)/        # Authentication pages (sign-in, sign-up)
│   ├── (main)/        # Main app pages (dashboard, accounts, transactions)
│   ├── api/           # API routes (Inngest, seed)
│   └── lib/           # App-specific libraries and schema
├── components/        # Reusable React components (UI, header, hero, etc.)
│   └── ui/            # UI primitives (button, card, table, etc.)
├── data/              # Static data (categories, landing page)
├── emails/            # Email templates
├── hooks/             # Custom React hooks
├── lib/               # Shared libraries (Prisma, ArcJet, utils, Inngest)
├── prisma/            # Prisma schema and migrations
├── public/            # Static assets (images, logos)
├── ...                # Config files, README, etc.
```

---

## Getting Started

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd ai-finance-platform
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
See [Environment Variables](#environment-variables) below. Create a `.env` file in the root directory and fill in the required values.

### 4. Set Up the Database
```bash
npx prisma migrate dev
```

### 5. Run the Development Server
```bash
npm run dev
```

---

## Environment Variables
Create a `.env` file in the root directory with the following variables:
```env
DATABASE_URL=
DIRECT_URL=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/onboarding
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding
GEMINI_API_KEY=
RESEND_API_KEY=
ARCJET_KEY=
```
- `DATABASE_URL`, `DIRECT_URL`: Your Supabase/Postgres connection strings
- `CLERK_*`: Clerk authentication keys and URLs
- `GEMINI_API_KEY`: API key for AI-powered features
- `RESEND_API_KEY`: For sending emails
- `ARCJET_KEY`: Security integration

---

## Usage
- Access the dashboard to view account summaries and recent transactions
- Add new accounts and transactions
- Set budgets and monitor progress
- Scan receipts to auto-extract transaction data
- Receive email notifications for important events

---

## Deployment
1. Deploy to Vercel, Netlify, or your preferred platform
2. Set all environment variables in your deployment environment
3. Run database migrations on your production database
4. Configure authentication and email providers as needed

---

## Contributing
We welcome contributions!
1. Fork the repository and create a new branch from `main`
2. Make your changes with clear, descriptive commit messages
3. Ensure your code passes linting and tests
4. Open a pull request with a detailed description of your changes

---

