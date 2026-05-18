# Frontend Architecture — Next.js App Router

## Folder Structure

```
apps/web/
├── public/
│   ├── fonts/
│   ├── images/
│   ├── icons/
│   └── sounds/                    # Gamification sound effects
├── src/
│   ├── app/                       # Next.js App Router
│   │   ├── (marketing)/           # Public pages group
│   │   │   ├── page.tsx           # Landing page
│   │   │   ├── pricing/
│   │   │   ├── about/
│   │   │   ├── features/
│   │   │   └── layout.tsx
│   │   ├── (auth)/                # Auth pages group
│   │   │   ├── sign-in/
│   │   │   ├── sign-up/
│   │   │   ├── onboarding/
│   │   │   │   ├── page.tsx       # Role selection
│   │   │   │   ├── student/       # Student onboarding flow
│   │   │   │   ├── teacher/       # Teacher onboarding flow
│   │   │   │   └── school/        # School admin onboarding
│   │   │   └── layout.tsx
│   │   ├── (platform)/            # Authenticated platform
│   │   │   ├── layout.tsx         # Platform shell layout
│   │   │   ├── student/           # Student routes
│   │   │   │   ├── layout.tsx     # Student sidebar layout
│   │   │   │   ├── dashboard/
│   │   │   │   │   └── page.tsx   # Student home dashboard
│   │   │   │   ├── learn/
│   │   │   │   │   ├── page.tsx   # Subject selection
│   │   │   │   │   ├── [subjectId]/
│   │   │   │   │   │   ├── page.tsx          # Subject overview + skill tree
│   │   │   │   │   │   ├── [topicId]/
│   │   │   │   │   │   │   ├── page.tsx      # Topic overview
│   │   │   │   │   │   │   ├── [lessonId]/
│   │   │   │   │   │   │   │   └── page.tsx  # Lesson player
│   │   │   │   │   │   │   └── quiz/
│   │   │   │   │   │   │       └── page.tsx  # Topic quiz
│   │   │   │   ├── skill-tree/
│   │   │   │   │   └── page.tsx   # Full skill tree view
│   │   │   │   ├── practice/
│   │   │   │   │   ├── page.tsx   # Practice hub
│   │   │   │   │   ├── daily/     # Daily challenges
│   │   │   │   │   ├── review/    # Spaced repetition
│   │   │   │   │   └── boss/      # Boss battles
│   │   │   │   ├── ai-tutor/
│   │   │   │   │   └── page.tsx   # AI tutor chat
│   │   │   │   ├── progress/
│   │   │   │   │   ├── page.tsx   # Progress overview
│   │   │   │   │   ├── analytics/
│   │   │   │   │   ├── mastery/
│   │   │   │   │   └── retention/
│   │   │   │   ├── classrooms/
│   │   │   │   │   ├── page.tsx   # My classrooms
│   │   │   │   │   └── [classId]/
│   │   │   │   │       ├── page.tsx
│   │   │   │   │       ├── assignments/
│   │   │   │   │       └── discussions/
│   │   │   │   ├── leaderboard/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── achievements/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── profile/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── settings/
│   │   │   │       └── page.tsx
│   │   │   ├── teacher/           # Teacher routes
│   │   │   │   ├── layout.tsx
│   │   │   │   ├── dashboard/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── classrooms/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   ├── create/
│   │   │   │   │   └── [classId]/
│   │   │   │   │       ├── page.tsx       # Classroom overview
│   │   │   │   │       ├── students/
│   │   │   │   │       ├── assignments/
│   │   │   │   │       │   ├── page.tsx
│   │   │   │   │       │   ├── create/
│   │   │   │   │       │   └── [assignId]/
│   │   │   │   │       ├── analytics/
│   │   │   │   │       ├── discussions/
│   │   │   │   │       └── settings/
│   │   │   │   ├── students/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   └── [studentId]/
│   │   │   │   ├── analytics/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   ├── performance/
│   │   │   │   │   ├── engagement/
│   │   │   │   │   └── weaknesses/
│   │   │   │   ├── content/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── settings/
│   │   │   │       └── page.tsx
│   │   │   ├── admin/             # School admin routes
│   │   │   │   ├── layout.tsx
│   │   │   │   ├── dashboard/
│   │   │   │   ├── teachers/
│   │   │   │   ├── students/
│   │   │   │   ├── classrooms/
│   │   │   │   ├── analytics/
│   │   │   │   ├── diagnostics/
│   │   │   │   └── settings/
│   │   │   └── super-admin/       # Super admin routes
│   │   │       ├── layout.tsx
│   │   │       ├── dashboard/
│   │   │       ├── users/
│   │   │       ├── content/
│   │   │       ├── subscriptions/
│   │   │       ├── analytics/
│   │   │       ├── moderation/
│   │   │       └── settings/
│   │   ├── api/                   # Minimal API routes (webhooks only)
│   │   │   └── webhooks/
│   │   │       ├── clerk/
│   │   │       └── stripe/
│   │   ├── layout.tsx             # Root layout
│   │   ├── loading.tsx
│   │   ├── error.tsx
│   │   ├── not-found.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── ui/                    # Shadcn UI primitives
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── input.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── progress.tsx
│   │   │   ├── tooltip.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── avatar.tsx
│   │   │   ├── tabs.tsx
│   │   │   ├── sheet.tsx
│   │   │   └── ... (shadcn components)
│   │   ├── layout/                # Layout components
│   │   │   ├── navbar.tsx
│   │   │   ├── sidebar.tsx
│   │   │   ├── student-sidebar.tsx
│   │   │   ├── teacher-sidebar.tsx
│   │   │   ├── admin-sidebar.tsx
│   │   │   ├── mobile-nav.tsx
│   │   │   ├── breadcrumbs.tsx
│   │   │   ├── footer.tsx
│   │   │   └── page-header.tsx
│   │   ├── learning/              # Learning-specific components
│   │   │   ├── lesson-player/
│   │   │   │   ├── lesson-player.tsx
│   │   │   │   ├── lesson-step.tsx
│   │   │   │   ├── interactive-block.tsx
│   │   │   │   ├── explanation-block.tsx
│   │   │   │   ├── code-block.tsx
│   │   │   │   └── visual-block.tsx
│   │   │   ├── quiz/
│   │   │   │   ├── quiz-player.tsx
│   │   │   │   ├── question-renderer.tsx
│   │   │   │   ├── mcq-question.tsx
│   │   │   │   ├── freeform-question.tsx
│   │   │   │   ├── matching-question.tsx
│   │   │   │   ├── ordering-question.tsx
│   │   │   │   ├── fill-blank-question.tsx
│   │   │   │   ├── quiz-progress.tsx
│   │   │   │   ├── quiz-results.tsx
│   │   │   │   └── explanation-panel.tsx
│   │   │   ├── skill-tree/
│   │   │   │   ├── skill-tree-canvas.tsx
│   │   │   │   ├── skill-node.tsx
│   │   │   │   ├── skill-connection.tsx
│   │   │   │   ├── skill-tooltip.tsx
│   │   │   │   └── skill-tree-legend.tsx
│   │   │   ├── ai-tutor/
│   │   │   │   ├── tutor-chat.tsx
│   │   │   │   ├── tutor-message.tsx
│   │   │   │   ├── tutor-input.tsx
│   │   │   │   ├── hint-bubble.tsx
│   │   │   │   └── context-panel.tsx
│   │   │   └── practice/
│   │   │       ├── daily-quest-card.tsx
│   │   │       ├── boss-battle-arena.tsx
│   │   │       ├── review-session.tsx
│   │   │       └── practice-problem.tsx
│   │   ├── gamification/          # Gamification components
│   │   │   ├── xp-bar.tsx
│   │   │   ├── xp-gain-toast.tsx
│   │   │   ├── rank-badge.tsx
│   │   │   ├── rank-up-modal.tsx
│   │   │   ├── streak-counter.tsx
│   │   │   ├── streak-flame.tsx
│   │   │   ├── mastery-ring.tsx
│   │   │   ├── mastery-glow.tsx
│   │   │   ├── leaderboard-card.tsx
│   │   │   ├── achievement-toast.tsx
│   │   │   ├── achievement-card.tsx
│   │   │   ├── daily-quest-tracker.tsx
│   │   │   ├── progress-celebration.tsx
│   │   │   └── level-indicator.tsx
│   │   ├── dashboard/             # Dashboard widgets
│   │   │   ├── student/
│   │   │   │   ├── today-panel.tsx
│   │   │   │   ├── streak-widget.tsx
│   │   │   │   ├── progress-summary.tsx
│   │   │   │   ├── continue-learning.tsx
│   │   │   │   ├── weak-areas-widget.tsx
│   │   │   │   ├── daily-quests-widget.tsx
│   │   │   │   ├── rank-widget.tsx
│   │   │   │   └── recent-activity.tsx
│   │   │   ├── teacher/
│   │   │   │   ├── class-overview.tsx
│   │   │   │   ├── at-risk-students.tsx
│   │   │   │   ├── assignment-status.tsx
│   │   │   │   ├── engagement-chart.tsx
│   │   │   │   └── quick-actions.tsx
│   │   │   └── admin/
│   │   │       ├── school-metrics.tsx
│   │   │       ├── teacher-performance.tsx
│   │   │       └── cohort-analytics.tsx
│   │   ├── classroom/             # Classroom components
│   │   │   ├── classroom-card.tsx
│   │   │   ├── student-list.tsx
│   │   │   ├── assignment-card.tsx
│   │   │   ├── discussion-thread.tsx
│   │   │   └── grade-input.tsx
│   │   ├── charts/                # Data visualization
│   │   │   ├── mastery-chart.tsx
│   │   │   ├── retention-chart.tsx
│   │   │   ├── progress-chart.tsx
│   │   │   ├── engagement-chart.tsx
│   │   │   ├── heatmap.tsx
│   │   │   └── radar-chart.tsx
│   │   ├── motion/                # Animation components
│   │   │   ├── page-transition.tsx
│   │   │   ├── fade-in.tsx
│   │   │   ├── slide-up.tsx
│   │   │   ├── stagger-children.tsx
│   │   │   ├── glow-pulse.tsx
│   │   │   ├── particle-burst.tsx
│   │   │   ├── confetti.tsx
│   │   │   └── number-ticker.tsx
│   │   └── shared/                # Shared components
│   │       ├── loading-spinner.tsx
│   │       ├── empty-state.tsx
│   │       ├── error-boundary.tsx
│   │       ├── role-gate.tsx
│   │       ├── premium-gate.tsx
│   │       └── search-command.tsx
│   ├── hooks/                     # Custom hooks
│   │   ├── use-auth.ts
│   │   ├── use-user.ts
│   │   ├── use-xp.ts
│   │   ├── use-streak.ts
│   │   ├── use-mastery.ts
│   │   ├── use-sound.ts
│   │   ├── use-confetti.ts
│   │   ├── use-websocket.ts
│   │   ├── use-media-query.ts
│   │   ├── use-keyboard-shortcut.ts
│   │   └── use-local-storage.ts
│   ├── lib/                       # Utilities
│   │   ├── api/                   # API client
│   │   │   ├── client.ts          # Axios/fetch wrapper
│   │   │   ├── endpoints.ts       # API endpoint constants
│   │   │   ├── auth.ts
│   │   │   ├── learning.ts
│   │   │   ├── gamification.ts
│   │   │   ├── classroom.ts
│   │   │   ├── ai.ts
│   │   │   └── admin.ts
│   │   ├── utils.ts
│   │   ├── constants.ts
│   │   ├── validators.ts
│   │   └── formatters.ts
│   ├── stores/                    # Zustand stores
│   │   ├── auth-store.ts
│   │   ├── learning-store.ts
│   │   ├── gamification-store.ts
│   │   ├── ui-store.ts
│   │   └── notification-store.ts
│   ├── providers/                 # React providers
│   │   ├── theme-provider.tsx
│   │   ├── query-provider.tsx
│   │   ├── clerk-provider.tsx
│   │   ├── websocket-provider.tsx
│   │   ├── sound-provider.tsx
│   │   └── gamification-provider.tsx
│   ├── styles/                    # Global styles
│   │   ├── globals.css
│   │   ├── animations.css
│   │   └── themes/
│   │       ├── dark.css
│   │       └── light.css
│   └── types/                     # TypeScript types
│       ├── user.ts
│       ├── learning.ts
│       ├── gamification.ts
│       ├── classroom.ts
│       ├── ai.ts
│       └── api.ts
├── tailwind.config.ts
├── next.config.ts
├── tsconfig.json
└── package.json
```

