# UI Design System & Component Architecture

## Design Tokens

### Color System

```css
/* Dark Theme (Primary) */
:root {
  /* Background layers */
  --bg-base: #050507;
  --bg-primary: #0a0a0f;
  --bg-secondary: #12121a;
  --bg-elevated: #1a1a25;
  --bg-hover: #222230;
  --bg-active: #2a2a3a;
  
  /* Borders */
  --border-subtle: #1e1e2e;
  --border-default: #2a2a3a;
  --border-strong: #3a3a4a;
  
  /* Text */
  --text-primary: #f0f0f5;
  --text-secondary: #a0a0b5;
  --text-muted: #6a6a80;
  --text-disabled: #4a4a5a;
  
  /* Brand - Electric Blue */
  --brand-primary: #3b82f6;
  --brand-primary-hover: #2563eb;
  --brand-primary-glow: rgba(59, 130, 246, 0.25);
  --brand-primary-subtle: rgba(59, 130, 246, 0.1);
  
  /* Accent - Purple */
  --accent: #8b5cf6;
  --accent-hover: #7c3aed;
  --accent-glow: rgba(139, 92, 246, 0.25);
  --accent-subtle: rgba(139, 92, 246, 0.1);
  
  /* Success - Emerald */
  --success: #10b981;
  --success-hover: #059669;
  --success-glow: rgba(16, 185, 129, 0.25);
  --success-subtle: rgba(16, 185, 129, 0.1);
  
  /* Warning - Amber */
  --warning: #f59e0b;
  --warning-hover: #d97706;
  --warning-glow: rgba(245, 158, 11, 0.25);
  
  /* Danger - Red */
  --danger: #ef4444;
  --danger-hover: #dc2626;
  --danger-glow: rgba(239, 68, 68, 0.25);
  
  /* Gamification Colors */
  --xp-blue: #3b82f6;
  --mastery-gold: #fbbf24;
  --mastery-gold-glow: rgba(251, 191, 36, 0.3);
  --streak-fire: #f97316;
  --streak-fire-glow: rgba(249, 115, 22, 0.3);
  
  /* Rank Colors */
  --rank-bronze: #cd7f32;
  --rank-silver: #c0c0c0;
  --rank-gold: #ffd700;
  --rank-platinum: #e5e4e2;
  --rank-diamond: #b9f2ff;
  --rank-master: #ff6b35;
  
  /* Glassmorphism */
  --glass-bg: rgba(18, 18, 26, 0.7);
  --glass-border: rgba(255, 255, 255, 0.08);
  --glass-blur: 12px;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.4);
  --shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.5);
  --shadow-glow: 0 0 20px var(--brand-primary-glow);
  
  /* Spacing */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;
  
  /* Radii */
  --radius-sm: 6px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-2xl: 24px;
  --radius-full: 9999px;
  
  /* Layout */
  --sidebar-width: 260px;
  --sidebar-collapsed: 72px;
  --topbar-height: 64px;
  --content-max-width: 1200px;
}
```

### Typography Scale

```css
:root {
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-display: 'Cal Sans', 'Inter', sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;
  
  /* Type Scale */
  --text-xs: 0.75rem;     /* 12px */
  --text-sm: 0.875rem;    /* 14px */
  --text-base: 1rem;      /* 16px */
  --text-lg: 1.125rem;    /* 18px */
  --text-xl: 1.25rem;     /* 20px */
  --text-2xl: 1.5rem;     /* 24px */
  --text-3xl: 1.875rem;   /* 30px */
  --text-4xl: 2.25rem;    /* 36px */
  --text-5xl: 3rem;       /* 48px */
  --text-6xl: 3.75rem;    /* 60px */
  
  /* Font Weights */
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
}
```

---

## Component Library

### Base Components (Shadcn Extended)

| Component | Variants | Usage |
|-----------|----------|-------|
| Button | primary, secondary, ghost, danger, success, glow | All CTAs |
| Card | default, elevated, glass, interactive, glow-border | Content containers |
| Badge | default, rank, xp, streak, mastery, status | Labels |
| Progress | linear, circular, ring, xp-bar | Progress indicators |
| Input | text, number, search, code | Form inputs |
| Dialog | default, celebration, confirmation | Modals |
| Toast | success, error, achievement, xp | Notifications |
| Tabs | default, underline, pills | Navigation |
| Avatar | user, rank-bordered | Profile pictures |
| Tooltip | default, rich | Contextual info |
| Dropdown | menu, select, command | Selection menus |
| Sheet | side, bottom | Mobile panels |

