# MVP Implementation Plan — Phase 1

## Execution Order

This document defines the exact build order for Phase 1 MVP. Each section must be completed before moving to the next dependent section.

---

## Stage 1: Project Foundation

### 1.1 Monorepo Setup
- Initialize pnpm workspace with Turborepo
- Create `apps/web` (Next.js 14+ App Router)
- Create `apps/api` (NestJS)
- Create `packages/shared` (shared types + constants)
- Create `packages/database` (Prisma schema)
- Create `packages/config` (shared ESLint, TSConfig)
- Configure TypeScript paths and references
- Configure Docker Compose for local dev (PostgreSQL + Redis)
- Setup `.env` files structure

### 1.2 Frontend Foundation
- Next.js project with App Router
- Tailwind CSS configuration with custom design tokens
- Shadcn UI initialization + custom theme
- Framer Motion setup
- Global styles (dark theme, typography, animations)
- Font loading (Inter, JetBrains Mono)
- Root layout with providers (Theme, Query, Clerk)
- Loading, Error, Not-Found pages
- Zustand stores scaffold
- API client setup (axios + interceptors)
- React Query provider + configuration

### 1.3 Backend Foundation
- NestJS project scaffold
- Global modules (Config, Database, Cache, Queue)
- Prisma setup + initial schema
- Redis connection module
- Global guards (Auth, Roles, Throttle)
- Global interceptors (Logging, Transform)
- Global exception filter
- Health check endpoint
- CORS + security headers
- Swagger/OpenAPI documentation
- Docker Compose with PostgreSQL + Redis

### 1.4 Authentication
- Clerk integration (frontend)
- Clerk webhook handler (backend)
- User sync on sign-up
- Role assignment on onboarding
- Middleware for route protection
- Auth guard for NestJS
- Role-based access decorator

---

## Stage 2: Core Layout & Navigation

### 2.1 Marketing Pages
- Landing page (hero, features, CTA)
- Sign-in page
- Sign-up page
- Marketing layout (navbar, footer)

### 2.2 Platform Shell
- Authenticated layout shell
- Top bar (XP, streak, rank, profile, notifications)
- Student sidebar navigation
- Teacher sidebar navigation
- Mobile bottom navigation
- Breadcrumbs component
- Page header component
- Command palette (⌘K search)

### 2.3 Onboarding Flow
- Role selection (student/teacher)
- Student onboarding (grade level, subjects, goals)
- Teacher onboarding (school, subjects)
- Profile creation step
- Welcome/tutorial screens

---

## Stage 3: Database & Core Models

### 3.1 Schema Implementation
- User models (User, StudentProfile, TeacherProfile)
- Subject + Topic models
- Lesson + LessonStep models
- Quiz + Question models
- Progress + Mastery models
- Gamification models (XP, Streak, Rank, Achievement)
- Classroom models
- Notification model
- Run initial migration
- Create seed data (Math curriculum structure)

### 3.2 Seed Data
- Mathematics subject with full topic tree
- 3-5 complete lessons for "Quadratic Equations" topic
- 50+ questions across difficulty levels
- Rank definitions (Bronze I → Master)
- Achievement definitions (20+ achievements)
- Daily quest templates
- Prerequisite relationships between topics

---

## Stage 4: Learning Engine

### 4.1 Backend - Learning Module
- Subjects CRUD service
- Topics CRUD service + prerequisite logic
- Lessons CRUD service
- Lesson progress tracking service
- Step completion logic + XP awards
- Topic unlock checker

### 4.2 Backend - Quiz Module
- Quiz service with question loading
- Quiz attempt creation + tracking
- Answer submission + validation
- Score calculation
- Quiz completion + mastery update trigger

### 4.3 Frontend - Lesson Player
- Lesson player page + layout
- Step renderer (explanation, interactive, checkpoint, visualization, summary)
- Interactive question components (MCQ, numeric input, fill-blank)
- Progress bar within lesson
- Hint button integration
- Correct/wrong answer animations
- Lesson completion celebration
- XP gain display

### 4.4 Frontend - Quiz Player
- Quiz player page
- Question renderer for each type (MCQ, numeric, fill-blank, matching, ordering)
- Timer component (for timed quizzes)
- Progress indicator
- Results summary page
- Explanation panels
- Retry logic

