# API Design — REST Endpoints & WebSocket Events

## API Conventions

- Base URL: `https://api.nexuslearning.com/v1`
- Authentication: Bearer token (Clerk JWT)
- Response format: JSON
- Pagination: cursor-based for lists
- Rate limiting: per user, per endpoint
- Versioning: URL-based (`/v1/`)
- Error format: `{ error: { code, message, details } }`

### Standard Response Envelope

```typescript
interface ApiResponse<T> {
  data: T;
  meta?: {
    cursor?: string;
    hasMore?: boolean;
    total?: number;
  };
}

interface ApiError {
  error: {
    code: string;           // Machine-readable: "INSUFFICIENT_MASTERY"
    message: string;        // Human-readable
    details?: any;          // Additional context
    statusCode: number;
  };
}
```

---

## Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/webhook` | Clerk webhook handler |
| POST | `/auth/sync` | Sync user from Clerk to DB |
| GET | `/auth/me` | Get current user profile + role |

---

## User Endpoints

| Method | Endpoint | Description | Roles |
|--------|----------|-------------|-------|
| GET | `/users/me` | Get full user profile | All |
| PATCH | `/users/me` | Update profile | All |
| GET | `/users/me/preferences` | Get user preferences | All |
| PATCH | `/users/me/preferences` | Update preferences | All |
| POST | `/users/onboarding` | Complete onboarding | All |
| GET | `/users/:id` | Get user by ID | Admin |
| GET | `/users` | List users (paginated) | Admin |
| PATCH | `/users/:id/role` | Update user role | Super Admin |
| DELETE | `/users/:id` | Soft delete user | Super Admin |

---

## Learning Endpoints

### Subjects

| Method | Endpoint | Description | Roles |
|--------|----------|-------------|-------|
| GET | `/subjects` | List all subjects | All |
| GET | `/subjects/:slug` | Get subject details | All |
| GET | `/subjects/:slug/skill-tree` | Get skill tree for subject | Student |
| POST | `/subjects` | Create subject | Super Admin |
| PATCH | `/subjects/:id` | Update subject | Super Admin |

### Topics

| Method | Endpoint | Description | Roles |
|--------|----------|-------------|-------|
| GET | `/subjects/:slug/topics` | List topics in subject | All |
| GET | `/topics/:id` | Get topic details | All |
| GET | `/topics/:id/prerequisites` | Get prerequisites | All |
| GET | `/topics/:id/unlock-status` | Check if unlocked for student | Student |
| POST | `/topics` | Create topic | Super Admin |
| PATCH | `/topics/:id` | Update topic | Super Admin |

### Lessons

| Method | Endpoint | Description | Roles |
|--------|----------|-------------|-------|
| GET | `/topics/:id/lessons` | List lessons in topic | All |
| GET | `/lessons/:id` | Get lesson with steps | All |
| POST | `/lessons/:id/start` | Start lesson (track) | Student |
| POST | `/lessons/:id/steps/:stepId/complete` | Complete a step | Student |
| POST | `/lessons/:id/complete` | Mark lesson complete | Student |
| POST | `/lessons` | Create lesson | Super Admin |
| PATCH | `/lessons/:id` | Update lesson | Super Admin |

### Quizzes

| Method | Endpoint | Description | Roles |
|--------|----------|-------------|-------|
| GET | `/topics/:id/quizzes` | List quizzes for topic | All |
| GET | `/quizzes/:id` | Get quiz details | All |
| POST | `/quizzes/:id/start` | Start quiz attempt | Student |
| POST | `/quizzes/:id/submit` | Submit answer for question | Student |
| POST | `/quizzes/:id/complete` | Finish quiz attempt | Student |
| GET | `/quizzes/:id/attempts` | Get student's attempts | Student |
| POST | `/quizzes` | Create quiz | Admin |
| PATCH | `/quizzes/:id` | Update quiz | Admin |

---

## Progression Endpoints

