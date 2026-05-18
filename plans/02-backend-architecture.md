# Backend Architecture — NestJS Modular Monolith

## Folder Structure

```
apps/api/
├── src/
│   ├── main.ts                        # Bootstrap
│   ├── app.module.ts                  # Root module
│   ├── common/                        # Shared utilities
│   │   ├── decorators/
│   │   │   ├── roles.decorator.ts
│   │   │   ├── current-user.decorator.ts
│   │   │   └── public.decorator.ts
│   │   ├── guards/
│   │   │   ├── auth.guard.ts
│   │   │   ├── roles.guard.ts
│   │   │   └── throttle.guard.ts
│   │   ├── interceptors/
│   │   │   ├── logging.interceptor.ts
│   │   │   ├── transform.interceptor.ts
│   │   │   └── timeout.interceptor.ts
│   │   ├── filters/
│   │   │   └── http-exception.filter.ts
│   │   ├── pipes/
│   │   │   └── validation.pipe.ts
│   │   ├── dto/
│   │   │   ├── pagination.dto.ts
│   │   │   └── response.dto.ts
│   │   ├── interfaces/
│   │   │   ├── request.interface.ts
│   │   │   └── pagination.interface.ts
│   │   └── utils/
│   │       ├── hash.util.ts
│   │       ├── date.util.ts
│   │       └── math.util.ts
│   ├── config/                        # Configuration
│   │   ├── config.module.ts
│   │   ├── database.config.ts
│   │   ├── redis.config.ts
│   │   ├── clerk.config.ts
│   │   ├── ai.config.ts
│   │   ├── storage.config.ts
│   │   └── app.config.ts
│   ├── modules/                       # Domain modules
│   │   ├── auth/                      # Authentication
│   │   │   ├── auth.module.ts
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── strategies/
│   │   │   │   └── clerk.strategy.ts
│   │   │   ├── guards/
│   │   │   │   └── clerk-auth.guard.ts
│   │   │   └── dto/
│   │   │       └── auth.dto.ts
│   │   ├── users/                     # User management
│   │   │   ├── users.module.ts
│   │   │   ├── users.controller.ts
│   │   │   ├── users.service.ts
│   │   │   ├── users.repository.ts
│   │   │   ├── dto/
│   │   │   │   ├── create-user.dto.ts
│   │   │   │   ├── update-user.dto.ts
│   │   │   │   └── user-profile.dto.ts
│   │   │   └── entities/
│   │   │       └── user.entity.ts
│   │   ├── learning/                  # Learning Engine
│   │   │   ├── learning.module.ts
│   │   │   ├── controllers/
│   │   │   │   ├── subjects.controller.ts
│   │   │   │   ├── topics.controller.ts
│   │   │   │   ├── lessons.controller.ts
│   │   │   │   ├── quizzes.controller.ts
│   │   │   │   └── exercises.controller.ts
│   │   │   ├── services/
│   │   │   │   ├── subjects.service.ts
│   │   │   │   ├── topics.service.ts
│   │   │   │   ├── lessons.service.ts
│   │   │   │   ├── quizzes.service.ts
│   │   │   │   ├── exercises.service.ts
│   │   │   │   ├── mastery.service.ts
│   │   │   │   └── prerequisites.service.ts
│   │   │   ├── repositories/
│   │   │   │   ├── subjects.repository.ts
│   │   │   │   ├── topics.repository.ts
│   │   │   │   ├── lessons.repository.ts
│   │   │   │   └── quizzes.repository.ts
│   │   │   ├── dto/
│   │   │   │   ├── lesson.dto.ts
│   │   │   │   ├── quiz-submission.dto.ts
│   │   │   │   └── progress.dto.ts
│   │   │   └── interfaces/
│   │   │       ├── lesson-content.interface.ts
│   │   │       └── question.interface.ts
│   │   ├── progression/               # Progression Engine
│   │   │   ├── progression.module.ts
│   │   │   ├── controllers/
│   │   │   │   ├── progress.controller.ts
│   │   │   │   ├── skill-tree.controller.ts
│   │   │   │   └── retention.controller.ts
│   │   │   ├── services/
│   │   │   │   ├── progress.service.ts
│   │   │   │   ├── skill-tree.service.ts
│   │   │   │   ├── retention.service.ts
│   │   │   │   ├── spaced-repetition.service.ts
│   │   │   │   └── weak-areas.service.ts
│   │   │   ├── algorithms/
│   │   │   │   ├── mastery-calculator.ts
│   │   │   │   ├── decay-calculator.ts
│   │   │   │   └── difficulty-adjuster.ts
│   │   │   └── dto/
│   │   │       └── progress.dto.ts
│   │   ├── gamification/              # Gamification Engine
│   │   │   ├── gamification.module.ts
│   │   │   ├── controllers/
│   │   │   │   ├── xp.controller.ts
│   │   │   │   ├── ranks.controller.ts
│   │   │   │   ├── streaks.controller.ts
│   │   │   │   ├── achievements.controller.ts
│   │   │   │   ├── leaderboard.controller.ts
│   │   │   │   └── quests.controller.ts
│   │   │   ├── services/
│   │   │   │   ├── xp.service.ts
│   │   │   │   ├── ranks.service.ts
│   │   │   │   ├── streaks.service.ts
│   │   │   │   ├── achievements.service.ts
│   │   │   │   ├── leaderboard.service.ts
│   │   │   │   ├── quests.service.ts
│   │   │   │   └── rewards.service.ts
│   │   │   ├── events/
│   │   │   │   ├── xp-gained.event.ts
│   │   │   │   ├── rank-up.event.ts
│   │   │   │   ├── achievement-unlocked.event.ts
│   │   │   │   └── streak-updated.event.ts
│   │   │   └── dto/
│   │   │       └── gamification.dto.ts
│   │   ├── ai/                        # AI Orchestration
│   │   │   ├── ai.module.ts
│   │   │   ├── controllers/
│   │   │   │   ├── tutor.controller.ts
│   │   │   │   ├── hints.controller.ts
│   │   │   │   └── recommendations.controller.ts
│   │   │   ├── services/
│   │   │   │   ├── ai-orchestrator.service.ts
│   │   │   │   ├── tutor.service.ts
│   │   │   │   ├── hints.service.ts
│   │   │   │   ├── misconception-detector.service.ts
│   │   │   │   ├── recommendation.service.ts
│   │   │   │   └── prompt-manager.service.ts
│   │   │   ├── providers/
│   │   │   │   ├── ai-provider.interface.ts
│   │   │   │   ├── openai.provider.ts
│   │   │   │   ├── anthropic.provider.ts
│   │   │   │   └── provider-factory.ts
│   │   │   ├── prompts/
│   │   │   │   ├── tutor-system.prompt.ts
│   │   │   │   ├── hint-generation.prompt.ts
│   │   │   │   ├── misconception.prompt.ts
│   │   │   │   └── explanation.prompt.ts
│   │   │   └── dto/
│   │   │       ├── tutor-message.dto.ts
│   │   │       └── hint-request.dto.ts
│   │   ├── classrooms/                # Classroom Module
│   │   │   ├── classrooms.module.ts
│   │   │   ├── controllers/
│   │   │   │   ├── classrooms.controller.ts
│   │   │   │   ├── assignments.controller.ts
│   │   │   │   ├── discussions.controller.ts
│   │   │   │   └── grades.controller.ts
│   │   │   ├── services/
│   │   │   │   ├── classrooms.service.ts
│   │   │   │   ├── assignments.service.ts
│   │   │   │   ├── discussions.service.ts
│   │   │   │   ├── grades.service.ts
│   │   │   │   └── enrollment.service.ts
│   │   │   └── dto/
│   │   │       ├── create-classroom.dto.ts
│   │   │       ├── create-assignment.dto.ts
│   │   │       └── grade.dto.ts
│   │   ├── analytics/                 # Analytics Module
│   │   │   ├── analytics.module.ts
│   │   │   ├── controllers/
│   │   │   │   ├── student-analytics.controller.ts
│   │   │   │   ├── teacher-analytics.controller.ts
│   │   │   │   └── admin-analytics.controller.ts
│   │   │   ├── services/
│   │   │   │   ├── student-analytics.service.ts
│   │   │   │   ├── class-analytics.service.ts
│   │   │   │   ├── school-analytics.service.ts
│   │   │   │   ├── engagement.service.ts
│   │   │   │   └── reporting.service.ts
│   │   │   └── dto/
│   │   │       └── analytics-query.dto.ts
│   │   ├── notifications/             # Notifications Module
│   │   │   ├── notifications.module.ts
│   │   │   ├── controllers/
│   │   │   │   └── notifications.controller.ts
│   │   │   ├── services/
│   │   │   │   ├── notifications.service.ts
│   │   │   │   ├── email.service.ts
│   │   │   │   └── push.service.ts
│   │   │   ├── processors/
│   │   │   │   └── notification.processor.ts
│   │   │   └── templates/
│   │   │       ├── streak-reminder.ts
│   │   │       ├── assignment-due.ts
│   │   │       └── achievement-unlocked.ts
│   │   ├── subscriptions/             # Subscription Module
│   │   │   ├── subscriptions.module.ts
│   │   │   ├── controllers/
│   │   │   │   ├── subscriptions.controller.ts
│   │   │   │   └── webhooks.controller.ts
│   │   │   ├── services/
│   │   │   │   ├── subscriptions.service.ts
│   │   │   │   ├── stripe.service.ts
│   │   │   │   └── plans.service.ts
│   │   │   └── dto/
│   │   │       └── subscription.dto.ts
│   │   └── content/                   # Content Management
│   │       ├── content.module.ts
│   │       ├── controllers/
│   │       │   ├── content.controller.ts
│   │       │   └── media.controller.ts
│   │       ├── services/
│   │       │   ├── content.service.ts
│   │       │   ├── media.service.ts
│   │       │   └── versioning.service.ts
│   │       └── dto/
│   │           ├── create-content.dto.ts
│   │           └── media-upload.dto.ts
│   ├── database/                      # Database
│   │   ├── prisma.module.ts
│   │   ├── prisma.service.ts
│   │   └── seeds/
│   │       ├── seed.ts
│   │       ├── subjects.seed.ts
│   │       ├── topics.seed.ts
│   │       └── lessons.seed.ts
│   ├── cache/                         # Redis Cache
│   │   ├── cache.module.ts
│   │   └── cache.service.ts
│   ├── queue/                         # Job Queue
│   │   ├── queue.module.ts
│   │   └── processors/
│   │       ├── xp-calculation.processor.ts
│   │       ├── streak-check.processor.ts
│   │       ├── retention-decay.processor.ts
│   │       ├── analytics-aggregation.processor.ts
│   │       └── notification.processor.ts
│   ├── websocket/                     # WebSocket
│   │   ├── websocket.module.ts
│   │   ├── websocket.gateway.ts
│   │   └── events/
│   │       ├── gamification.events.ts
│   │       ├── notification.events.ts
│   │       └── leaderboard.events.ts
│   └── health/                        # Health checks
│       ├── health.module.ts
│       └── health.controller.ts
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── test/
│   ├── e2e/
│   └── unit/
├── docker/
│   ├── Dockerfile
│   └── docker-compose.yml
├── nest-cli.json
├── tsconfig.json
└── package.json
```

