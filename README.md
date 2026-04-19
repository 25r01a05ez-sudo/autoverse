# 🚗 AUTOVERSE — Verified Car Marketplace

> India's most trusted platform for buying and selling verified pre-owned cars through GST-registered dealers.

[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.18-green)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue)](https://postgresql.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-cyan)](https://tailwindcss.com/)

---

## 📋 Overview

AUTOVERSE is a full-stack car marketplace that connects verified dealers with genuine buyers. All dealers are verified through GST registration, ensuring a trustworthy marketplace.

### Key Features

- ✅ **Verified Dealers** — GST-registered and physically verified
- 🔍 **Smart Search** — Filter by brand, price, location, fuel type
- 📍 **Location-based** — Find dealers near you
- 💬 **Direct Inquiries** — Contact dealers without middlemen
- 🛡️ **Secure Auth** — JWT-based authentication with role-based access
- 📱 **Responsive** — Mobile-first design

---

## 🏗️ Architecture

```
autoverse/
├── frontend/          # Next.js 14 + Tailwind CSS (Deploy to Vercel)
├── backend/           # Express.js + Prisma + PostgreSQL
├── docker-compose.yml # Local PostgreSQL setup
├── .env.example       # Environment variables template
└── README.md
```

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL (or Docker)
- npm or yarn

### 1. Clone the Repository

```bash
git clone https://github.com/25r01a05ez-sudo/autoverse.git
cd autoverse
```

### 2. Start the Database (Docker)

```bash
docker-compose up -d postgres
```

Or use [Supabase](https://supabase.com) for a free hosted PostgreSQL.

### 3. Setup Backend

```bash
cd backend
cp .env.example .env
# Edit .env with your database URL and JWT secret
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run dev
```

Backend runs at: `http://localhost:5000`

### 4. Setup Frontend

```bash
cd ../frontend
cp .env.example .env.local
# Edit .env.local with your API URL
npm install
npm run dev
```

Frontend runs at: `http://localhost:3000`

---

## 🌐 Deploying to Vercel

### Frontend (Vercel)

1. Go to [vercel.com](https://vercel.com) and create a new project
2. Import your GitHub repository
3. **Set Root Directory to `frontend`**
4. Add environment variables:
   - `NEXT_PUBLIC_API_URL` = your backend URL

### Backend (Railway / Render)

1. Create a new project on [Railway](https://railway.app) or [Render](https://render.com)
2. Connect your GitHub repository
3. Set root directory to `backend`
4. Add environment variables from `.env.example`
5. Run build command: `npm run build`
6. Start command: `npm start`

### Database (Supabase)

1. Create a free account at [supabase.com](https://supabase.com)
2. Create a new project
3. Get the connection string from Settings → Database
4. Add to backend `DATABASE_URL`

---

## 📡 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login |
| GET | `/api/auth/me` | Get current user |

### Cars
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/cars` | List all cars (with filters) |
| GET | `/api/cars/:id` | Get car details |
| POST | `/api/cars` | Add car (Dealer only) |
| PUT | `/api/cars/:id` | Update car (Dealer only) |
| DELETE | `/api/cars/:id` | Delete car (Dealer/Admin) |

### Dealers
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/dealers` | List verified dealers |
| GET | `/api/dealers/:id` | Get dealer profile |

### Inquiries
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/inquiries` | Get user's inquiries |
| POST | `/api/inquiries` | Send inquiry (Customer) |
| PUT | `/api/inquiries/:id` | Update status (Dealer) |

### Admin
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/stats` | Platform statistics |
| GET | `/api/admin/dealers` | All dealers |
| PUT | `/api/admin/dealers/:id/verify` | Verify dealer |
| GET | `/api/admin/users` | All users |

---

## 👥 User Roles

| Role | Access |
|------|--------|
| `CUSTOMER` | Browse cars, send inquiries, view profile |
| `DEALER` | List cars, manage inquiries, dealer profile |
| `ADMIN` | Full platform management, dealer verification |

---

## 🗄️ Database Schema

```
Users ──< Dealers ──< Cars ──< Inquiries
                            >──── Customers (Users)
         Dealers ──< GstVerifications
```

---

## 🔐 Environment Variables

See `.env.example` for all required variables.

---

## 📞 Sample Credentials (Development)

After running migrations and seeds:

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@autoverse.com | Admin@123 |
| Dealer | dealer@autoverse.com | Demo@123 |
| Customer | customer@autoverse.com | Demo@123 |

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.

---

**Made with ❤️ for Hyderabad's used car market**