---

## Route Architecture

### Route Groups

| Group | Path Prefix | Layout | Auth Required |
|-------|-------------|--------|---------------|
| Marketing | `/` | Marketing layout | No |
| Auth | `/sign-in`, `/sign-up`, `/onboarding` | Auth layout | Partial |
| Student | `/student/*` | Platform + Student sidebar | Yes |
| Teacher | `/teacher/*` | Platform + Teacher sidebar | Yes |
| Admin | `/admin/*` | Platform + Admin sidebar | Yes |
| Super Admin | `/super-admin/*` | Platform + SA sidebar | Yes |

### Middleware Strategy

```typescript
// middleware.ts - Route protection
export default clerkMiddleware((auth, request) => {
  const { userId, sessionClaims } = auth();
  const role = sessionClaims?.metadata?.role;
  const path = request.nextUrl.pathname;

  // Public routes
  if (isPublicRoute(path)) return;

  // Auth required
  if (!userId) return redirectToSignIn();

  // Role-based access
  if (path.startsWith('/student') && role !== 'student') redirect('/');
  if (path.startsWith('/teacher') && role !== 'teacher') redirect('/');
  if (path.startsWith('/admin') && role !== 'school_admin') redirect('/');
  if (path.startsWith('/super-admin') && role !== 'super_admin') redirect('/');
});
```