| Method | Endpoint | Description | Roles |
|--------|----------|-------------|-------|
| GET | `/progress/overview` | Student progress summary | Student |
| GET | `/progress/topics` | All topic progress | Student |
| GET | `/progress/topics/:id` | Specific topic progress | Student |
| GET | `/progress/mastery` | Overall mastery stats | Student |
| GET | `/progress/retention` | Retention scores | Student |
| GET | `/progress/weak-areas` | Detected weak areas | Student |
| GET | `/progress/recommendations` | AI-powered recommendations | Student |
| GET | `/progress/timeline` | Activity timeline | Student |
| GET | `/progress/students/:id` | View student progress | Teacher |

---

## Gamification Endpoints

### XP

| Method | Endpoint | Description | Roles |
|--------|----------|-------------|-------|
| GET | `/gamification/xp` | Current XP + level | Student |
| GET | `/gamification/xp/history` | XP transaction history | Student |
| GET | `/gamification/xp/today` | XP earned today | Student |

### Ranks

| Method | Endpoint | Description | Roles |
|--------|----------|-------------|-------|
| GET | `/gamification/ranks` | All ranks list | All |
| GET | `/gamification/ranks/current` | Student current rank + progress | Student |

### Streaks

| Method | Endpoint | Description | Roles |
|--------|----------|-------------|-------|
| GET | `/gamification/streaks` | Current streak info | Student |
| POST | `/gamification/streaks/freeze` | Use streak freeze | Student |

### Achievements

| Method | Endpoint | Description | Roles |
|--------|----------|-------------|-------|
| GET | `/gamification/achievements` | All achievements + unlock status | Student |
| GET | `/gamification/achievements/recent` | Recently unlocked | Student |

### Leaderboard

| Method | Endpoint | Description | Roles |
|--------|----------|-------------|-------|
| GET | `/gamification/leaderboard/global` | Global leaderboard | All |
| GET | `/gamification/leaderboard/class/:id` | Class leaderboard | Student, Teacher |
| GET | `/gamification/leaderboard/weekly` | This week | All |
| GET | `/gamification/leaderboard/monthly` | This month | All |

### Quests

| Method | Endpoint | Description | Roles |
|--------|----------|-------------|-------|
| GET | `/gamification/quests/daily` | Today's quests + progress | Student |
| GET | `/gamification/quests/history` | Past quest completions | Student |

### Boss Battles

| Method | Endpoint | Description | Roles |
|--------|----------|-------------|-------|
| GET | `/gamification/boss-battles/available` | Available battles | Student |
| POST | `/gamification/boss-battles/:id/start` | Start battle | Student |
| POST | `/gamification/boss-battles/:id/answer` | Submit answer in battle | Student |
| POST | `/gamification/boss-battles/:id/end` | End battle | Student |

---

## AI Endpoints

| Method | Endpoint | Description | Roles |
|--------|----------|-------------|-------|
| POST | `/ai/tutor/sessions` | Create new tutor session | Student |
| GET | `/ai/tutor/sessions` | List tutor sessions | Student |
| GET | `/ai/tutor/sessions/:id` | Get session with messages | Student |
| POST | `/ai/tutor/sessions/:id/message` | Send message (returns stream) | Student |
| GET | `/ai/tutor/sessions/:id/stream` | SSE stream for response | Student |
| POST | `/ai/hints` | Get a hint for a question | Student |
| POST | `/ai/explain` | Get explanation for concept | Student |
| GET | `/ai/recommendations` | Get AI recommendations | Student |
| GET | `/ai/usage` | Check AI usage quota | Student |

---

## Classroom Endpoints

### Classrooms

| Method | Endpoint | Description | Roles |
|--------|----------|-------------|-------|
| GET | `/classrooms` | List my classrooms | All |
| POST | `/classrooms` | Create classroom | Teacher |
| GET | `/classrooms/:id` | Get classroom details | Member |
| PATCH | `/classrooms/:id` | Update classroom | Teacher |
| DELETE | `/classrooms/:id` | Delete classroom | Teacher |
| POST | `/classrooms/join` | Join by code | Student |
| POST | `/classrooms/:id/leave` | Leave classroom | Student |

### Classroom Students

| Method | Endpoint | Description | Roles |
|--------|----------|-------------|-------|
| GET | `/classrooms/:id/students` | List students | Teacher |
| GET | `/classrooms/:id/students/:studentId` | Student detail | Teacher |
| DELETE | `/classrooms/:id/students/:studentId` | Remove student | Teacher |
| GET | `/classrooms/:id/analytics` | Class analytics | Teacher |

