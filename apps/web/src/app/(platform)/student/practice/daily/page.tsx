'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Zap, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { MCQQuestion } from '@/components/learning/quiz/mcq-question';
import { TrueFalseQuestion } from '@/components/learning/quiz/true-false-question';
import { ExplanationPanel } from '@/components/learning/quiz/explanation-panel';
import { QuizResults } from '@/components/learning/quiz/quiz-results';
import Link from 'next/link';

const dailyQuestions = [
  {
    id: 'dq1', type: 'mcq' as const,
    question: 'Simplify: (3x² + 5x - 2) ÷ (x + 2)',
    choices: [
      { id: 'a', text: '3x - 1' },
      { id: 'b', text: '3x + 1' },
      { id: 'c', text: '3x² - 1' },
      { id: 'd', text: 'x + 3' },
    ],
    correctAnswer: 'a',
    explanation: 'Using polynomial long division: 3x² + 5x - 2 = (x + 2)(3x - 1). So dividing by (x + 2) gives 3x - 1.',
    xpReward: 15,
  },
  {
    id: 'dq2', type: 'true_false' as const,
    question: 'The product of two negative numbers is always positive.',
    correctAnswer: true,
    explanation: 'TRUE. When multiplying two negative numbers, the negatives cancel out: (-a) × (-b) = +ab.',
    xpReward: 10,
  },
  {
    id: 'dq3', type: 'mcq' as const,
    question: 'If f(x) = 2x + 3, what is f(f(2))?',
    choices: [
      { id: 'a', text: '10' },
      { id: 'b', text: '17' },
      { id: 'c', text: '14' },
      { id: 'd', text: '21' },
    ],
    correctAnswer: 'b',
    explanation: 'f(2) = 2(2) + 3 = 7. Then f(f(2)) = f(7) = 2(7) + 3 = 17.',
    xpReward: 15,
  },
];

export default function DailyPracticePage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | boolean>>({});
  const [showResult, setShowResult] = useState(false);
  const [results, setResults] = useState<Array<'correct' | 'incorrect'>>([]);
  const [done, setDone] = useState(false);

  const question = dailyQuestions[currentIndex];
  const hasAnswered = answers[question?.id] !== undefined;

  const handleAnswer = (qId: string, answer: string | boolean) => {
    if (answers[qId] !== undefined) return;
    setAnswers((prev) => ({ ...prev, [qId]: answer }));
    setShowResult(true);
    const q = dailyQuestions.find((q) => q.id === qId);
    const correct = answer === q?.correctAnswer;
    setResults((prev) => [...prev, correct ? 'correct' : 'incorrect']);
  };

  const handleNext = () => {
    setShowResult(false);
    if (currentIndex >= dailyQuestions.length - 1) setDone(true);
    else setCurrentIndex((i) => i + 1);
  };

  const correctCount = results.filter((r) => r === 'correct').length;
  const xpEarned = results.reduce((sum, r, i) => r === 'correct' ? sum + dailyQuestions[i].xpReward : sum, 0);

  if (done) {
    return (
      <div className="max-w-lg mx-auto py-8">
        <QuizResults
          score={correctCount}
          total={dailyQuestions.length}
          xpEarned={xpEarned}
          results={dailyQuestions.map((q, i) => ({ questionId: q.id, question: q.question, correct: results[i] === 'correct' }))}
          onRetry={() => { setCurrentIndex(0); setAnswers({}); setShowResult(false); setResults([]); setDone(false); }}
          nextHref="/student/practice"
          nextLabel="Back to Practice"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Top bar */}
      <div className="flex items-center gap-4 mb-6">
        <Link href="/student/practice">
          <Button size="icon-sm" variant="ghost"><X className="w-4 h-4" /></Button>
        </Link>
        <div className="flex-1">
          <Progress value={(currentIndex / dailyQuestions.length) * 100} className="h-2" />
        </div>
        <div className="flex items-center gap-1 text-sm font-bold text-brand">
          <Zap className="w-4 h-4" />{xpEarned} XP
        </div>
      </div>

      <div className="max-w-2xl mx-auto w-full space-y-4">
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="text-xs">
            <Target className="w-3 h-3 mr-1" />
            Daily Practice — {currentIndex + 1}/{dailyQuestions.length}
          </Badge>
          <Badge variant="xp" className="text-xs">+{question?.xpReward} XP</Badge>
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={question?.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <div className="p-6 rounded-2xl border border-border bg-card/50">
              {question?.type === 'mcq' && question.choices && (
                <MCQQuestion question={question.question} choices={question.choices} selectedId={answers[question.id] as string} correctId={question.correctAnswer as string} onSelect={(id) => handleAnswer(question.id, id)} showResult={showResult} />
              )}
              {question?.type === 'true_false' && (
                <TrueFalseQuestion question={question.question} correctAnswer={question.correctAnswer as boolean} selectedAnswer={answers[question.id] as boolean} onSelect={(v) => handleAnswer(question.id, v)} showResult={showResult} />
              )}
            </div>
            {showResult && <ExplanationPanel correct={answers[question.id] === question.correctAnswer} explanation={question.explanation} className="mt-4" />}
          </motion.div>
        </AnimatePresence>

        {hasAnswered && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-end">
            <Button onClick={handleNext} className="gap-2">
              {currentIndex >= dailyQuestions.length - 1 ? 'Finish' : 'Next'}
              <ChevronRight className="w-4 h-4" />
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