---

## Layout System

### Root Layout
- Theme provider
- Clerk provider
- Query provider
- WebSocket provider
- Gamification provider (sound effects, toasts)
- Global toast system

### Platform Layout (Authenticated Shell)
```
┌─────────────────────────────────────────────────┐
│ Top Bar (XP, Streak, Rank, Profile, Notifs)     │
├──────────┬──────────────────────────────────────┤
│          │                                      │
│ Sidebar  │         Main Content                 │
│ (role-   │         (page content)               │
│  based)  │                                      │
│          │                                      │
│          │                                      │
│          │                                      │
├──────────┴──────────────────────────────────────┤
│ (Mobile: Bottom nav)                            │
└─────────────────────────────────────────────────┘
```

### Student Sidebar Navigation
```
🏠 Dashboard
📚 Learn
  └ Math
  └ Science (locked)
  └ English (locked)
🌳 Skill Tree
⚔️ Practice
  └ Daily Quests
  └ Review
  └ Boss Battle
🤖 AI Tutor
📊 Progress
🏫 Classrooms
🏆 Leaderboard
⭐ Achievements
```

### Teacher Sidebar Navigation
```
🏠 Dashboard
🏫 Classrooms
👥 Students
📋 Assignments
📊 Analytics
  └ Performance
  └ Engagement
  └ Weak Areas
📝 Content
⚙️ Settings
```

