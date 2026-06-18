<div align="center">

# FinSight — AI Finance Manager

**A modern, full-stack personal finance platform powered by AI**

Built with Next.js 15 · React 19 · Supabase · Prisma · Clerk · Gemini AI · Inngest · Tailwind CSS

[![Next.js](https://img.shields.io/badge/Next.js-15.1.6-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0.0-61DAFB?logo=react)](https://react.dev/)
[![Prisma](https://img.shields.io/badge/Prisma-6.3.1-2D3748?logo=prisma)](https://www.prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![Clerk](https://img.shields.io/badge/Clerk-Auth-6C47FF?logo=clerk)](https://clerk.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

</div>

---

## What is this project?

FinSight is a comprehensive AI-powered personal finance management platform that helps users take control of their financial life. It provides a beautiful, responsive dashboard for managing multiple financial accounts, tracking income and expenses, setting budgets with real-time progress monitoring, and leveraging Google's Gemini AI to automatically extract transaction data from receipt images.

The platform features an event-driven backend powered by Inngest for automated recurring transactions, budget alert notifications, and monthly financial report generation — all delivered via beautifully styled emails through the Resend API.

---

## Main Features

### Core Financial Management
- **Multi-Account Support** — Create and manage multiple financial accounts (Current & Savings) with real-time balance tracking
- **Transaction Management** — Add, view, search, filter, and bulk-delete transactions with full categorization
- **Budget Tracking** — Set monthly budgets with visual progress bars showing spending percentage against budget limits
- **Default Account** — Set a default account for quick transaction entry during onboarding or later

### AI-Powered Capabilities
- **Receipt Scanner** — Upload receipt images and let Gemini AI automatically extract the amount, date, description, and category
- **Smart Categorization** — AI suggests the most appropriate category from 15 predefined categories when scanning receipts

### Recurring Transactions
- **Automated Recurring Entries** — Set transactions to repeat on a Daily, Weekly, Monthly, or Yearly schedule
- **Background Processing** — Inngest cron jobs automatically create new transaction records when recurring transactions come due
- **Balance Auto-Update** — Account balances are automatically adjusted when recurring transactions are processed

### Notifications & Reports
- **Budget Alerts** — Automatic email notifications when spending exceeds 80% (warning) or 100% (exceeded) of the monthly budget
- **Monthly Financial Reports** — Auto-generated monthly spending summaries sent via email on the 1st of each month
- **Styled Email Templates** — Professional HTML emails with FinSight branding using React Email

### User Experience
- **Modern UI/UX** — Glassmorphism effects, gradient animations, responsive design built with Shadcn UI and Tailwind CSS
- **Dark/Light Mode** — Full theme support via `next-themes`
- **Interactive Charts** — Income vs. expense trend visualization with Recharts on account detail pages
- **Animated Landing Page** — Hero section with animated grid background, stat counters, feature cards, how-it-works steps, and testimonials
- **Real-Time Feedback** — Toast notifications (Sonner) for all user actions
- **Loading States** — Skeleton loaders and progress bars for smooth perceived performance

### Security
- **Authentication** — Clerk-powered authentication with sign-in, sign-up, and session management
- **Route Protection** — Middleware-based route protection ensuring only authenticated users access the app
- **Rate Limiting** — ArcJet token-bucket rate limiting on sensitive operations
- **Input Validation** — Zod schema validation on all forms and server actions

---

## Table of Contents

- [What is this project?](#what-is-this-project)
- [Main Features](#main-features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Database Schema](#database-schema)
- [Project Structure](#project-structure)
- [Pages & Routes](#pages--routes)
- [Server Actions](#server-actions)
- [Background Jobs (Inngest)](#background-jobs-inngest)
- [API Routes](#api-routes)
- [Components](#components)
- [Email System](#email-system)
- [Security](#security)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Seeding the Database](#seeding-the-database)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Framework** | Next.js 15 (App Router) | Full-stack React framework with server components |
| **UI Library** | React 19 | Component-based UI with latest concurrent features |
| **Styling** | Tailwind CSS 3 + CSS Variables | Utility-first styling with design token system |
| **Component Library** | Shadcn UI (New York style) | 25+ accessible, customizable UI primitives |
| **Icons** | Lucide React | Beautiful, consistent icon set |
| **Charts** | Recharts | Composable charting library for financial data visualization |
| **Authentication** | Clerk | User authentication, session management, and user profiles |
| **Database** | Supabase (PostgreSQL) | Managed Postgres database with connection pooling |
| **ORM** | Prisma 6 | Type-safe database client with migrations |
| **AI** | Google Gemini API | Receipt scanning and data extraction |
| **Background Jobs** | Inngest | Event-driven functions, cron scheduling, and workflow orchestration |
| **Email** | Resend + React Email | Transactional email delivery with React-based templates |
| **Security** | ArcJet | Rate limiting and bot protection |
| **Forms** | React Hook Form + Zod | Performant form handling with schema-based validation |
| **Date Handling** | date-fns | Lightweight date utility library |
| **Theming** | next-themes | Dark/light mode toggle |
| **Notifications** | Sonner | Toast notification system |

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT (Browser)                        │
│  Next.js App Router · React 19 · Tailwind CSS · Shadcn UI      │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────────┐   │
│  │ Landing  │ │Dashboard │ │ Account  │ │ Create           │   │
│  │ Page     │ │ Page     │ │ Detail   │ │ Transaction      │   │
│  └──────────┘ └──────────┘ └──────────┘ └──────────────────┘   │
└─────────────────────────┬───────────────────────────────────────┘
                          │ Server Actions / API Routes
┌─────────────────────────▼───────────────────────────────────────┐
│                       SERVER (Next.js)                          │
│  ┌─────────────────┐  ┌─────────────────┐  ┌────────────────┐  │
│  │ Server Actions   │  │ API Routes      │  │ Middleware      │  │
│  │ (actions/)       │  │ (app/api/)      │  │ (Clerk Auth)   │  │
│  │ • account.js     │  │ • /api/inngest  │  └────────────────┘  │
│  │ • transaction.js │  │ • /api/seed     │                      │
│  │ • budget.js      │  └─────────────────┘                      │
│  │ • dashboard.js   │                                           │
│  │ • user.js        │                                           │
│  │ • seed.js        │                                           │
│  └────────┬─────────┘                                           │
│           │                                                     │
│  ┌────────▼─────────┐  ┌─────────────────┐  ┌───────────────┐  │
│  │ Prisma ORM       │  │ Inngest         │  │ External APIs │  │
│  │                  │  │ • Budget Alerts  │  │ • Gemini AI   │  │
│  │                  │  │ • Recurring Txns │  │ • Resend      │  │
│  │                  │  │ • Monthly Report │  │ • ArcJet      │  │
│  └────────┬─────────┘  └─────────────────┘  └───────────────┘  │
└───────────┼─────────────────────────────────────────────────────┘
            │
┌───────────▼─────────────────────────────────────────────────────┐
│                   DATABASE (Supabase PostgreSQL)                 │
│  ┌──────┐  ┌─────────┐  ┌─────────────┐  ┌──────────┐         │
│  │ User │  │ Account │  │ Transaction │  │ Budget   │         │
│  └──────┘  └─────────┘  └─────────────┘  └──────────┘         │
└─────────────────────────────────────────────────────────────────┘
```

---

## Database Schema

### Models

#### User
| Field | Type | Description |
|-------|------|-------------|
| `id` | String (CUID) | Primary key |
| `clerkUserId` | String (Unique) | Clerk authentication identifier |
| `email` | String (Unique) | User email address |
| `name` | String (Optional) | Display name |
| `imageUrl` | String (Optional) | Profile image URL |
| `createdAt` | DateTime | Account creation timestamp |
| `updatedAt` | DateTime | Last update timestamp |

**Relations**: Has many → Accounts, Budgets, Transactions

#### Account
| Field | Type | Description |
|-------|------|-------------|
| `id` | String (CUID) | Primary key |
| `name` | String | Account name (e.g., "Main Checking") |
| `type` | Enum | `CURRENT` or `SAVINGS` |
| `balance` | Decimal | Current balance (default: 0) |
| `isDefault` | Boolean | Whether this is the default account |
| `userId` | String | Foreign key → User |

**Relations**: Belongs to → User, Has many → Transactions

#### Transaction
| Field | Type | Description |
|-------|------|-------------|
| `id` | String (CUID) | Primary key |
| `type` | Enum | `INCOME` or `EXPENSE` |
| `amount` | Decimal | Transaction amount |
| `description` | String | Transaction description |
| `date` | DateTime | Transaction date |
| `category` | String | Category (e.g., "groceries", "utilities") |
| `receiptUrl` | String (Optional) | URL of uploaded receipt image |
| `isRecurring` | Boolean | Whether this is a recurring transaction |
| `recurringInterval` | Enum (Optional) | `DAILY`, `WEEKLY`, `MONTHLY`, or `YEARLY` |
| `nextRecurringDate` | DateTime (Optional) | Next date for recurring processing |
| `lastProcessedDate` | DateTime (Optional) | Last recurring processing date |
| `status` | Enum | `PENDING`, `COMPLETED`, or `FAILED` |
| `userId` | String | Foreign key → User |
| `accountId` | String | Foreign key → Account |

**Relations**: Belongs to → User, Account

#### Budget
| Field | Type | Description |
|-------|------|-------------|
| `id` | String (CUID) | Primary key |
| `amount` | Decimal | Monthly budget limit |
| `lastAlertSent` | DateTime (Optional) | Timestamp of last budget alert email |
| `userId` | String (Unique) | Foreign key → User (one budget per user) |

**Relations**: Belongs to → User

### Enums

| Enum | Values |
|------|--------|
| `AccountType` | `CURRENT`, `SAVINGS` |
| `TransactionType` | `INCOME`, `EXPENSE` |
| `TransactionStatus` | `PENDING`, `COMPLETED`, `FAILED` |
| `RecurringInterval` | `DAILY`, `WEEKLY`, `MONTHLY`, `YEARLY` |

---

## Project Structure

```
ai-finance-platform/
├── actions/                          # Server-side business logic
│   ├── account.js                    #   Account CRUD, default account, bulk delete
│   ├── budget.js                     #   Budget get/update operations
│   ├── dashboard.js                  #   Dashboard data aggregation
│   ├── seed.js                       #   Database seeding with sample data
│   ├── transaction.js                #   Transaction CRUD + AI receipt scanning
│   └── user.js                       #   Clerk ↔ Database user sync
│
├── app/                              # Next.js App Router
│   ├── (auth)/                       #   Authentication route group
│   │   ├── layout.js                 #     Centered auth layout
│   │   ├── sign-in/[[...sign-in]]/   #     Sign-in page (Clerk)
│   │   │   └── page.jsx
│   │   └── sign-up/[[...sign-up]]/   #     Sign-up page (Clerk)
│   │       └── page.jsx
│   ├── (main)/                       #   Main app route group
│   │   ├── account/[id]/             #     Account detail with charts & transactions
│   │   │   └── page.jsx
│   │   ├── dashboard/                #     Dashboard with budget, accounts, recent txns
│   │   │   ├── layout.js
│   │   │   └── page.jsx
│   │   ├── onboarding/               #     New user onboarding flow
│   │   │   └── page.jsx
│   │   ├── transaction/create/       #     Create transaction form with AI scanner
│   │   │   └── page.jsx
│   │   └── layout.js                 #     Main layout with header
│   ├── api/                          #   API endpoints
│   │   ├── inngest/route.js          #     Inngest webhook handler
│   │   └── seed/route.js             #     Database seed endpoint
│   ├── lib/
│   │   └── schema.js                 #   Zod validation schemas
│   ├── globals.css                   #   Global styles + gradient animation
│   ├── layout.js                     #   Root layout (Clerk, themes, toast)
│   ├── not-found.jsx                 #   Custom 404 page
│   └── page.jsx                      #   Landing page (hero, features, CTA)
│
├── components/                       # Reusable React components
│   ├── account-card.jsx              #   Account card (balance, type, actions)
│   ├── budget-progress.jsx           #   Budget progress bar with percentage
│   ├── create-account-drawer.jsx     #   Slide-up drawer for new accounts
│   ├── header.jsx                    #   App header with nav + Clerk auth
│   ├── hero.jsx                      #   Landing page hero section
│   ├── transaction-table.jsx         #   Transaction list with search/filter/pagination
│   └── ui/                           #   Shadcn UI primitives (25+ components)
│       ├── accordion.jsx
│       ├── badge.jsx
│       ├── button.jsx
│       ├── calendar.jsx
│       ├── card.jsx
│       ├── chart.jsx
│       ├── checkbox.jsx
│       ├── date-picker.jsx
│       ├── dialog.jsx
│       ├── drawer.jsx
│       ├── dropdown-menu.jsx
│       ├── input.jsx
│       ├── popover.jsx
│       ├── progress.jsx
│       ├── select.jsx
│       ├── separator.jsx
│       ├── sheet.jsx
│       ├── switch.jsx
│       ├── table.jsx
│       ├── tabs.jsx
│       ├── textarea.jsx
│       └── tooltip.jsx
│
├── data/                             # Static data
│   ├── categories.js                 #   Category → color mappings (15 categories)
│   └── landing.js                    #   Landing page content (stats, features, etc.)
│
├── emails/                           # Email templates
│   └── template.jsx                  #   React Email template with FinSight branding
│
├── hooks/                            # Custom React hooks
│   └── use-fetch.js                  #   Generic async data fetching hook
│
├── lib/                              # Shared libraries
│   ├── arcjet.js                     #   ArcJet rate limiting configuration
│   ├── inngest/
│   │   ├── client.js                 #   Inngest client instance
│   │   └── function.js               #   Background job definitions
│   ├── prisma.js                     #   Prisma client singleton
│   └── utils.js                      #   Utility functions (cn)
│
├── prisma/                           # Database
│   ├── schema.prisma                 #   Prisma schema definition
│   └── migrations/                   #   Database migration history
│
├── public/                           # Static assets
│   ├── hero.png                      #   Hero section image
│   ├── logo.png                      #   FinSight logo (primary)
│   └── logo2.png                     #   FinSight logo (alternate)
│
├── .env                              # Environment variables (git-ignored)
├── .eslintrc.json                    # ESLint configuration
├── .gitignore                        # Git ignore rules
├── components.json                   # Shadcn UI configuration
├── jsconfig.json                     # JavaScript path aliases
├── middleware.js                     # Clerk auth middleware
├── next.config.mjs                   # Next.js configuration
├── package.json                      # Dependencies and scripts
├── postcss.config.mjs                # PostCSS configuration
└── tailwind.config.cjs               # Tailwind CSS configuration
```

---

## Pages & Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | Landing Page | Marketing page with hero, features, how-it-works, testimonials, and CTA |
| `/sign-in` | Sign In | Clerk-powered sign-in with custom theming |
| `/sign-up` | Sign Up | Clerk-powered sign-up with custom theming |
| `/onboarding` | Onboarding | First-time user setup — select or create a default account |
| `/dashboard` | Dashboard | Overview with budget progress, account cards, and 5 most recent transactions |
| `/account/[id]` | Account Detail | Account-specific view with income/expense charts and full transaction table |
| `/transaction/create` | Create Transaction | Form with type selector, amount, category, date picker, recurring options, and AI receipt scanner |
| `/not-found` | 404 Page | Custom "page not found" with link back to dashboard |

### Route Groups
- **`(auth)/`** — Authentication pages with a centered layout (no header/sidebar)
- **`(main)/`** — Main application pages with the app header and navigation

---

## Server Actions

### `actions/account.js`
| Action | Parameters | Description |
|--------|-----------|-------------|
| `getAccountWithTransactions` | `accountId` | Fetches an account with all related transactions for the authenticated user |
| `bulkDeleteTransactions` | `transactionIds` | Deletes multiple transactions, recalculates affected account balances, and cancels any associated Inngest scheduled events |
| `updateDefaultAccount` | `accountId` | Sets the specified account as the default, unsetting any previous default |

### `actions/budget.js`
| Action | Parameters | Description |
|--------|-----------|-------------|
| `getCurrentBudget` | — | Retrieves the authenticated user's current budget |
| `updateBudget` | `amount` | Creates or updates the user's monthly budget amount |

### `actions/dashboard.js`
| Action | Parameters | Description |
|--------|-----------|-------------|
| `getDashboardData` | — | Aggregates dashboard data: all accounts with transaction totals (income/expense), budget, and 5 most recent transactions |

### `actions/transaction.js`
| Action | Parameters | Description |
|--------|-----------|-------------|
| `createTransaction` | `data` | Creates a new transaction, updates account balance, and schedules Inngest events for recurring transactions |
| `getTransaction` | `id` | Retrieves a single transaction by ID |
| `scanReceipt` | `file` (base64) | Sends receipt image to Gemini AI for data extraction (amount, date, description, category) |

### `actions/user.js`
| Action | Parameters | Description |
|--------|-----------|-------------|
| `checkUser` | — | Syncs the Clerk-authenticated user to the database, creating a new record if the user doesn't exist |

### `actions/seed.js`
| Action | Parameters | Description |
|--------|-----------|-------------|
| `seedTransactions` | — | Generates up to 90 randomized sample transactions spread over 90 days for testing purposes |

---

## Background Jobs (Inngest)

FinSight uses Inngest for event-driven background processing with three core functions:

### 1. Budget Alert Check (`checkBudgetAlerts`)
- **Trigger**: `transaction.created` event
- **Behavior**: When a new transaction is created, calculates the user's total spending for the current month. If spending exceeds the budget:
  - **≥ 80%**: Sends a "Budget Warning" email
  - **≥ 100%**: Sends a "Budget Exceeded" email
- **Rate Limit**: Only sends one alert per budget per day (checks `lastAlertSent`)

### 2. Recurring Transaction Processor (`triggerRecurringTransactions`)
- **Trigger**: Cron schedule (runs daily)
- **Behavior**: Finds all recurring transactions where `nextRecurringDate` is due. For each:
  1. Creates a new transaction record with the current date
  2. Updates the account balance (add for income, subtract for expense)
  3. Calculates and sets the next recurring date based on the interval
  4. Updates `lastProcessedDate`

### 3. Monthly Report Generator (`generateMonthlyReports`)
- **Trigger**: Cron schedule (1st of every month)
- **Behavior**: For each user with transactions in the previous month:
  1. Aggregates total income, total expenses, and net amount
  2. Groups transactions by category with totals
  3. Sends a detailed monthly summary email with category-level breakdown

---

## API Routes

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/inngest` | POST | Inngest webhook endpoint — receives and routes events to registered Inngest functions |
| `/api/seed` | GET | Seeds the database with sample transaction data for development/testing |

---

## Components

### Application Components

| Component | File | Description |
|-----------|------|-------------|
| **AccountCard** | `account-card.jsx` | Displays account name, type badge (Current/Savings), balance, default indicator, and link to account detail |
| **BudgetProgress** | `budget-progress.jsx` | Visual progress bar showing current month spending as a percentage of the budget, with color-coded thresholds |
| **CreateAccountDrawer** | `create-account-drawer.jsx` | Slide-up drawer form for creating new accounts with name, type, balance, and default toggle |
| **Header** | `header.jsx` | Application navigation bar with logo, links (Dashboard, Create Transaction), and Clerk UserButton or sign-in link |
| **Hero** | `hero.jsx` | Landing page hero section with animated gradient grid background and 4 floating stat cards |
| **TransactionTable** | `transaction-table.jsx` | Full-featured transaction table with text search, type/recurring filters, bulk selection, bulk delete, and pagination |

### Shadcn UI Primitives (25+ Components)

Accessible, customizable UI building blocks configured in "New York" style:

`Accordion` · `Badge` · `Button` · `Calendar` · `Card` · `Chart` · `Checkbox` · `DatePicker` · `Dialog` · `Drawer` · `DropdownMenu` · `Input` · `Popover` · `Progress` · `Select` · `Separator` · `Sheet` · `Switch` · `Table` · `Tabs` · `Textarea` · `Tooltip`

---

## Email System

FinSight uses **Resend** for email delivery and **React Email** for template rendering.

### Email Template (`emails/template.jsx`)
- **Header**: FinSight logo with gradient text branding
- **Body**: Dynamic content with support for:
  - Personalized greeting with user name
  - Rich text body with bullet point formatting (lines starting with `•` or `-`)
  - Customizable subject lines
- **Footer**: Social media links and copyright notice
- **Styling**: Inline CSS with consistent brand colors

### Email Triggers
| Event | Email Content |
|-------|--------------|
| Budget ≥ 80% | Warning notification with current spending vs. budget amount |
| Budget ≥ 100% | Alert notification that budget has been exceeded |
| Monthly report (1st of month) | Income/expense summary with category breakdown for the previous month |

---

## Security

### Authentication (Clerk)
- Full authentication flow with sign-in, sign-up, and session management
- Middleware-based route protection — all routes except public pages and static assets require authentication
- Clerk user data synced to the local database on first access

### Rate Limiting (ArcJet)
- Token bucket algorithm configured on sensitive operations
- **Configuration**: 10 tokens max, refills 5 tokens per 3600-second interval, 1 token consumed per request

### Input Validation (Zod)
- All form inputs validated with Zod schemas before processing
- **Account Schema**: Name (2-50 chars), type (enum), balance (non-negative float), isDefault (boolean)
- **Transaction Schema**: Type (enum), amount (positive float), description (1-500 chars), date (not future), category, optional receipt URL, recurring options with interval validation

### Route Protection
```javascript
// middleware.js
export default clerkMiddleware();
export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
```

---

## Getting Started

### Prerequisites
- **Node.js** 18+ (LTS recommended)
- **npm** or **yarn**
- **PostgreSQL** database (Supabase recommended)
- **Clerk** account for authentication
- **Google AI Studio** account for Gemini API key
- **Resend** account for email delivery
- **ArcJet** account for rate limiting
- **Inngest** account for background job processing (optional for local dev)

### 1. Clone the Repository
```bash
git clone https://github.com/SACHINKR04/AI-Finance-Manager.git
cd ai-finance-platform
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory. See [Environment Variables](#environment-variables) for the full list.

### 4. Set Up the Database
Generate the Prisma client and run migrations:
```bash
npx prisma generate
npx prisma migrate dev
```

### 5. (Optional) Seed Sample Data
```bash
curl http://localhost:3000/api/seed
```
Or call the seed endpoint from your browser after starting the dev server.

### 6. Run the Development Server
```bash
npm run dev
```

The app will be available at **http://localhost:3000**.

### 7. (Optional) Run Inngest Dev Server
For local background job development:
```bash
npx inngest-cli@latest dev
```

### 8. (Optional) Preview Emails
```bash
npm run email
```
Opens the React Email preview at **http://localhost:3000** (on a separate port).

---

## Environment Variables

Create a `.env` file in the project root with the following variables:

```env
# Database (Supabase PostgreSQL)
DATABASE_URL=
DIRECT_URL=

# Authentication (Clerk)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/onboarding
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding

# AI (Google Gemini)
GEMINI_API_KEY=

# Email (Resend)
RESEND_API_KEY=

# Security (ArcJet)
ARCJET_KEY=
```

### Variable Details

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | Supabase PostgreSQL connection string (with PgBouncer for connection pooling) |
| `DIRECT_URL` | Yes | Direct PostgreSQL connection string (used by Prisma for migrations) |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Yes | Clerk publishable key (public, starts with `pk_`) |
| `CLERK_SECRET_KEY` | Yes | Clerk secret key (server-only, starts with `sk_`) |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL` | Yes | Path for the sign-in page |
| `NEXT_PUBLIC_CLERK_SIGN_UP_URL` | Yes | Path for the sign-up page |
| `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL` | Yes | Redirect path after successful sign-in |
| `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL` | Yes | Redirect path after successful sign-up |
| `GEMINI_API_KEY` | Yes | Google Gemini API key for AI receipt scanning |
| `RESEND_API_KEY` | Yes | Resend API key for sending transactional emails |
| `ARCJET_KEY` | Yes | ArcJet API key for rate limiting and security |

---

## Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| **dev** | `npm run dev` | Start the Next.js development server with hot reload |
| **build** | `npm run build` | Build the production-optimized application |
| **start** | `npm start` | Start the production server |
| **lint** | `npm run lint` | Run ESLint for code quality checks |
| **postinstall** | `prisma generate` | Auto-generate Prisma client after `npm install` |
| **email** | `npm run email` | Launch the React Email development preview server |

---

## Seeding the Database

FinSight includes a seed action that generates realistic sample data for development and testing:

```bash
# Via API endpoint (after starting the dev server)
curl http://localhost:3000/api/seed

# Or visit in your browser
http://localhost:3000/api/seed
```

The seeder creates:
- **Up to 90 transactions** spread across the last 90 days
- **Randomized transaction types** (income and expense)
- **Realistic amounts** with varied ranges
- **Diverse categories** (groceries, rent, salary, entertainment, etc.)
- **Automatic balance calculation** for the user's default account

---

## Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com) and import your repository
   - Vercel will auto-detect the Next.js framework

3. **Configure Environment Variables**
   - Add all environment variables from [Environment Variables](#environment-variables) in the Vercel dashboard

4. **Configure Database**
   - Ensure your Supabase database allows connections from Vercel's IP ranges
   - Use the pooled connection string for `DATABASE_URL`

5. **Set Up Inngest**
   - Create an Inngest app at [inngest.com](https://www.inngest.com)
   - Add the Inngest signing key to your environment variables
   - Configure the event endpoint URL: `https://your-domain.vercel.app/api/inngest`

6. **Configure Clerk**
   - Add your production domain to Clerk's allowed origins
   - Update redirect URLs for production

7. **Deploy**
   - Vercel will automatically build and deploy on every push to `main`

### Post-Deployment Checklist
- [ ] Run database migrations on production: `npx prisma migrate deploy`
- [ ] Verify Clerk authentication works with production keys
- [ ] Verify Inngest webhook is receiving events
- [ ] Test email delivery through Resend
- [ ] Verify ArcJet rate limiting is active
- [ ] Test AI receipt scanning with Gemini API

---

## Contributing

Contributions are welcome! Here's how to get started:

1. **Fork** the repository
2. **Create a branch** from `main`
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes** with clear, descriptive commit messages
4. **Test** your changes locally
5. **Ensure** your code passes linting:
   ```bash
   npm run lint
   ```
6. **Open a Pull Request** with a detailed description of:
   - What changes you made
   - Why the changes are needed
   - Screenshots (for UI changes)

### Development Guidelines
- Follow the existing code style and patterns
- Use server actions for data mutations
- Add Zod validation for any new form inputs
- Keep components focused and reusable
- Use the existing Shadcn UI primitives before creating custom components

---

## License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Built by [Sachin Kumar](https://github.com/SACHINKR04)**

[Back to Top](#what-is-this-project)

</div>