### Custom Components

#### Gamification Components

```typescript
// XP Bar - Shows current XP progress toward next level
interface XPBarProps {
  currentXp: number;
  nextLevelXp: number;
  level: number;
  animated?: boolean;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

// Rank Badge - Displays current rank with glow
interface RankBadgeProps {
  rank: RankTier;
  division: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  animated?: boolean;
}

// Streak Counter - Fire animation streak display
interface StreakCounterProps {
  current: number;
  longest: number;
  showFlame?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

// Mastery Ring - Circular mastery indicator
interface MasteryRingProps {
  level: number; // 0-1
  status: MasteryStatus;
  size?: number; // px
  showLabel?: boolean;
  glowing?: boolean;
  decaying?: boolean;
}

// XP Gain Toast - Animated XP notification
interface XPGainToastProps {
  amount: number;
  source: string;
  multiplier?: number;
  streakBonus?: number;
}

// Achievement Toast - Slide-in achievement notification
interface AchievementToastProps {
  achievement: Achievement;
  rarity: Rarity;
}

// Leaderboard Row
interface LeaderboardRowProps {
  position: number;
  student: { name: string; avatar: string; rank: RankTier };
  score: number;
  change: number; // position change
  isCurrentUser?: boolean;
}

// Daily Quest Card
interface DailyQuestCardProps {
  quest: DailyQuest;
  progress: { current: number; target: number };
  isCompleted: boolean;
}
```

#### Learning Components

```typescript
// Lesson Player - Full lesson rendering engine
interface LessonPlayerProps {
  lesson: Lesson;
  onStepComplete: (stepId: string, result: StepResult) => void;
  onLessonComplete: (result: LessonResult) => void;
  onHintRequested: (stepId: string) => void;
}

// Skill Tree Canvas - Interactive DAG visualization
interface SkillTreeCanvasProps {
  tree: SkillTree;
  onNodeClick: (topicId: string) => void;
  zoom?: number;
  focusNode?: string;
}

// Quiz Player - Quiz rendering and submission
interface QuizPlayerProps {
  quiz: Quiz;
  onAnswer: (questionId: string, answer: any) => void;
  onComplete: (results: QuizResults) => void;
  timeLimit?: number;
  adaptive?: boolean;
}

// AI Tutor Chat - Full tutoring interface
interface AiTutorChatProps {
  sessionId?: string;
  topicContext?: string;
  lessonContext?: string;
}

// Boss Battle Arena - Gamified quiz experience
interface BossBattleArenaProps {
  battle: BossBattle;
  onAnswer: (questionId: string, answer: any) => void;
  onEnd: (result: BattleResult) => void;
}
```

---

## Page Layouts

### Student Dashboard Layout