---

## State Management Strategy

### Server State (React Query / TanStack Query)
- All API data fetching
- Caching with smart invalidation
- Optimistic updates for gamification
- Background refetching for leaderboards

### Client State (Zustand)
- UI state (sidebar open, modals)
- Learning session state
- Quiz in-progress state
- Gamification animations queue
- Sound effect triggers

### URL State (Next.js searchParams)
- Filters
- Tab selections
- Pagination
- View modes

---

## Data Fetching Patterns

### Server Components (Default)
```typescript
// Dashboard page - fetched on server
async function StudentDashboard() {
  const user = await getCurrentUser();
  const progress = await getStudentProgress(user.id);
  const streak = await getStreak(user.id);
  const quests = await getDailyQuests(user.id);
  
  return (
    <DashboardShell>
      <StreakWidget streak={streak} />
      <ProgressSummary progress={progress} />
      <DailyQuestsWidget quests={quests} />
    </DashboardShell>
  );
}
```

### Client Components (Interactive)
```typescript
// Quiz player - needs client interactivity
'use client';
function QuizPlayer({ quizId }: { quizId: string }) {
  const { data: quiz } = useQuery(['quiz', quizId], () => fetchQuiz(quizId));
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const submitAnswer = useMutation(submitQuizAnswer);
  // ... interactive logic
}
```

---

## Animation System

### Page Transitions
```typescript
// Framer Motion page wrapper
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

// Applied via layout wrapper
<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
  {children}
</motion.div>
```

