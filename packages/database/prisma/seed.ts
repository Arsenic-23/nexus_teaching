import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // ==================== Ranks ====================
  console.log('Creating ranks...');
  const ranks = [
    { name: 'Bronze I', tier: 'BRONZE' as const, division: 1, minXp: 0, maxXp: 599, color: '#cd7f32', glowColor: 'rgba(205,127,50,0.3)', order: 1 },
    { name: 'Bronze II', tier: 'BRONZE' as const, division: 2, minXp: 600, maxXp: 1199, color: '#cd7f32', glowColor: 'rgba(205,127,50,0.3)', order: 2 },
    { name: 'Bronze III', tier: 'BRONZE' as const, division: 3, minXp: 1200, maxXp: 1999, color: '#cd7f32', glowColor: 'rgba(205,127,50,0.3)', order: 3 },
    { name: 'Silver I', tier: 'SILVER' as const, division: 1, minXp: 2000, maxXp: 3499, color: '#c0c0c0', glowColor: 'rgba(192,192,192,0.3)', order: 4 },
    { name: 'Silver II', tier: 'SILVER' as const, division: 2, minXp: 3500, maxXp: 4999, color: '#c0c0c0', glowColor: 'rgba(192,192,192,0.3)', order: 5 },
    { name: 'Silver III', tier: 'SILVER' as const, division: 3, minXp: 5000, maxXp: 6999, color: '#c0c0c0', glowColor: 'rgba(192,192,192,0.3)', order: 6 },
    { name: 'Gold I', tier: 'GOLD' as const, division: 1, minXp: 7000, maxXp: 8999, color: '#ffd700', glowColor: 'rgba(255,215,0,0.3)', order: 7 },
    { name: 'Gold II', tier: 'GOLD' as const, division: 2, minXp: 9000, maxXp: 11999, color: '#ffd700', glowColor: 'rgba(255,215,0,0.3)', order: 8 },
    { name: 'Gold III', tier: 'GOLD' as const, division: 3, minXp: 12000, maxXp: 15999, color: '#ffd700', glowColor: 'rgba(255,215,0,0.3)', order: 9 },
    { name: 'Platinum I', tier: 'PLATINUM' as const, division: 1, minXp: 16000, maxXp: 19999, color: '#e5e4e2', glowColor: 'rgba(229,228,226,0.3)', order: 10 },
    { name: 'Platinum II', tier: 'PLATINUM' as const, division: 2, minXp: 20000, maxXp: 24999, color: '#e5e4e2', glowColor: 'rgba(229,228,226,0.3)', order: 11 },
    { name: 'Platinum III', tier: 'PLATINUM' as const, division: 3, minXp: 25000, maxXp: 29999, color: '#e5e4e2', glowColor: 'rgba(229,228,226,0.3)', order: 12 },
    { name: 'Diamond I', tier: 'DIAMOND' as const, division: 1, minXp: 30000, maxXp: 34999, color: '#b9f2ff', glowColor: 'rgba(185,242,255,0.3)', order: 13 },
    { name: 'Diamond II', tier: 'DIAMOND' as const, division: 2, minXp: 35000, maxXp: 39999, color: '#b9f2ff', glowColor: 'rgba(185,242,255,0.3)', order: 14 },
    { name: 'Diamond III', tier: 'DIAMOND' as const, division: 3, minXp: 40000, maxXp: 49999, color: '#b9f2ff', glowColor: 'rgba(185,242,255,0.3)', order: 15 },
    { name: 'Master', tier: 'MASTER' as const, division: 1, minXp: 50000, maxXp: 9999999, color: '#ff6b35', glowColor: 'rgba(255,107,53,0.3)', order: 16 },
  ];

  for (const rank of ranks) {
    await prisma.rank.upsert({
      where: { order: rank.order },
      update: rank,
      create: rank,
    });
  }

  // ==================== Achievements ====================
  console.log('Creating achievements...');
  const achievements = [
    { name: 'First Steps', slug: 'first-steps', description: 'Complete your first lesson', category: 'LEARNING' as const, xpReward: 25, rarity: 'COMMON' as const, criteria: { type: 'lessons_completed', threshold: 1 } },
    { name: 'Quick Learner', slug: 'quick-learner', description: 'Complete 10 lessons', category: 'LEARNING' as const, xpReward: 50, rarity: 'COMMON' as const, criteria: { type: 'lessons_completed', threshold: 10 } },
    { name: 'Scholar', slug: 'scholar', description: 'Complete 50 lessons', category: 'LEARNING' as const, xpReward: 100, rarity: 'UNCOMMON' as const, criteria: { type: 'lessons_completed', threshold: 50 } },
    { name: 'Apprentice', slug: 'apprentice', description: 'Master your first topic', category: 'MASTERY' as const, xpReward: 75, rarity: 'COMMON' as const, criteria: { type: 'topics_mastered', threshold: 1 } },
    { name: 'Specialist', slug: 'specialist', description: 'Master 5 topics', category: 'MASTERY' as const, xpReward: 150, rarity: 'UNCOMMON' as const, criteria: { type: 'topics_mastered', threshold: 5 } },
    { name: 'Getting Started', slug: 'getting-started', description: 'Maintain a 3-day streak', category: 'STREAK' as const, xpReward: 25, rarity: 'COMMON' as const, criteria: { type: 'streak_days', threshold: 3 } },
    { name: 'Committed', slug: 'committed', description: 'Maintain a 7-day streak', category: 'STREAK' as const, xpReward: 50, rarity: 'COMMON' as const, criteria: { type: 'streak_days', threshold: 7 } },
    { name: 'Dedicated', slug: 'dedicated', description: 'Maintain a 30-day streak', category: 'STREAK' as const, xpReward: 200, rarity: 'UNCOMMON' as const, criteria: { type: 'streak_days', threshold: 30 } },
    { name: 'Boss Slayer', slug: 'boss-slayer', description: 'Win your first boss battle', category: 'CHALLENGE' as const, xpReward: 75, rarity: 'COMMON' as const, criteria: { type: 'boss_battles_won', threshold: 1 } },
    { name: 'Rising Star', slug: 'rising-star', description: 'Reach Silver rank', category: 'MILESTONE' as const, xpReward: 100, rarity: 'UNCOMMON' as const, criteria: { type: 'rank_tier', tier: 'SILVER' } },
  ];

  for (const achievement of achievements) {
    await prisma.achievement.upsert({
      where: { slug: achievement.slug },
      update: achievement,
      create: achievement,
    });
  }

  // ==================== Daily Quest Templates ====================
  console.log('Creating daily quests...');
  const quests = [
    { title: 'Complete 2 lessons', description: 'Learn something new today', type: 'COMPLETE_LESSONS' as const, targetValue: 2, xpReward: 25 },
    { title: 'Practice 10 problems', description: 'Keep your skills sharp', type: 'PASS_QUIZZES' as const, targetValue: 10, xpReward: 25 },
    { title: 'Review 3 topics', description: 'Reinforce your memory', type: 'REVIEW_TOPICS' as const, targetValue: 3, xpReward: 30 },
    { title: 'Maintain your streak', description: 'Keep the fire burning', type: 'MAINTAIN_STREAK' as const, targetValue: 1, xpReward: 15 },
    { title: 'Score perfectly', description: 'Get 100% on any quiz', type: 'PERFECT_SCORE' as const, targetValue: 1, xpReward: 40 },
    { title: 'Defeat a boss', description: 'Challenge yourself to a boss battle', type: 'DEFEAT_BOSS' as const, targetValue: 1, xpReward: 50 },
    { title: 'Earn 100 XP', description: 'Keep learning to earn XP', type: 'EARN_XP' as const, targetValue: 100, xpReward: 20 },
    { title: 'Ask the AI Tutor', description: 'Get help from your AI tutor', type: 'USE_AI_TUTOR' as const, targetValue: 1, xpReward: 15 },
  ];

  for (const quest of quests) {
    const existing = await prisma.dailyQuest.findFirst({ where: { title: quest.title } });
    if (!existing) {
      await prisma.dailyQuest.create({ data: quest });
    }
  }

  // ==================== Mathematics Subject ====================
  console.log('Creating Mathematics curriculum...');
  const math = await prisma.subject.upsert({
    where: { slug: 'mathematics' },
    update: {},
    create: {
      name: 'Mathematics',
      slug: 'mathematics',
      description: 'Master mathematical concepts from foundations to calculus',
      color: '#3b82f6',
      order: 1,
    },
  });

  // Topics for Mathematics MVP
  const mathTopics = [
    { name: 'Number Foundations', slug: 'number-foundations', difficulty: 'BEGINNER' as const, order: 1, treeX: 300, treeY: 800, estimatedTime: 60 },
    { name: 'Pre-Algebra', slug: 'pre-algebra', difficulty: 'BEGINNER' as const, order: 2, treeX: 300, treeY: 650, estimatedTime: 90 },
    { name: 'Algebra I', slug: 'algebra-1', difficulty: 'INTERMEDIATE' as const, order: 3, treeX: 300, treeY: 500, estimatedTime: 120 },
    { name: 'Linear Functions', slug: 'linear-functions', difficulty: 'INTERMEDIATE' as const, order: 4, treeX: 150, treeY: 350, estimatedTime: 90 },
    { name: 'Quadratic Equations', slug: 'quadratic-equations', difficulty: 'INTERMEDIATE' as const, order: 5, treeX: 450, treeY: 350, estimatedTime: 120 },
    { name: 'Geometry', slug: 'geometry', difficulty: 'INTERMEDIATE' as const, order: 6, treeX: 150, treeY: 200, estimatedTime: 120 },
    { name: 'Algebra II', slug: 'algebra-2', difficulty: 'ADVANCED' as const, order: 7, treeX: 450, treeY: 200, estimatedTime: 150 },
  ];

  const createdTopics: Record<string, string> = {};
  for (const topic of mathTopics) {
    const created = await prisma.topic.upsert({
      where: { subjectId_slug: { subjectId: math.id, slug: topic.slug } },
      update: {},
      create: { ...topic, subjectId: math.id },
    });
    createdTopics[topic.slug] = created.id;
  }

  // Prerequisites
  const prerequisites = [
    { topic: 'pre-algebra', prereq: 'number-foundations', requiredMastery: 0.6 },
    { topic: 'algebra-1', prereq: 'pre-algebra', requiredMastery: 0.65 },
    { topic: 'linear-functions', prereq: 'algebra-1', requiredMastery: 0.6 },
    { topic: 'quadratic-equations', prereq: 'algebra-1', requiredMastery: 0.6 },
    { topic: 'geometry', prereq: 'linear-functions', requiredMastery: 0.5 },
    { topic: 'algebra-2', prereq: 'quadratic-equations', requiredMastery: 0.7 },
  ];

  for (const prereq of prerequisites) {
    const topicId = createdTopics[prereq.topic];
    const prereqId = createdTopics[prereq.prereq];
    if (topicId && prereqId) {
      await prisma.topicPrerequisite.upsert({
        where: { topicId_prerequisiteId: { topicId, prerequisiteId: prereqId } },
        update: {},
        create: { topicId, prerequisiteId: prereqId, requiredMastery: prereq.requiredMastery },
      });
    }
  }

  // ==================== Sample Lesson: Quadratic Formula ====================
  console.log('Creating sample lesson: The Quadratic Formula...');
  const quadraticTopicId = createdTopics['quadratic-equations'];
  if (quadraticTopicId) {
    const lesson = await prisma.lesson.upsert({
      where: { topicId_slug: { topicId: quadraticTopicId, slug: 'quadratic-formula' } },
      update: {},
      create: {
        topicId: quadraticTopicId,
        title: 'The Quadratic Formula',
        slug: 'quadratic-formula',
        description: 'Learn to solve any quadratic equation using the quadratic formula',
        type: 'INTERACTIVE',
        difficulty: 'INTERMEDIATE',
        xpReward: 60,
        estimatedTime: 15,
      },
    });

    const steps = [
      {
        order: 1,
        type: 'EXPLANATION' as const,
        content: {
          title: 'Not every quadratic can be factored',
          body: 'We have seen that some quadratic equations can be solved by factoring. But what about equations like $x^2 + 3x - 7 = 0$? These do not factor neatly.\n\nWe need a universal method that works for ALL quadratic equations.',
          callouts: [{ type: 'insight', text: 'The quadratic formula works for every quadratic equation, even ones that cannot be factored.' }],
        },
        xpReward: 0,
      },
      {
        order: 2,
        type: 'CHECKPOINT' as const,
        interactionType: 'MULTIPLE_CHOICE' as const,
        content: {
          question: 'Can the equation $x^2 + 3x - 7 = 0$ be easily factored?',
          isBlocking: false,
        },
        correctAnswer: 'c',
        hints: ['Think about factor pairs of -7'],
        explanation: 'We need factors of -7 that add to 3. The factor pairs are (1,-7) and (-1,7). Neither sums to 3.',
        xpReward: 10,
      },
      {
        order: 3,
        type: 'EXPLANATION' as const,
        content: {
          title: 'The Quadratic Formula',
          body: '## Deriving the Formula\n\nStarting from $ax^2 + bx + c = 0$, we can use completing the square to derive:\n\n$$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$$\n\nThis is the **Quadratic Formula**.',
        },
        xpReward: 0,
      },
      {
        order: 4,
        type: 'INTERACTIVE' as const,
        interactionType: 'NUMERIC_INPUT' as const,
        content: {
          prompt: 'For the equation $x^2 + 5x + 6 = 0$, what is the value of the discriminant $b^2 - 4ac$?',
        },
        correctAnswer: 1,
        hints: ['Substitute: $5^2 - 4(1)(6)$', '$25 - 24 = ?$'],
        explanation: '$b^2 - 4ac = 5^2 - 4(1)(6) = 25 - 24 = 1$',
        xpReward: 15,
      },
      {
        order: 5,
        type: 'INTERACTIVE' as const,
        interactionType: 'MULTIPLE_CHOICE' as const,
        content: {
          prompt: 'Using the quadratic formula for $x^2 + 5x + 6 = 0$, what are the solutions?',
        },
        correctAnswer: 'a',
        hints: ['$x = \\frac{-5 \\pm \\sqrt{1}}{2} = \\frac{-5 \\pm 1}{2}$'],
        explanation: '$x = \\frac{-5 + 1}{2} = -2$ or $x = \\frac{-5 - 1}{2} = -3$',
        xpReward: 20,
      },
      {
        order: 6,
        type: 'SUMMARY' as const,
        content: {
          body: '## Key Takeaways\n\n1. The quadratic formula $x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$ solves ANY quadratic\n2. First identify a, b, c from standard form\n3. Calculate the discriminant $b^2 - 4ac$\n4. Substitute and solve\n5. The ± gives two solutions',
        },
        xpReward: 0,
      },
    ];

    for (const step of steps) {
      await prisma.lessonStep.upsert({
        where: { lessonId_order: { lessonId: lesson.id, order: step.order } },
        update: {},
        create: { ...step, lessonId: lesson.id },
      });
    }

    // ==================== Sample Quiz ====================
    const quiz = await prisma.quiz.upsert({
      where: { topicId_slug: { topicId: quadraticTopicId, slug: 'quadratic-mastery-check' } },
      update: {},
      create: {
        topicId: quadraticTopicId,
        title: 'Quadratic Equations Mastery Check',
        slug: 'quadratic-mastery-check',
        type: 'MASTERY_CHECK',
        difficulty: 'INTERMEDIATE',
        passingScore: 0.7,
        xpReward: 100,
      },
    });

    const questions = [
      {
        stem: 'What is the quadratic formula?',
        type: 'MULTIPLE_CHOICE' as const,
        options: [
          { id: 'a', label: 'A', content: '$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$' },
          { id: 'b', label: 'B', content: '$x = \\frac{b \\pm \\sqrt{b^2 - 4ac}}{2a}$' },
          { id: 'c', label: 'C', content: '$x = \\frac{-b \\pm \\sqrt{b^2 + 4ac}}{2a}$' },
          { id: 'd', label: 'D', content: '$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{a}$' },
        ],
        correctAnswer: 'a',
        explanation: 'The quadratic formula is $x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$',
        points: 10,
        bloomsLevel: 'REMEMBER' as const,
      },
      {
        stem: 'Solve $x^2 - 5x + 6 = 0$ using the quadratic formula.',
        type: 'MULTIPLE_CHOICE' as const,
        options: [
          { id: 'a', label: 'A', content: 'x = 2 and x = 3' },
          { id: 'b', label: 'B', content: 'x = -2 and x = -3' },
          { id: 'c', label: 'C', content: 'x = 1 and x = 6' },
          { id: 'd', label: 'D', content: 'x = 5 and x = 1' },
        ],
        correctAnswer: 'a',
        explanation: 'Using the formula: $x = \\frac{5 \\pm \\sqrt{25-24}}{2} = \\frac{5 \\pm 1}{2}$, so x = 3 or x = 2',
        points: 10,
        bloomsLevel: 'APPLY' as const,
      },
      {
        stem: 'For the equation $2x^2 + 3x - 2 = 0$, what is the discriminant?',
        type: 'NUMERIC_INPUT' as const,
        correctAnswer: 25,
        explanation: '$b^2 - 4ac = 9 - 4(2)(-2) = 9 + 16 = 25$',
        points: 10,
        bloomsLevel: 'APPLY' as const,
      },
    ];

    for (let i = 0; i < questions.length; i++) {
      const q = questions[i]!;
      const existingQ = await prisma.question.findFirst({
        where: { quizId: quiz.id, stem: q.stem },
      });
      if (!existingQ) {
        await prisma.question.create({
          data: { ...q, quizId: quiz.id, topicId: quadraticTopicId, conceptTags: ['quadratic-formula'], difficulty: 'INTERMEDIATE' },
        });
      }
    }
  }

  console.log('✅ Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