### 4.5 Frontend - Subject & Topic Pages
- Subject selection page
- Topic overview page (lessons list, quiz access, mastery indicator)
- Topic unlock/locked states

---

## Stage 5: Skill Tree

### 5.1 Backend
- Skill tree data endpoint (nodes + edges + student progress)
- Topic unlock status computation
- Mastery level aggregation

### 5.2 Frontend
- Skill tree canvas component (SVG/Canvas-based)
- Skill node component (with mastery states)
- Connection lines (with states: locked, active, mastered)
- Zoom/pan controls
- Node click → topic detail
- Responsive: list fallback on mobile
- Visual effects (glow on mastered, pulse on active)

---

## Stage 6: Gamification Engine

### 6.1 Backend - XP System
- XP award service
- XP multiplier calculator (streak, difficulty, first-try)
- XP transaction logging
- Level-up detection
- Event emission on XP gain

### 6.2 Backend - Streak System
- Streak check service
- Daily streak validation job (BullMQ)
- Streak freeze logic
- Streak milestone achievements trigger

### 6.3 Backend - Rank System
- Rank definition + threshold logic
- Rank-up detection on XP change
- Rank-up event emission

### 6.4 Backend - Achievement System
- Achievement criteria checker
- Event-driven achievement evaluation
- Unlock + notification trigger

### 6.5 Backend - Daily Quests
- Quest generation algorithm
- Daily quest assignment job
- Quest progress tracker
- Quest completion handler

### 6.6 Backend - Leaderboard
- Redis sorted set leaderboard
- Weekly/monthly reset jobs
- Class leaderboard scope
- Position calculation

### 6.7 Frontend - Gamification Components
- XP bar (animated, with level)
- XP gain toast (floating +XP animation)
- Rank badge component (with tier colors + glow)
- Rank-up celebration modal
- Streak counter + flame animation
- Achievement toast (slide-in notification)
- Achievement gallery page
- Daily quest widget
- Leaderboard page/component

### 6.8 WebSocket Integration
- WebSocket gateway (NestJS)
- Client WebSocket provider (React)
- Real-time XP notifications
- Real-time achievement notifications
- Real-time streak updates
- Real-time leaderboard position updates

---

## Stage 7: Student Dashboard

### 7.1 Backend
- Dashboard data aggregation endpoint
- Continue learning suggestion
- Daily quests assignment
- Weak areas computation
- Recent activity feed

### 7.2 Frontend
- Dashboard page layout
- "Continue Learning" widget
- Streak widget (current streak + flame)
- Daily quests widget
- Progress summary card (mastery ring)
- Rank + XP progress widget
- Weak areas alert widget
- Recent activity feed
- Quick actions (start practice, AI tutor)

---

## Stage 8: AI Tutor (Basic)

### 8.1 Backend - AI Module
- AI provider abstraction interface
- Anthropic provider implementation
- OpenAI provider implementation
- Model router (purpose → provider + model)
- Prompt manager service
- Tutor session management
- Message persistence
- SSE streaming endpoint
- Usage tracking + rate limiting
- Hint generation service

### 8.2 Frontend - AI Tutor
- AI Tutor chat page
- Message list component
- User message input
- AI message rendering (with markdown + LaTeX)
- Streaming text display
- Context panel (current topic info)
- Usage indicator

### 8.3 Frontend - Hints
- Hint button on interactive steps/questions
- Progressive hint display (Level 1, 2, 3)
- XP penalty indicator
- Hint bubble component

---

## Stage 9: Progression & Retention

### 9.1 Backend
- Mastery calculation service
- Mastery decay background job
- Spaced repetition engine (SM-2 variant)
- Next review date calculator
- Weak area detection algorithm
- AI recommendation generator
- Retention score tracker

### 9.2 Frontend
- Progress overview page
- Mastery breakdown by topic
- Retention heatmap/chart
- Weak areas page (with AI suggestions)
- Review session page (spaced repetition quiz)
- "Decaying" indicators on skill tree nodes

---

## Stage 10: Teacher Dashboard (Basic)

### 10.1 Backend - Classroom Module
- Classroom CRUD
- Join code generation
- Student enrollment/removal
- Assignment CRUD
- Assignment submission tracking
- Basic class analytics (avg performance, engagement)
- Student progress view

