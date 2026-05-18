# Nexus Learning Platform

> Next-generation gamified mastery-based learning system

## Philosophy

**Learn → Practice → Explain → Apply → Master → Rank Up**

## Architecture

- **Frontend**: Next.js 14+ App Router, Tailwind CSS, Shadcn UI, Framer Motion
- **Backend**: NestJS modular monolith
- **Database**: PostgreSQL (Prisma) + Redis
- **Auth**: Clerk
- **AI**: Anthropic + OpenAI (abstracted)
- **Realtime**: WebSocket + Redis Pub/Sub

## Quick Start

### Prerequisites

- Node.js 20+
- pnpm 9+
- Docker (for local database)

### Setup

```bash
# Clone and install
pnpm install

# Start infrastructure (PostgreSQL, Redis, Meilisearch)
docker-compose up -d

# Copy environment variables
cp .env.example .env.local

# Generate Prisma client
pnpm db:generate

# Run database migrations
pnpm db:migrate

# Seed database
pnpm db:seed

# Start development
pnpm dev
```

### Project Structure

```
teaching_platform/
├── apps/
│   ├── web/          # Next.js frontend (port 3000)
│   └── api/          # NestJS backend (port 4000)
├── packages/
│   ├── shared/       # Shared types & constants
│   └── database/     # Prisma schema & client
├── plans/            # Architecture documentation
└── docker-compose.yml
```

### Commands

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start all apps in development |
| `pnpm build` | Build all packages |
| `pnpm lint` | Lint all packages |
| `pnpm db:generate` | Generate Prisma client |
| `pnpm db:migrate` | Run database migrations |
| `pnpm db:studio` | Open Prisma Studio |
| `pnpm db:seed` | Seed database |

## Documentation

See the `plans/` directory for detailed architecture documentation:

- [Architecture Overview](plans/00-architecture-overview.md)
- [Frontend Architecture](plans/01-frontend-architecture.md)
- [Backend Architecture](plans/02-backend-architecture.md)
- [Database Schema](plans/03-database-schema.md)
- [Gamification System](plans/04-gamification-system.md)
- [AI System](plans/05-ai-system.md)
- [Learning Engine](plans/06-learning-engine.md)
- [API Design](plans/07-api-design.md)
- [UI Design System](plans/08-ui-design-system.md)
- [MVP Implementation Plan](plans/09-mvp-implementation-plan.md)