---

## Module Dependency Graph

```mermaid
graph TD
    APP[App Module] --> AUTH[Auth]
    APP --> USERS[Users]
    APP --> LEARN[Learning]
    APP --> PROG[Progression]
    APP --> GAME[Gamification]
    APP --> AI[AI]
    APP --> CLASS[Classrooms]
    APP --> ANALYTICS[Analytics]
    APP --> NOTIF[Notifications]
    APP --> SUBS[Subscriptions]
    APP --> CMS[Content]
    APP --> WS[WebSocket]
    APP --> QUEUE[Queue]
    APP --> CACHE[Cache]
    APP --> DB[Database]

    LEARN --> DB
    LEARN --> CACHE
    LEARN --> PROG
    
    PROG --> DB
    PROG --> CACHE
    PROG --> GAME
    PROG --> AI
    
    GAME --> DB
    GAME --> CACHE
    GAME --> WS
    GAME --> QUEUE
    GAME --> NOTIF
    
    AI --> CACHE
    AI --> QUEUE
    
    CLASS --> DB
    CLASS --> USERS
    CLASS --> LEARN
    CLASS --> NOTIF
    
    ANALYTICS --> DB
    ANALYTICS --> CACHE
    ANALYTICS --> QUEUE
    
    NOTIF --> QUEUE
    NOTIF --> WS
    
    SUBS --> DB
    SUBS --> USERS
