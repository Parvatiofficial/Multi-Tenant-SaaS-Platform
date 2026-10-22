# DocuMind AI — Multi-Tenant SaaS Platform

An enterprise-grade, multi-tenant AI document intelligence platform built with a modern monorepo architecture.

## 🚀 Key Features
- **Multi-Tenant Architecture:** Strict tenant data isolation with Role-Based Access Control (RBAC: `Owner`, `Admin`, `Member`, `Viewer`).
- **Custom Authentication Engine:** Self-hosted JWT authentication with short-lived access tokens and refresh token rotation (no paid SaaS auth lock-in).
- **Relational + Vector Store:** PostgreSQL with `pgvector` for combining relational multi-tenant entities with high-dimensional vector search.
- **Asynchronous Ingestion Pipeline:** BullMQ + Redis background workers for PDF parsing, text chunking, and embedding generation.
- **Modern Full-Stack Monorepo:** Next.js 15 App Router frontend paired with a modular NestJS 10 backend orchestrated by Turborepo.

---

## 🏗️ Monorepo Structure

```
├── apps/
│   ├── web/               # Next.js 15 (App Router, Tailwind CSS, lucide-react)
│   └── api/               # NestJS 10 (REST API, BullMQ Workers, Swagger OpenAPI)
├── packages/
│   ├── types/             # Shared TypeScript interfaces and DTOs
│   ├── config/            # Shared ESLint and TypeScript configs
│   └── database/          # Prisma Client, pgvector migrations & seeds (Milestone 2)
├── docker-compose.yml     # PostgreSQL (pgvector:pg16) + Redis (redis:7-alpine)
├── turbo.json             # Turborepo task pipeline
└── IMPLEMENTATION_PLAN.md # Source of truth roadmap & milestone tracking
```

---

## ⚡ Quickstart

### 1. Prerequisites
- Node.js >= 20
- Docker & Docker Compose
- npm >= 10

### 2. Environment Setup
```bash
cp .env.example .env
```

### 3. Start Database & Redis
```bash
docker compose up -d
```

### 4. Install Dependencies
```bash
npm install
```

### 5. Run Development Servers
```bash
npm run dev
```

* **Web UI:** [http://localhost:3000](http://localhost:3000)
* **API Server:** [http://localhost:4000/api/v1](http://localhost:4000/api/v1)
* **Swagger Docs:** [http://localhost:4000/api/docs](http://localhost:4000/api/docs)

---

## 📜 Roadmap & Milestones
Refer to [`IMPLEMENTATION_PLAN.md`](./IMPLEMENTATION_PLAN.md) for detailed milestone breakdown and issue-by-issue progress.