### Gamification Animations
| Event | Animation |
|-------|-----------|
| XP Gain | Number ticker + floating +XP badge |
| Level Up | Full-screen glow pulse + confetti |
| Rank Up | Cinematic rank badge reveal |
| Streak Maintained | Flame animation intensifies |
| Mastery Achieved | Ring completion + golden glow |
| Achievement Unlocked | Toast slide-in + badge reveal |
| Correct Answer | Green flash + subtle shake |
| Wrong Answer | Red flash + gentle error shake |
| Boss Defeated | Explosion particles + XP rain |
| Daily Quest Complete | Checkbox animation + reward reveal |

### Motion Design Tokens
```typescript
export const motion = {
  // Easings
  ease: {
    smooth: [0.4, 0, 0.2, 1],
    bounce: [0.68, -0.55, 0.265, 1.55],
    sharp: [0.4, 0, 0.6, 1],
  },
  // Durations
  duration: {
    fast: 0.15,
    normal: 0.3,
    slow: 0.5,
    celebration: 1.2,
  },
  // Spring configs
  spring: {
    snappy: { stiffness: 400, damping: 25 },
    bouncy: { stiffness: 300, damping: 15 },
    gentle: { stiffness: 150, damping: 20 },
  },
};
```

---

## Responsive Strategy

### Breakpoints
```typescript
// Tailwind config
screens: {
  'sm': '640px',   // Mobile landscape
  'md': '768px',   // Tablet
  'lg': '1024px',  // Desktop
  'xl': '1280px',  // Large desktop
  '2xl': '1536px', // Ultra-wide
}
```

### Desktop-First Approach
- Sidebar visible on desktop (lg+)
- Collapsible sidebar on tablet (md)
- Bottom navigation on mobile (sm)
- Content adapts with grid breakpoints
- Modals become full-screen on mobile
- Skill tree scrollable/zoomable on all devices

### Mobile Adaptations
| Component | Desktop | Mobile |
|-----------|---------|--------|
| Navigation | Sidebar | Bottom nav |
| Skill Tree | Full canvas | Scrollable list |
| Quiz | Side panel explanations | Bottom sheet |
| AI Tutor | Side panel | Full screen |
| Leaderboard | Full table | Compact cards |
| Lesson | Wide content | Full-width scroll |

---

## Key Page Designs

### Student Dashboard
```
┌─────────────────────────────────────────────────────┐
│ Good morning, Alex! 🔥 12 day streak               │
├──────────────────────┬──────────────────────────────┤
│                      │                              │
│  Continue Learning   │   Today's Quests (3/5)      │
│  ┌───────────────┐   │   ☐ Complete 1 lesson       │
│  │ Algebra Ch.4  │   │   ☑ Practice 10 problems    │
│  │ ████████░░ 80%│   │   ☐ Maintain streak         │
│  └───────────────┘   │   ☐ Defeat daily boss       │
│                      │   ☑ Review 5 concepts        │
│  Rank: Gold III      │                              │
│  XP: 2,450 / 3,000  │──────────────────────────────│
│  ████████████░░░░░   │                              │
│                      │   Weak Areas                 │
│──────────────────────│   ⚠️ Quadratic equations     │
│                      │   ⚠️ Function composition    │
│  Mastery Overview    │   💡 AI recommends review    │
│  Math: 67% mastered  │                              │
│  ○○○●●●●●●○○○○      │──────────────────────────────│
│                      │                              │
│                      │   Leaderboard (Class)        │
│                      │   🥇 Sarah - 3,200 XP       │
│                      │   🥈 You - 2,450 XP         │
│                      │   🥉 Mike - 2,100 XP        │
└──────────────────────┴──────────────────────────────┘
```

### Lesson Player
```
┌─────────────────────────────────────────────────────┐
│ ← Back    Lesson 4.2: Quadratic Formula    ●●●○○○  │
├─────────────────────────────────────────────────────┤
│                                                     │
│   ┌─────────────────────────────────────────────┐   │
│   │                                             │   │
│   │     Interactive Content Area                │   │
│   │                                             │   │
│   │     - Explanation text                      │   │
│   │     - Interactive visualization             │   │
│   │     - Inline questions                      │   │
│   │     - Draggable elements                    │   │
│   │     - Step-by-step reveals                  │   │
│   │                                             │   │
│   └─────────────────────────────────────────────┘   │
│                                                     │
│   ┌──────────┐                                      │
│   │ 💡 Hint  │  ← AI-powered contextual hints      │
│   └──────────┘                                      │
│                                                     │
│              [Continue →]                            │
│                                                     │
├─────────────────────────────────────────────────────┤
│ Progress: Step 3 of 6        +15 XP this lesson     │
└─────────────────────────────────────────────────────┘
```

