'use client';

import { useRouter } from 'next/navigation';
import { LessonPlayer } from '@/components/learning/lesson-player/lesson-player';
import { ExplanationBlock } from '@/components/learning/lesson-player/explanation-block';
import { InteractiveBlock } from '@/components/learning/lesson-player/interactive-block';
import { SummaryBlock } from '@/components/learning/lesson-player/summary-block';
import { MCQQuestion } from '@/components/learning/quiz/mcq-question';
import { useState, use } from 'react';

interface LessonPageProps {
 params: Promise<{
 subjectId: string;
 topicId: string;
 lessonId: string;
 }>;
}

// Mock lesson content
const mockLesson = {
 title: 'The Quadratic Formula',
 topic: 'Quadratic Equations',
 xpReward: 75,
 steps: [
 {
 id: 'intro',
 type: 'explanation' as const,
 title: 'What is the Quadratic Formula?',
 content: (
 <ExplanationBlock
 title="The Quadratic Formula"
 content="The quadratic formula is one of the most powerful tools in algebra. It lets us find the solutions (roots) of ANY quadratic equation of the form ax² + bx + c = 0, even when factoring doesn't work easily."
 formula="x = (-b ± √(b² - 4ac)) / 2a"
 callouts={[
 {
 type: 'info',
 title: 'Key Insight',
 content: 'This formula works for every quadratic equation — it always gives you the answer!',
 },
 {
 type: 'definition',
 title: 'Coefficients',
 content: 'a is the coefficient of x², b is the coefficient of x, and c is the constant term.',
 },
 ]}
 />
 ),
 },
 {
 id: 'derivation',
 type: 'explanation' as const,
 title: 'Where Does It Come From?',
 content: (
 <ExplanationBlock
 title="Deriving the Formula"
 content={`The quadratic formula comes from completing the square on the general quadratic equation ax² + bx + c = 0.

Step 1: Divide everything by a
x² + (b/a)x + (c/a) = 0

Step 2: Move the constant to the right side
x² + (b/a)x = -c/a

Step 3: Complete the square
x² + (b/a)x + (b/2a)² = -c/a + (b/2a)²

Step 4: Simplify and solve
(x + b/2a)² = (b² - 4ac)/4a²

Taking the square root of both sides gives us the quadratic formula!`}
 callouts={[
 {
 type: 'tip',
 title: 'Remember',
 content: 'The ± sign means there are two possible solutions — one with + and one with −.',
 },
 ]}
 />
 ),
 },
 {
 id: 'practice',
 type: 'interactive' as const,
 title: 'Practice Problem',
 content: null, // Will be set with state
 },
 {
 id: 'summary',
 type: 'summary' as const,
 title: 'Summary',
 content: (
 <SummaryBlock
 title="Lesson Complete! 🎉"
 summary="You've learned the quadratic formula and how to apply it to solve quadratic equations."
 keyPoints={[
 { text: 'The quadratic formula: x = (-b ± √(b² - 4ac)) / 2a', important: true },
 { text: 'It works for all quadratic equations ax² + bx + c = 0', important: false },
 { text: 'The ± gives two solutions (or one if the discriminant = 0)', important: false },
 { text: 'If b² - 4ac < 0, there are no real solutions', important: true },
 ]}
 xpEarned={75}
 nextLesson={{ title: 'The Discriminant', href: '/student/learn/mathematics/quadratic-equations/discriminant' }}
 quizHref="/student/learn/mathematics/quadratic-equations/quiz"
 />
 ),
 },
 ],
};

export default function LessonPage({ params }: LessonPageProps) {
 const resolvedParams = use(params);
 const router = useRouter();
 const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
 const [showResult, setShowResult] = useState(false);

 // Build the practice step with interactive content
 const practiceStep = {
 id: 'practice',
 type: 'interactive' as const,
 title: 'Practice Problem',
 content: (
 <InteractiveBlock
 title="Apply the Quadratic Formula"
 instruction="Solve: 2x² + 5x - 3 = 0"
 completed={showResult && selectedAnswer === 'b'}
 >
 <MCQQuestion
 question="Using the quadratic formula with a=2, b=5, c=-3, what are the solutions?"
 choices={[
 { id: 'a', text: 'x = 1 and x = -3' },
 { id: 'b', text: 'x = 1/2 and x = -3' },
 { id: 'c', text: 'x = -1/2 and x = 3' },
 { id: 'd', text: 'x = 2 and x = -1/3' },
 ]}
 selectedId={selectedAnswer}
 correctId="b"
 onSelect={(id) => {
 setSelectedAnswer(id);
 setShowResult(true);
 }}
 showResult={showResult}
 />
 </InteractiveBlock>
 ),
 };

 const steps = [
 mockLesson.steps[0],
 mockLesson.steps[1],
 practiceStep,
 mockLesson.steps[3],
 ];

 return (
 <LessonPlayer
 lesson={{ ...mockLesson, steps }}
 onComplete={() => router.push(`/student/learn/${resolvedParams.subjectId}/${resolvedParams.topicId}`)}
 onExit={() => router.push(`/student/learn/${resolvedParams.subjectId}/${resolvedParams.topicId}`)}
 />
 );
}
