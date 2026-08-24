# 🐛 Issue Tracker

A full-stack issue tracking application built with **Next.js 16**, **Prisma**, and **Radix UI Themes**. Create, browse, filter, sort, assign, and manage issues — all behind Google OAuth authentication — with a polished dark-mode dashboard.

---

## ✨ Features

- **Dashboard** — Overview with live status counts, a bar chart, and latest issues at a glance
- **Issue Management** — Create, view, edit, and delete issues with Markdown support
- **Status Tracking** — `Open`, `In Progress`, `Closed` — color-coded throughout the UI
- **Assignee Support** — Assign issues to any registered user via a live dropdown
- **Filtering & Sorting** — Filter by status; sort by title, status, or date (asc/desc)
- **Pagination** — Server-side pagination, 10 issues per page
- **Google OAuth** — Secure sign-in via NextAuth.js v5 with Prisma adapter
- **Responsive UI** — Mobile-friendly navbar with hamburger menu, desktop dropdown
- **Dark Mode** — Full dark theme powered by Radix UI's built-in appearance system

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org/) (App Router) |
| Language | TypeScript |
| Database | MySQL / MariaDB |
| ORM | [Prisma 7](https://www.prisma.io/) with Accelerate |
| Auth | [NextAuth.js v5](https://authjs.dev/) — Google OAuth provider |
| UI Library | [Radix UI Themes](https://www.radix-ui.com/themes) |
| Styling | Tailwind CSS v4 + custom prose styles |
| Charts | [Recharts](https://recharts.org/) |
| Forms | React Hook Form + Zod validation |
| Markdown Editor | SimpleMDE (`react-simplemde-editor`) |
| Markdown Renderer | `react-markdown` |
| Data Fetching | TanStack React Query |
| Notifications | `react-hot-toast` |
| Loading States | `react-loading-skeleton` |

---

## 📁 Project Structure

```
issue-tracker/
├── app/
│   ├── api/
│   │   ├── issues/
│   │   │   ├── route.tsx          # GET (paginated, filterable) + POST /api/issues
│   │   │   ├── latest/route.tsx   # GET /api/issues/latest (top 5 with assignee)
│   │   │   └── [id]/route.tsx     # GET, PATCH, DELETE /api/issues/:id
│   │   └── users/route.tsx        # GET /api/users (for assignee dropdown)
│   ├── components/
│   │   ├── AssigneeSelect.tsx     # User assignee dropdown (client, React Query)
│   │   ├── IssueChart.tsx         # Bar chart by status (client, Recharts)
│   │   ├── IssueForm.tsx          # Shared create/edit form (client, RHF + Zod)
│   │   ├── IssuesStatuesFilter.tsx# Status filter dropdown (client)
│   │   ├── IssusSummary.tsx       # Status count cards (server)
│   │   ├── LatestIssues.tsx       # Latest 5 issues card (server)
│   │   ├── Pagination.tsx         # Prev/next pagination (client)
│   │   ├── issueStatusBadge.tsx   # Colored status badge
│   │   ├── links.tsx              # Radix + Next.js link wrapper
│   │   └── ReactQuery.tsx         # TanStack Query provider
│   ├── dashboard/                 # (legacy route, NavBar points to /)
│   ├── db/prisma.ts               # Prisma client singleton
│   ├── generated/                 # Prisma generated client
│   ├── issues/
│   │   ├── [id]/
│   │   │   ├── edit/              # Edit issue page
│   │   │   ├── DeleteIssueButton.tsx
│   │   │   ├── EditIssueButton.tsx
│   │   │   ├── loading.tsx
│   │   │   └── page.tsx           # Issue detail page
│   │   ├── new/                   # Create issue page
│   │   ├── loading.tsx            # Issues list skeleton
│   │   └── page.tsx               # Issues list (card layout)
│   ├── NavBar.tsx                 # Sticky responsive navbar
│   ├── globals.css                # Tailwind + prose styles
│   ├── layout.tsx                 # Root layout (dark Radix Theme)
│   └── page.tsx                   # Dashboard home
├── prisma/
│   └── schema.prisma              # Database schema
├── auth.ts                        # NextAuth configuration
└── .env                           # Environment variables
```

---

## 🗄 Database Schema

| Model | Description |
|---|---|
| `Issue` | Title, description, status (`OPEN / IN_PROGRESS / CLOSED`), optional assignee |
| `User` | OAuth user; can be assigned to issues |
| `Account` | OAuth provider accounts (NextAuth) |
| `Session` | JWT sessions (NextAuth) |
| `VerificationToken` | Email verification tokens |
| `Authenticator` | WebAuthn credentials |

---

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 18
- A running MySQL / MariaDB instance
- A Google Cloud project with OAuth 2.0 credentials

### 1. Clone the repository

```bash
git clone https://github.com/your-username/issue-tracker.git
cd issue-tracker
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
# Database
DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE"

# NextAuth
AUTH_SECRET="your-random-secret"
AUTH_GOOGLE_ID="your-google-client-id"
AUTH_GOOGLE_SECRET="your-google-client-secret"
NEXTAUTH_URL="http://localhost:3000"
```

### 4. Run database migrations

```bash
npx prisma migrate dev
```

### 5. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Build for production |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint |
| `npx prisma studio` | Open Prisma Studio (visual DB GUI) |
| `npx prisma migrate dev` | Apply pending migrations |
| `npx prisma generate` | Regenerate the Prisma client |

---

## 🔌 API Reference

### `GET /api/issues`

Returns a paginated, filterable list of issues.

| Query Param | Type | Default | Description |
|---|---|---|---|
| `status` | `OPEN \| IN_PROGRESS \| CLOSED` | — | Filter by status |
| `sort` | `title \| status \| createdAt` | `createdAt` | Sort field |
| `order` | `asc \| desc` | `desc` | Sort direction |
| `page` | `number` | `1` | Page number (10 per page) |

**Response:**
```json
{ "issues": [...], "issueCount": 42 }
```

### `POST /api/issues`

Create a new issue.

```json
{ "title": "string (1–255 chars)", "description": "string (Markdown)" }
```

**Response:** `201` with the created issue.

### `PATCH /api/issues/:id`

Update an issue's assignee or status.

### `DELETE /api/issues/:id`

Delete an issue by ID.

### `GET /api/issues/latest`

Returns the 5 most recent issues including their `assignedToUser`.

### `GET /api/users`

Returns all registered users (used by the assignee dropdown).

---

## 🔐 Authentication

Powered by **NextAuth.js v5** with the **Google OAuth** provider. Sessions are JWTs stored client-side; user accounts and sessions are persisted to the database via the Prisma adapter.

| Route | Description |
|---|---|
| `/api/auth/signin` | Google sign-in page |
| `/api/auth/signout` | Sign-out |

Only authenticated users can be assigned to issues. Issue creation requires authentication (enforced at the API level).

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Commit: `git commit -m 'feat: your change'`
4. Push: `git push origin feat/your-feature`
5. Open a Pull Request

---

## 📄 License

MIT — see [LICENSE](LICENSE) for details.
