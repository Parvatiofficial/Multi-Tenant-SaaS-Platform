import React from 'react';
import { Layers, ShieldCheck, Database, Cpu, Sparkles, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 py-24 text-center">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-400">
        <Sparkles className="h-3.5 w-3.5" />
        Enterprise Multi-Tenant AI Platform
      </div>

      {/* Hero Headline */}
      <h1 className="mt-6 max-w-4xl text-5xl font-extrabold tracking-tight sm:text-6xl text-white">
        DocuMind <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">AI</span>
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-slate-400">
        Production-grade multi-tenant document assistant featuring Row-Level Security, custom JWT authentication with refresh token rotation, BullMQ ingestion queues, and pgvector semantic retrieval.
      </p>

      {/* Feature Pills */}
      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 max-w-5xl w-full text-left">
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur">
          <Layers className="h-6 w-6 text-blue-400" />
          <h3 className="mt-3 font-semibold text-white">Multi-Tenancy</h3>
          <p className="mt-1 text-sm text-slate-400">Strict tenant isolation, RBAC memberships, and tenant-scoped queries.</p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur">
          <ShieldCheck className="h-6 w-6 text-emerald-400" />
          <h3 className="mt-3 font-semibold text-white">Custom JWT Engine</h3>
          <p className="mt-1 text-sm text-slate-400">Zero vendor lock-in with refresh token rotation and NestJS guard decorators.</p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur">
          <Database className="h-6 w-6 text-purple-400" />
          <h3 className="mt-3 font-semibold text-white">pgvector + Prisma</h3>
          <p className="mt-1 text-sm text-slate-400">PostgreSQL with vector similarity search running on dedicated Docker services.</p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur">
          <Cpu className="h-6 w-6 text-amber-400" />
          <h3 className="mt-3 font-semibold text-white">BullMQ Pipeline</h3>
          <p className="mt-1 text-sm text-slate-400">Async document ingestion, token chunking, and worker queue processing.</p>
        </div>
      </div>

      {/* CTA Button */}
      <div className="mt-10 flex gap-4">
        <a
          href="http://localhost:4000/api/docs"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition hover:bg-blue-500"
        >
          Explore Swagger API <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </main>
  );
}