```
┌─────────────────────────────────────────────────────────────┐
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ Top Bar                                                 │ │
│ │ [Logo]    [Search ⌘K]          🔥12  ⭐2450  [👤][🔔] │ │
│ └─────────────────────────────────────────────────────────┘ │
│ ┌──────┐┌─────────────────────────────────────────────────┐ │
│ │      ││                                                 │ │
│ │  S   ││   Main Content Area                            │ │
│ │  i   ││                                                 │ │
│ │  d   ││   ┌─────────────┐ ┌─────────────────────────┐ │ │
│ │  e   ││   │ Continue    │ │ Daily Quests            │ │ │
│ │  b   ││   │ Learning    │ │ ☐ Complete 2 lessons    │ │ │
│ │  a   ││   │             │ │ ☑ Practice 10 problems  │ │ │
│ │  r   ││   │ Algebra II  │ │ ☐ Review 3 topics      │ │ │
│ │      ││   │ Ch.4 ███░░  │ │ ☐ Maintain streak      │ │ │
│ │      ││   └─────────────┘ └─────────────────────────┘ │ │
│ │      ││                                                 │ │
│ │      ││   ┌─────────────┐ ┌─────────────────────────┐ │ │
│ │      ││   │ Weak Areas  │ │ Mastery Overview        │ │ │
│ │      ││   │ ⚠️ Topic A  │ │ ●●●●○○○○ 4/8 topics   │ │ │
│ │      ││   │ ⚠️ Topic B  │ │ Gold III → Gold II: 78% │ │ │
│ │      ││   └─────────────┘ └─────────────────────────┘ │ │
│ │      ││                                                 │ │
│ └──────┘└─────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### Lesson Player Layout

```
┌─────────────────────────────────────────────────────────────┐
│ [← Back]     Quadratic Formula         Step 3/7    [⚙️]    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   ┌───────────────────────────────────────────────────┐     │
│   │                                                   │     │
│   │              CONTENT AREA                         │     │
│   │                                                   │     │
│   │    Rich text, interactive elements,               │     │
│   │    visualizations, questions                      │     │
│   │                                                   │     │
│   │    ┌─────────────────────────────┐                │     │
│   │    │  What is the value of b?    │                │     │
│   │    │  [___________]  [Submit]    │                │     │
│   │    │                             │                │     │
│   │    │  💡 Need a hint?            │                │     │
│   │    └─────────────────────────────┘                │     │
│   │                                                   │     │
│   └───────────────────────────────────────────────────┘     │
│                                                             │
│   ┌─── Progress ──────────────────────────────────────┐     │
│   │ ●●●○○○○                          +35 XP earned   │     │
│   └───────────────────────────────────────────────────┘     │
│                                                             │
│                    [Continue →]                              │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Animation Specifications

### Page Transitions

```typescript
// Shared page transition wrapper
const pageTransition = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2 } },
};
```

### Micro-interactions

```typescript
// Button press
const buttonPress = {
  whileTap: { scale: 0.97 },
  transition: { duration: 0.1 },
};

// Card hover
const cardHover = {
  whileHover: { 
    y: -2, 
    boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
    borderColor: 'rgba(59, 130, 246, 0.3)',
  },
  transition: { duration: 0.2 },
};

// Stagger children (for lists)
const staggerContainer = {
  animate: { transition: { staggerChildren: 0.05 } },
};

const staggerItem = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
};
```

### Gamification Animations

```typescript
// XP Gain - floating number animation
const xpGainAnimation = {
  initial: { opacity: 0, y: 0, scale: 0.5 },
  animate: { 
    opacity: [0, 1, 1, 0], 
    y: [0, -20, -40, -60], 
    scale: [0.5, 1.2, 1, 0.8],
  },
  transition: { duration: 1.5, ease: 'easeOut' },
};

// Rank Up - cinematic reveal
const rankUpAnimation = {
  overlay: {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
  },
  badge: {
    initial: { scale: 0, rotate: -180 },
    animate: { 
      scale: [0, 1.3, 1], 
      rotate: [180, 0, 0],
      transition: { duration: 1.2, ease: [0.34, 1.56, 0.64, 1] },
    },
  },
  glow: {
    animate: { 
      boxShadow: [
        '0 0 0px rgba(251, 191, 36, 0)',
        '0 0 60px rgba(251, 191, 36, 0.6)',
        '0 0 30px rgba(251, 191, 36, 0.3)',
      ],
      transition: { duration: 2, repeat: 2 },
    },
  },
};

// Mastery Ring Completion
const masteryCompleteAnimation = {
  ring: {
    initial: { pathLength: 0 },
    animate: { pathLength: 1 },
    transition: { duration: 1.5, ease: 'easeInOut' },
  },
  glow: {
    animate: {
      filter: ['drop-shadow(0 0 0px #fbbf24)', 'drop-shadow(0 0 20px #fbbf24)'],
      transition: { duration: 0.5, delay: 1.5 },
    },
  },
  particles: {
    // Trigger confetti/particles at completion
    delay: 1.8,
  },
};

// Streak Flame
const streakFlameAnimation = {
  idle: {
    animate: { 
      scaleY: [1, 1.05, 1],
      scaleX: [1, 0.98, 1],
    },
    transition: { duration: 0.8, repeat: Infinity },
  },
  intense: { // For high streaks
    animate: {
      scaleY: [1, 1.15, 1],
      scaleX: [1, 0.95, 1],
      filter: ['brightness(1)', 'brightness(1.3)', 'brightness(1)'],
    },
    transition: { duration: 0.5, repeat: Infinity },
  },
};

// Correct Answer
const correctAnswerAnimation = {
  container: {
    animate: { 
      backgroundColor: ['transparent', 'rgba(16, 185, 129, 0.1)', 'transparent'],
    },
    transition: { duration: 0.6 },
  },
  icon: {
    initial: { scale: 0, rotate: -45 },
    animate: { scale: 1, rotate: 0 },
    transition: { type: 'spring', stiffness: 400, damping: 15 },
  },
};

// Wrong Answer
const wrongAnswerAnimation = {
  container: {
    animate: { 
      x: [0, -4, 4, -4, 4, 0],
      backgroundColor: ['transparent', 'rgba(239, 68, 68, 0.1)', 'transparent'],
    },
    transition: { duration: 0.5 },
  },
};
```