### Assignments

| Method | Endpoint | Description | Roles |
|--------|----------|-------------|-------|
| GET | `/classrooms/:id/assignments` | List assignments | Member |
| POST | `/classrooms/:id/assignments` | Create assignment | Teacher |
| GET | `/assignments/:id` | Get assignment details | Member |
| PATCH | `/assignments/:id` | Update assignment | Teacher |
| DELETE | `/assignments/:id` | Delete assignment | Teacher |
| POST | `/assignments/:id/submit` | Submit work | Student |
| GET | `/assignments/:id/submissions` | View submissions | Teacher |
| PATCH | `/assignments/:id/submissions/:subId/grade` | Grade submission | Teacher |

### Discussions

| Method | Endpoint | Description | Roles |
|--------|----------|-------------|-------|
| GET | `/classrooms/:id/discussions` | List discussions | Member |
| POST | `/classrooms/:id/discussions` | Create discussion | Member |
| GET | `/discussions/:id` | Get discussion + replies | Member |
| POST | `/discussions/:id/replies` | Add reply | Member |
| DELETE | `/discussions/:id` | Delete discussion | Teacher |

---

## Analytics Endpoints

### Student Analytics

| Method | Endpoint | Description | Roles |
|--------|----------|-------------|-------|
| GET | `/analytics/student/summary` | Overall summary | Student |
| GET | `/analytics/student/performance` | Performance over time | Student |
| GET | `/analytics/student/engagement` | Engagement metrics | Student |
| GET | `/analytics/student/retention` | Retention heatmap | Student |

### Teacher Analytics

| Method | Endpoint | Description | Roles |
|--------|----------|-------------|-------|
| GET | `/analytics/teacher/overview` | Dashboard overview | Teacher |
| GET | `/analytics/teacher/class/:id/performance` | Class performance | Teacher |
| GET | `/analytics/teacher/class/:id/engagement` | Class engagement | Teacher |
| GET | `/analytics/teacher/class/:id/weak-areas` | Class-wide weak areas | Teacher |
| GET | `/analytics/teacher/class/:id/at-risk` | At-risk students | Teacher |
| GET | `/analytics/teacher/student/:id` | Individual student deep dive | Teacher |

### Admin Analytics

| Method | Endpoint | Description | Roles |
|--------|----------|-------------|-------|
| GET | `/analytics/admin/school/overview` | School overview | Admin |
| GET | `/analytics/admin/school/performance` | School performance | Admin |
| GET | `/analytics/admin/school/teachers` | Teacher effectiveness | Admin |
| GET | `/analytics/admin/school/cohorts` | Cohort analysis | Admin |

### Super Admin Analytics

| Method | Endpoint | Description | Roles |
|--------|----------|-------------|-------|
| GET | `/analytics/super/platform` | Platform-wide stats | Super Admin |
| GET | `/analytics/super/revenue` | Revenue metrics | Super Admin |
| GET | `/analytics/super/growth` | User growth | Super Admin |
| GET | `/analytics/super/engagement` | Platform engagement | Super Admin |
| GET | `/analytics/super/ai-usage` | AI cost & usage | Super Admin |

---

## Subscription Endpoints

| Method | Endpoint | Description | Roles |
|--------|----------|-------------|-------|
| GET | `/subscriptions/plans` | Available plans | All |
| GET | `/subscriptions/current` | Current subscription | All |
| POST | `/subscriptions/checkout` | Create Stripe checkout | All |
| POST | `/subscriptions/portal` | Stripe billing portal | All |
| POST | `/subscriptions/webhooks/stripe` | Stripe webhooks | System |

---

## Content Management Endpoints (Super Admin)

| Method | Endpoint | Description | Roles |
|--------|----------|-------------|-------|
| GET | `/cms/subjects` | Manage subjects | Super Admin |
| GET | `/cms/topics` | Manage topics | Super Admin |
| GET | `/cms/lessons` | Manage lessons | Super Admin |
| GET | `/cms/questions` | Question bank | Super Admin |
| POST | `/cms/media/upload` | Upload media | Admin |
| GET | `/cms/content/versions` | Content versioning | Super Admin |