### 10.2 Frontend - Teacher
- Teacher dashboard (class overview, quick stats)
- Classrooms list page
- Create classroom flow
- Classroom detail page (students, assignments, analytics)
- Student list with progress indicators
- Create assignment flow
- Assignment detail (submissions, grades)
- Basic analytics charts (class performance, engagement)

---

## Stage 11: Student Classrooms

### 11.1 Frontend
- My classrooms page
- Join classroom (by code)
- Classroom detail (assignments, discussions)
- Assignment view + submission
- Discussion thread view + reply

---

## Stage 12: Practice & Boss Battles

### 12.1 Backend
- Daily practice session generator
- Boss battle question selection
- Boss battle state machine
- Boss battle scoring + rewards

### 12.2 Frontend
- Practice hub page
- Daily practice session
- Review mode (spaced repetition)
- Boss battle arena
  - Boss HP bar
  - Timer per question
  - Combo counter
  - Dramatic animations
  - Win/lose screens

---

## Stage 13: Polishing & Deployment

### 13.1 Polish
- All page transitions
- All gamification animations
- Sound effects system (optional toggle)
- Loading skeletons for all pages
- Empty states for all lists
- Error states with retry
- Mobile responsiveness pass
- Accessibility audit
- Performance optimization (lazy loading, code splitting)

### 13.2 Deployment
- Frontend deployment to Vercel
- Backend Docker build
- AWS ECS or Railway deployment
- PostgreSQL (Supabase or RDS)
- Redis (Upstash or ElastiCache)
- Environment variables configuration
- CI/CD pipeline (GitHub Actions)
- Monitoring setup (Sentry)
- Analytics setup (PostHog)

---

## File-by-File Implementation Priority

### Critical Path (Build These First)

```
1.  turbo.json + pnpm-workspace.yaml
2.  apps/web/package.json + next.config.ts + tailwind.config.ts
3.  apps/api/package.json + nest-cli.json
4.  packages/database/prisma/schema.prisma
5.  apps/web/src/app/layout.tsx (root layout + providers)
6.  apps/web/src/app/globals.css (design tokens)
7.  apps/api/src/main.ts + app.module.ts
8.  apps/api/src/database/prisma.service.ts
9.  apps/web/src/components/ui/* (Shadcn components)
10. apps/web/src/components/layout/sidebar.tsx
11. apps/web/src/app/(auth)/* (auth pages)
12. apps/web/src/app/(platform)/layout.tsx
13. apps/web/src/app/(platform)/student/dashboard/page.tsx
14. apps/api/src/modules/auth/*
15. apps/api/src/modules/users/*
16. apps/api/src/modules/learning/*
17. apps/web/src/components/learning/lesson-player/*
18. apps/api/src/modules/gamification/*
19. apps/web/src/components/gamification/*
20. apps/api/src/modules/ai/*
```

---

## Definition of Done (MVP)

The MVP is complete when a student can:

1. ✅ Sign up and complete onboarding
2. ✅ See a dashboard with streak, XP, rank, quests
3. ✅ Navigate a skill tree for Mathematics
4. ✅ Complete interactive lessons (Brilliant.org-style)
5. ✅ Take quizzes and see mastery progression
6. ✅ Earn XP and level up
7. ✅ Maintain a streak
8. ✅ Complete daily quests
9. ✅ Ask the AI tutor for help
10. ✅ Use hints during lessons
11. ✅ See weak areas and recommendations
12. ✅ Join a classroom
13. ✅ Complete assignments
14. ✅ See leaderboard position
15. ✅ Fight a boss battle

And a teacher can:

1. ✅ Create a classroom
2. ✅ See enrolled students
3. ✅ Create and assign work
4. ✅ View student progress
5. ✅ See class analytics

And the system:

1. ✅ Tracks all progress accurately
2. ✅ Awards XP correctly with multipliers
3. ✅ Maintains streaks with daily checks
4. ✅ Detects weak areas
5. ✅ Provides AI tutoring
6. ✅ Runs spaced repetition scheduling
7. ✅ Sends real-time gamification notifications
8. ✅ Feels premium, polished, and engaging