---

## Responsive Patterns

### Breakpoint Behavior

| Component | Mobile (<768) | Tablet (768-1024) | Desktop (1024+) |
|-----------|--------------|-------------------|-----------------|
| Sidebar | Hidden (bottom nav) | Collapsed icons | Full expanded |
| Top Bar | Simplified | Full | Full |
| Dashboard Grid | 1 column | 2 columns | 3 columns |
| Lesson Content | Full width | Max 720px centered | Max 800px centered |
| Skill Tree | Vertical list | Small canvas | Full canvas |
| Quiz | Full screen | Card centered | Card centered |
| AI Tutor | Full screen | Side panel | Side panel |
| Leaderboard | Compact cards | Table | Table |
| Cards | Stack | 2-col grid | 3-col grid |

### Mobile Navigation (Bottom)

```
┌─────────────────────────────────────────┐
│ 🏠 Home │ 📚 Learn │ ⚔️ Practice │ 📊 │
│  Home   │  Learn  │  Practice  │ More │
└─────────────────────────────────────────┘
```

---

## Glassmorphism & Effects

### Glass Card

```css
.glass-card {
  background: rgba(18, 18, 26, 0.7);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.3);
}
```

### Glow Effects

```css
/* Brand glow border */
.glow-border {
  border: 1px solid rgba(59, 130, 246, 0.3);
  box-shadow: 
    0 0 15px rgba(59, 130, 246, 0.1),
    inset 0 0 15px rgba(59, 130, 246, 0.05);
}

/* Mastery glow */
.mastery-glow {
  box-shadow: 0 0 20px rgba(251, 191, 36, 0.3);
  border: 1px solid rgba(251, 191, 36, 0.4);
}

/* Interactive element glow on hover */
.interactive-glow:hover {
  box-shadow: 0 0 20px var(--brand-primary-glow);
  border-color: var(--brand-primary);
}
```

### Gradient Backgrounds

```css
/* Page background gradient */
.bg-gradient-page {
  background: 
    radial-gradient(ellipse at top left, rgba(59, 130, 246, 0.05), transparent 50%),
    radial-gradient(ellipse at bottom right, rgba(139, 92, 246, 0.05), transparent 50%),
    var(--bg-primary);
}

/* Card highlight gradient */
.bg-gradient-card {
  background: linear-gradient(135deg, var(--bg-elevated), var(--bg-secondary));
}

/* XP progress gradient */
.bg-gradient-xp {
  background: linear-gradient(90deg, #3b82f6, #8b5cf6);
}

/* Mastery progress gradient */
.bg-gradient-mastery {
  background: linear-gradient(90deg, #8b5cf6, #fbbf24);
}
```

---

## Tailwind Config Extensions