---

## Notification Endpoints

| Method | Endpoint | Description | Roles |
|--------|----------|-------------|-------|
| GET | `/notifications` | List notifications | All |
| PATCH | `/notifications/:id/read` | Mark as read | All |
| PATCH | `/notifications/read-all` | Mark all as read | All |
| GET | `/notifications/unread-count` | Get unread count | All |
| PATCH | `/notifications/preferences` | Update notification prefs | All |

---

## WebSocket Events

### Connection
```
ws://api.nexuslearning.com/ws?token=<jwt>
```

### Server → Client Events

| Event | Payload | Description |
|-------|---------|-------------|
| `xp.gained` | `{ amount, source, total, animation }` | XP awarded |
| `rank.up` | `{ newRank, previousRank }` | Rank promotion |
| `achievement.unlocked` | `{ achievement, xpReward }` | New achievement |
| `streak.updated` | `{ current, longest, flame }` | Streak change |
| `quest.completed` | `{ quest, xpReward }` | Daily quest done |
| `quest.progress` | `{ questId, current, target }` | Quest progress update |
| `notification.new` | `{ notification }` | New notification |
| `leaderboard.update` | `{ position, score, change }` | Rank position changed |
| `mastery.changed` | `{ topicId, newLevel, status }` | Mastery level changed |
| `lesson.xp` | `{ amount, stepId }` | Inline XP for lesson step |
| `boss.damage` | `{ bossHp, playerHp, combo }` | Boss battle update |

### Client → Server Events

| Event | Payload | Description |
|-------|---------|-------------|
| `presence.heartbeat` | `{}` | Keep alive |
| `learning.active` | `{ lessonId }` | Currently learning |
| `typing.tutor` | `{ sessionId }` | Typing in AI tutor |

---

## Request/Response Examples

### Start a Lesson
```http
POST /v1/lessons/lesson_123/start
Authorization: Bearer <token>

Response 200:
{
  "data": {
    "sessionId": "session_abc",
    "lesson": {
      "id": "lesson_123",
      "title": "The Quadratic Formula",
      "totalSteps": 7,
      "xpReward": 60,
      "steps": [...]
    },
    "progress": {
      "currentStep": 1,
      "stepsCompleted": 0
    }
  }
}
```

### Submit Quiz Answer
```http
POST /v1/quizzes/quiz_456/submit
Authorization: Bearer <token>
Content-Type: application/json

{
  "questionId": "q_789",
  "answer": "c",
  "timeSpent": 23
}

Response 200:
{
  "data": {
    "correct": true,
    "explanation": "The discriminant determines...",
    "xpEarned": 15,
    "streakBonus": 4,
    "questProgress": {
      "questId": "quest_daily_1",
      "current": 3,
      "target": 5
    }
  }
}
```

### Get AI Hint
```http
POST /v1/ai/hints
Authorization: Bearer <token>
Content-Type: application/json

{
  "questionId": "q_789",
  "currentHintLevel": 0,
  "studentAnswer": "42"
}

Response 200:
{
  "data": {
    "hintLevel": 1,
    "hint": "Think about what happens when you substitute the values into the formula. What is the coefficient of x?",
    "xpPenalty": 25,
    "remainingHints": 2,
    "isLastHint": false
  }
}
```

---

## Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `AUTH_REQUIRED` | 401 | No valid auth token |
| `FORBIDDEN` | 403 | Insufficient permissions |
| `NOT_FOUND` | 404 | Resource not found |
| `TOPIC_LOCKED` | 403 | Prerequisites not met |
| `QUIZ_MAX_ATTEMPTS` | 429 | Max attempts reached |
| `AI_RATE_LIMITED` | 429 | AI quota exceeded |
| `STREAK_ALREADY_FROZEN` | 400 | Freeze already used today |
| `CLASSROOM_FULL` | 400 | Max students reached |
| `INVALID_JOIN_CODE` | 400 | Classroom code invalid |
| `SUBSCRIPTION_REQUIRED` | 402 | Feature requires paid plan |
| `VALIDATION_ERROR` | 422 | Request validation failed |
| `INTERNAL_ERROR` | 500 | Server error |
