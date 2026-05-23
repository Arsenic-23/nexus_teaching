'use client';

import { useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { MCQQuestion } from '@/components/learning/quiz/mcq-question';
import { TrueFalseQuestion } from '@/components/learning/quiz/true-false-question';
import { QuizProgress } from '@/components/learning/quiz/quiz-progress';
import { QuizResults } from '@/components/learning/quiz/quiz-results';
import { ExplanationPanel } from '@/components/learning/quiz/explanation-panel';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface QuizPageProps {
 params: Promise<{
 subjectId: string;
 topicId: string;
 }>;
}

type QuestionResult = 'correct' | 'incorrect' | 'unanswered';

interface Question {
 id: string;
 type: 'mcq' | 'true_false';
 question: string;
 points: number;
 explanation: string;
 correctAnswer: string | boolean;
 choices?: Array<{ id: string; text: string }>;
}

const mockQuestions: Question[] = [
 {
 id: 'q1',
 type: 'mcq',
 question: 'Solve 2x² - 8x + 6 = 0 using the quadratic formula.',
 points: 20,
 explanation: 'With a=2, b=-8, c=6: discriminant = 64 - 48 = 16. x = (8 ± 4)/4, giving x = 3 or x = 1.',
 correctAnswer: 'c',
 choices: [
 { id: 'a', text: 'x = 2 and x = 4' },
 { id: 'b', text: 'x = -1 and x = -3' },
 { id: 'c', text: 'x = 3 and x = 1' },
 { id: 'd', text: 'x = 6 and x = 0.5' },
 ],
 },
 {
 id: 'q2',
 type: 'true_false',
 question: 'If the discriminant (b² - 4ac) is negative, the quadratic equation has two real solutions.',
 points: 20,
 explanation: 'FALSE. When the discriminant is negative, we take the square root of a negative number, which gives complex (non-real) solutions. Zero discriminant gives one solution; positive gives two.',
 correctAnswer: false,
 },
 {
 id: 'q3',
 type: 'mcq',
 question: 'What is the discriminant of the equation 3x² + 6x + 3 = 0?',
 points: 20,
 explanation: 'Discriminant = b² - 4ac = 6² - 4(3)(3) = 36 - 36 = 0. Since discriminant = 0, there is exactly one real solution.',
 correctAnswer: 'b',
 choices: [
 { id: 'a', text: '36' },
 { id: 'b', text: '0' },
 { id: 'c', text: '-36' },
 { id: 'd', text: '12' },
 ],
 },
 {
 id: 'q4',
 type: 'mcq',
 question: 'Which equation is equivalent to x² + 4x - 5 = 0 in completed square form?',
 points: 20,
 explanation: 'Complete the square: x² + 4x + 4 = 5 + 4, so (x + 2)² = 9, giving x = 1 or x = -5.',
 correctAnswer: 'a',
 choices: [
 { id: 'a', text: '(x + 2)² = 9' },
 { id: 'b', text: '(x + 2)² = 5' },
 { id: 'c', text: '(x - 2)² = 9' },
 { id: 'd', text: '(x + 4)² = 21' },
 ],
 },
 {
 id: 'q5',
 type: 'true_false',
 question: 'The quadratic formula can be used to solve ANY quadratic equation, even those that cannot be factored easily.',
 points: 20,
 explanation: 'TRUE! This is the power of the quadratic formula — it always works, regardless of whether the equation can be factored nicely. This makes it one of the most universally useful formulas in algebra.',
 correctAnswer: true,
 },
];

export default function QuizPage({ params }: QuizPageProps) {
 const resolvedParams = use(params);
 const router = useRouter();
 const [currentIndex, setCurrentIndex] = useState(0);
 const [answers, setAnswers] = useState<Record<string, string | boolean>>({});
 const [showResult, setShowResult] = useState(false);
 const [questionResults, setQuestionResults] = useState<QuestionResult[]>([]);
 const [quizDone, setQuizDone] = useState(false);

 const currentQuestion = mockQuestions[currentIndex];
 const hasAnswered = answers[currentQuestion?.id] !== undefined;
 const isLastQuestion = currentIndex === mockQuestions.length - 1;

 const handleAnswer = (qId: string, answer: string | boolean) => {
 if (answers[qId] !== undefined) return; // prevent re-answering
 setAnswers((prev) => ({ ...prev, [qId]: answer }));
 setShowResult(true);

 const question = mockQuestions.find((q) => q.id === qId);
 const isCorrect = answer === question?.correctAnswer;
 const newResults = [...questionResults];
 newResults[currentIndex] = isCorrect ? 'correct' : 'incorrect';
 setQuestionResults(newResults);
 };

 const handleNext = () => {
 setShowResult(false);
 if (isLastQuestion) {
 setQuizDone(true);
 } else {
 setCurrentIndex((i) => i + 1);
 }
 };

 const correctCount = questionResults.filter((r) => r === 'correct').length;
 const totalXp = mockQuestions.reduce((sum, q) => sum + q.points, 0);
 const earnedXp = questionResults.reduce((sum, r, i) => r === 'correct' ? sum + mockQuestions[i].points : sum, 0);

 if (quizDone) {
 return (
 <div className="max-w-lg mx-auto py-8 animate-fade-in">
 <QuizResults
 score={correctCount}
 total={mockQuestions.length}
 xpEarned={earnedXp}
 results={mockQuestions.map((q, i) => ({
 questionId: q.id,
 question: q.question,
 correct: questionResults[i] === 'correct',
 }))}
 onRetry={() => {
 setCurrentIndex(0);
 setAnswers({});
 setShowResult(false);
 setQuestionResults([]);
 setQuizDone(false);
 }}
 nextHref={`/student/learn/${resolvedParams.subjectId}/${resolvedParams.topicId}`}
 nextLabel="Back to Topic"
 />
 </div>
 );
 }

 return (
 <div className="flex flex-col min-h-screen bg-gradient-page">
 {/* Top bar */}
 <div className="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur-sm px-4 py-3">
 <div className="max-w-2xl mx-auto flex items-center gap-4">
 <Link href={`/student/learn/${resolvedParams.subjectId}/${resolvedParams.topicId}`}>
 <Button size="icon-sm" variant="ghost">
 <X className="w-4 h-4" />
 </Button>
 </Link>

 <div className="flex-1">
 <Progress value={((currentIndex) / mockQuestions.length) * 100} className="h-2" />
 </div>

 <Badge variant="xp" className="shrink-0">
 {earnedXp}/{totalXp} XP
 </Badge>
 </div>
 </div>

 {/* Quiz content */}
 <div className="flex-1 flex flex-col items-center justify-start py-8 px-4">
 <div className="w-full max-w-2xl space-y-6">
 {/* Progress dots */}
 <QuizProgress
 total={mockQuestions.length}
 current={currentIndex}
 results={questionResults}
 />

 {/* Question */}
 <AnimatePresence mode="wait">
 <motion.div
 key={currentQuestion.id}
 initial={{ opacity: 0, x: 20 }}
 animate={{ opacity: 1, x: 0 }}
 exit={{ opacity: 0, x: -20 }}
 transition={{ duration: 0.25 }}
 className="space-y-4"
 >
 <div className="p-6 rounded-xl border border-border bg-card">
 {currentQuestion.type === 'mcq' && currentQuestion.choices && (
 <MCQQuestion
 question={currentQuestion.question}
 choices={currentQuestion.choices}
 selectedId={answers[currentQuestion.id] as string | null}
 correctId={currentQuestion.correctAnswer as string}
 onSelect={(id) => handleAnswer(currentQuestion.id, id)}
 showResult={showResult}
 />
 )}

 {currentQuestion.type === 'true_false' && (
 <TrueFalseQuestion
 question={currentQuestion.question}
 correctAnswer={currentQuestion.correctAnswer as boolean}
 selectedAnswer={answers[currentQuestion.id] as boolean | null}
 onSelect={(v) => handleAnswer(currentQuestion.id, v)}
 showResult={showResult}
 />
 )}
 </div>

 {/* Explanation */}
 <AnimatePresence>
 {showResult && (
 <ExplanationPanel
 correct={answers[currentQuestion.id] === currentQuestion.correctAnswer}
 explanation={currentQuestion.explanation}
 />
 )}
 </AnimatePresence>
 </motion.div>
 </AnimatePresence>

 {/* Next button */}
 {hasAnswered && (
 <motion.div
 initial={{ opacity: 0, y: 10 }}
 animate={{ opacity: 1, y: 0 }}
 className="flex justify-end"
 >
 <Button onClick={handleNext} className="gap-2">
 {isLastQuestion ? 'See Results' : 'Next Question'}
 <ChevronRight className="w-4 h-4" />
 </Button>
 </motion.div>
 )}
 </div>
 </div>
 </div>
 );
}
