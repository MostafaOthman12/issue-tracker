# 🐛 Issue Tracker

A full-stack issue tracking application built with **Next.js 16**, **Prisma**, and **Radix UI**. Create, browse, filter, sort, and assign issues — all behind Google OAuth authentication.

---

## ✨ Features

- **Issue Management** — Create, view, edit, and delete issues with Markdown support
- **Status Tracking** — Three statuses: `OPEN`, `IN_PROGRESS`, `CLOSED`
- **Assignee Support** — Assign issues to registered users
- **Filtering & Sorting** — Filter by status; sort by title, description, status, or date
- **Pagination** — Server-side pagination (10 issues per page)
- **Google OAuth** — Secure sign-in via NextAuth.js with a Prisma adapter
- **Responsive UI** — Mobile-friendly navbar with hamburger menu and desktop dropdown
- **Dashboard** — Overview page for issue analytics

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org/) (App Router) |
| Language | TypeScript |
| Database | MySQL (via Prisma + MariaDB adapter) |
| ORM | [Prisma 7](https://www.prisma.io/) |
| Auth | [NextAuth.js v5](https://authjs.dev/) — Google provider |
| UI Library | [Radix UI Themes](https://www.radix-ui.com/themes) |
| Styling | Tailwind CSS v4 |
| Forms | React Hook Form + Zod validation |
| Editor | SimpleMDE (Markdown editor) |
| Data Fetching | TanStack React Query |
| Notifications | react-hot-toast |
| Loading States | react-loading-skeleton |

---

## 📁 Project Structure

```
issue-tracker/
├── app/
│   ├── api/
│   │   ├── issues/         # GET & POST /api/issues
│   │   └── auth/           # NextAuth handlers
│   ├── components/         # Shared UI components
│   │   ├── AssigneeSelect.tsx
│   │   ├── IssueForm.tsx
│   │   ├── IssuesStatuesFilter.tsx
│   │   ├── Pagination.tsx
│   │   ├── issueStatusBadge.tsx
│   │   └── links.tsx
│   ├── dashboard/          # Dashboard overview page
│   ├── db/                 # Prisma client singleton
│   ├── generated/          # Prisma generated client
│   ├── issues/
│   │   ├── [id]/           # Issue detail & edit page
│   │   ├── new/            # Create issue page
│   │   └── page.tsx        # Issues list page
│   ├── NavBar.tsx          # Sticky responsive navbar
│   └── layout.tsx          # Root layout
├── prisma/
│   └── schema.prisma       # Database schema
├── auth.ts                 # NextAuth configuration
└── .env                    # Environment variables
```

---

## 🗄 Database Schema

| Model | Description |
|---|---|
| `Issue` | Core entity with title, description, status, and optional assignee |
| `User` | Auth user linked to assigned issues |
| `Account` | OAuth provider accounts (NextAuth) |
| `Session` | JWT sessions (NextAuth) |
| `VerificationToken` | Email verification tokens |
| `Authenticator` | WebAuthn support |

**Issue statuses:** `OPEN` · `IN_PROGRESS` · `CLOSED`

---

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18
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
| `npx prisma studio` | Open Prisma Studio (DB GUI) |
| `npx prisma migrate dev` | Apply pending migrations |
| `npx prisma generate` | Regenerate the Prisma client |

---

## 🔌 API Reference

### `GET /api/issues`

Fetch a paginated list of issues.

| Query Param | Type | Description |
|---|---|---|
| `status` | `OPEN \| IN_PROGRESS \| CLOSED` | Filter by issue status |
| `sort` | `title \| description \| status \| createdAt` | Sort field (default: `createdAt`) |
| `order` | `asc \| desc` | Sort direction (default: `desc`) |
| `page` | `number` | Page number (default: `1`, page size: `10`) |

**Response:**
```json
{
  "issues": [...],
  "issueCount": 42
}
```

### `POST /api/issues`

Create a new issue.

**Request body:**
```json
{
  "title": "string (1-255 chars)",
  "description": "string (min 1 char, Markdown supported)"
}
```

**Response:** `201 Created` with the new issue object.

---

## 🔐 Authentication

Authentication is handled by **NextAuth.js v5** using the **Google OAuth** provider. Sessions are stored as JWTs. The Prisma adapter persists user accounts and sessions to the database.

- Sign in at `/api/auth/signin`
- Sign out at `/api/auth/signout`

Only authenticated users can create issues or be assigned to them.

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Commit your changes: `git commit -m 'feat: add your feature'`
4. Push to the branch: `git push origin feat/your-feature`
5. Open a Pull Request

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