```typescript
// tailwind.config.ts
export default {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        brand: {
          DEFAULT: '#3b82f6',
          hover: '#2563eb',
          glow: 'rgba(59, 130, 246, 0.25)',
        },
        accent: {
          DEFAULT: '#8b5cf6',
          hover: '#7c3aed',
          glow: 'rgba(139, 92, 246, 0.25)',
        },
        mastery: {
          DEFAULT: '#fbbf24',
          glow: 'rgba(251, 191, 36, 0.3)',
        },
        streak: {
          DEFAULT: '#f97316',
          glow: 'rgba(249, 115, 22, 0.3)',
        },
        rank: {
          bronze: '#cd7f32',
          silver: '#c0c0c0',
          gold: '#ffd700',
          platinum: '#e5e4e2',
          diamond: '#b9f2ff',
          master: '#ff6b35',
        },
      },
      animation: {
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'flame-flicker': 'flame-flicker 0.8s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'xp-pop': 'xp-pop 1.5s ease-out forwards',
        'shake': 'shake 0.5s ease-in-out',
        'ring-fill': 'ring-fill 1.5s ease-in-out forwards',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 15px rgba(59, 130, 246, 0.2)' },
          '50%': { boxShadow: '0 0 25px rgba(59, 130, 246, 0.4)' },
        },
        'flame-flicker': {
          '0%, 100%': { transform: 'scaleY(1) scaleX(1)' },
          '50%': { transform: 'scaleY(1.1) scaleX(0.95)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        'xp-pop': {
          '0%': { opacity: '0', transform: 'translateY(0) scale(0.5)' },
          '30%': { opacity: '1', transform: 'translateY(-10px) scale(1.2)' },
          '60%': { opacity: '1', transform: 'translateY(-25px) scale(1)' },
          '100%': { opacity: '0', transform: 'translateY(-40px) scale(0.8)' },
        },
        'shake': {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%': { transform: 'translateX(-4px)' },
          '40%': { transform: 'translateX(4px)' },
          '60%': { transform: 'translateX(-4px)' },
          '80%': { transform: 'translateX(4px)' },
        },
        'ring-fill': {
          '0%': { strokeDashoffset: '100' },
          '100%': { strokeDashoffset: '0' },
        },
      },
      backdropBlur: {
        'glass': '12px',
      },
    },
  },
};
```

---

## Accessibility Standards

### Requirements
- WCAG 2.1 AA compliance minimum
- Keyboard navigation for all interactive elements
- Screen reader support with proper ARIA labels
- Focus indicators (visible, branded glow style)
- Color contrast ratios met even with dark theme
- Reduced motion support via `prefers-reduced-motion`
- Skip navigation links
- Semantic HTML structure

### Focus Styles

```css
/* Custom focus ring (branded) */
:focus-visible {
  outline: 2px solid var(--brand-primary);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Icon System

Use **Lucide React** for all icons (consistent, tree-shakeable):

| Context | Icon Examples |
|---------|-------------|
| Navigation | Home, BookOpen, Target, Sword, Bot, BarChart3, Trophy |
| Actions | Plus, Edit, Trash, Check, X, ChevronRight |
| Gamification | Flame, Star, Award, Crown, Zap, Shield |
| Status | CheckCircle, AlertTriangle, XCircle, Clock, Lock |
| Learning | GraduationCap, Brain, Lightbulb, PenTool |

---

## Loading States

### Skeleton Patterns

```typescript
// Dashboard skeleton
function DashboardSkeleton() {
  return (
    <div className="grid grid-cols-3 gap-6">
      <Skeleton className="h-48 rounded-xl" />
      <Skeleton className="h-48 rounded-xl" />
      <Skeleton className="h-48 rounded-xl" />
      <Skeleton className="col-span-2 h-64 rounded-xl" />
      <Skeleton className="h-64 rounded-xl" />
    </div>
  );
}

// Card skeleton with shimmer effect
function CardSkeleton() {
  return (
    <div className="bg-bg-elevated rounded-xl p-6 animate-pulse">
      <div className="h-4 w-1/3 bg-bg-hover rounded mb-4" />
      <div className="h-3 w-full bg-bg-hover rounded mb-2" />
      <div className="h-3 w-2/3 bg-bg-hover rounded" />
    </div>
  );
}
```

### Transition States

| State | Visual |
|-------|--------|
| Loading | Shimmer skeleton matching layout |
| Error | Branded error card with retry button |
| Empty | Illustrated empty state with CTA |
| Success | Brief green flash + content appears |

---

## Dark/Light Mode Strategy

- **Dark mode is PRIMARY** (designed first)
- Light mode available as optional toggle
- System preference detection on first visit
- Saved to user preferences
- CSS custom properties make switching seamless
- All colors defined in both themes
- Glassmorphism effects adjusted for light mode
- Glow effects toned down in light mode