### Skill Tree View
```
┌─────────────────────────────────────────────────────┐
│ Skill Tree — Mathematics                   Filter ▾ │
├─────────────────────────────────────────────────────┤
│                                                     │
│         [Calculus]          ← Locked (gray)         │
│            │                                        │
│    ┌───────┴───────┐                                │
│    │               │                                │
│ [Trig]      [Pre-Calc]     ← Locked                │
│    │               │                                │
│    └───────┬───────┘                                │
│            │                                        │
│    [Algebra II] ████████    ← In Progress (blue)    │
│            │                                        │
│    ┌───────┴───────┐                                │
│    │               │                                │
│ [Geometry]  [Algebra I]    ← Mastered (gold glow)   │
│    │               │                                │
│    └───────┬───────┘                                │
│            │                                        │
│    [Foundations] ★★★★★     ← Mastered (gold)        │
│                                                     │
│ Legend: ★ Mastered  ● Active  ○ Locked              │
└─────────────────────────────────────────────────────┘
```

---

## Design System Tokens

### Colors
```typescript
export const colors = {
  // Base
  background: { DEFAULT: '#0a0a0f', card: '#12121a', elevated: '#1a1a25' },
  foreground: { DEFAULT: '#f0f0f5', muted: '#8888a0', subtle: '#4a4a60' },
  
  // Brand
  primary: { DEFAULT: '#3b82f6', hover: '#2563eb', glow: '#3b82f640' },
  accent: { DEFAULT: '#8b5cf6', hover: '#7c3aed', glow: '#8b5cf640' },
  
  // Gamification
  xp: { DEFAULT: '#3b82f6', glow: '#3b82f640' },
  mastery: { DEFAULT: '#f59e0b', glow: '#f59e0b40' },
  streak: { DEFAULT: '#ef4444', glow: '#ef444440' },
  success: { DEFAULT: '#10b981', glow: '#10b98140' },
  danger: { DEFAULT: '#ef4444', glow: '#ef444440' },
  
  // Ranks
  rank: {
    bronze: '#cd7f32',
    silver: '#c0c0c0',
    gold: '#ffd700',
    platinum: '#e5e4e2',
    diamond: '#b9f2ff',
    master: '#ff6b35',
  },
};
```

### Typography
```typescript
export const typography = {
  fontFamily: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
    mono: ['JetBrains Mono', 'monospace'],
    display: ['Cal Sans', 'Inter', 'sans-serif'],
  },
  fontSize: {
    'display-lg': ['3.5rem', { lineHeight: '1.1', fontWeight: '700' }],
    'display': ['2.5rem', { lineHeight: '1.2', fontWeight: '700' }],
    'heading-lg': ['1.875rem', { lineHeight: '1.3', fontWeight: '600' }],
    'heading': ['1.5rem', { lineHeight: '1.4', fontWeight: '600' }],
    'heading-sm': ['1.25rem', { lineHeight: '1.4', fontWeight: '600' }],
    'body-lg': ['1.125rem', { lineHeight: '1.6' }],
    'body': ['1rem', { lineHeight: '1.6' }],
    'body-sm': ['0.875rem', { lineHeight: '1.5' }],
    'caption': ['0.75rem', { lineHeight: '1.4' }],
  },
};
```

### Spacing & Sizing
```typescript
export const spacing = {
  sidebar: '260px',
  sidebarCollapsed: '72px',
  topbar: '64px',
  contentMaxWidth: '1200px',
  cardPadding: '24px',
  sectionGap: '32px',
};
```

---

## Performance Optimization

1. **React Server Components** — Default for static/data pages
2. **Streaming** — Suspense boundaries for progressive loading
3. **Image Optimization** — Next.js Image with blur placeholders
4. **Code Splitting** — Dynamic imports for heavy components (skill tree, charts)
5. **Prefetching** — Link prefetch for anticipated navigation
6. **Virtual Lists** — For leaderboards and long lists
7. **Memoization** — React.memo for expensive renders
8. **Bundle Analysis** — Regular monitoring of bundle size
9. **Font Optimization** — next/font with variable fonts
10. **CSS-first Animations** — Tailwind animate for simple transitions, Framer for complex
