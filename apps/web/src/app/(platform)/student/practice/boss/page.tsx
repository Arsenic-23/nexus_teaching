'use client';

import { useState } from 'react';
import { BossBattleArena } from '@/components/learning/practice/boss-battle-arena';
import { MCQQuestion } from '@/components/learning/quiz/mcq-question';
import { ExplanationPanel } from '@/components/learning/quiz/explanation-panel';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const boss = {
  name: 'The Algebra Titan',
  emoji: '🦾',
  topic: 'Quadratic Equations',
  difficulty: 'medium' as const,
  xpReward: 200,
  description: 'The Algebra Titan challenges your mastery of quadratic equations. Defeat it by answering 5 questions correctly before losing all HP!',
};

const bossQuestions = [
  { id: 'b1', question: 'Factor: x² + 5x + 6', choices: [{ id: 'a', text: '(x+2)(x+3)' }, { id: 'b', text: '(x+1)(x+6)' }, { id: 'c', text: '(x+2)(x+4)' }, { id: 'd', text: '(x-2)(x-3)' }], correctAnswer: 'a', explanation: 'We need factors of 6 that add to 5: that\'s 2 and 3. So (x+2)(x+3).' },
  { id: 'b2', question: 'Solve: x² - 9 = 0', choices: [{ id: 'a', text: 'x = ±3' }, { id: 'b', text: 'x = 3' }, { id: 'c', text: 'x = ±9' }, { id: 'd', text: 'x = ±√3' }], correctAnswer: 'a', explanation: 'x² = 9, so x = ±√9 = ±3.' },
  { id: 'b3', question: 'What is the vertex of y = x² - 4x + 3?', choices: [{ id: 'a', text: '(2, -1)' }, { id: 'b', text: '(-2, 3)' }, { id: 'c', text: '(2, 3)' }, { id: 'd', text: '(4, 3)' }], correctAnswer: 'a', explanation: 'Vertex x = -b/2a = 4/2 = 2. y = 4 - 8 + 3 = -1. Vertex is (2, -1).' },
  { id: 'b4', question: 'How many real roots does x² + 2x + 5 have?', choices: [{ id: 'a', text: 'None' }, { id: 'b', text: 'One' }, { id: 'c', text: 'Two' }, { id: 'd', text: 'Infinite' }], correctAnswer: 'a', explanation: 'Discriminant = 4 - 20 = -16 < 0, so no real roots.' },
  { id: 'b5', question: 'Solve: 2x² - 8 = 0', choices: [{ id: 'a', text: 'x = ±2' }, { id: 'b', text: 'x = ±4' }, { id: 'c', text: 'x = 2' }, { id: 'd', text: 'x = ±√8' }], correctAnswer: 'a', explanation: '2x² = 8, x² = 4, x = ±2.' },
];

const PLAYER_MAX_HP = 100;
const BOSS_MAX_HP = bossQuestions.length * 20;
const PLAYER_ATTACK = 20;
const BOSS_ATTACK = 20;

export default function BossPage() {
  const [phase, setPhase] = useState<'lobby' | 'battle' | 'victory' | 'defeat'>('lobby');
  const [bossHp, setBossHp] = useState(BOSS_MAX_HP);
  const [playerHp, setPlayerHp] = useState(PLAYER_MAX_HP);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResult, setShowResult] = useState(false);

  const currentQ = bossQuestions[questionIndex];

  const handleAnswer = (id: string) => {
    if (answers[currentQ.id]) return;
    setAnswers((prev) => ({ ...prev, [currentQ.id]: id }));
    setShowResult(true);
    const correct = id === currentQ.correctAnswer;
    if (correct) {
      const newBossHp = Math.max(bossHp - PLAYER_ATTACK, 0);
      setBossHp(newBossHp);
      if (newBossHp <= 0) setTimeout(() => setPhase('victory'), 600);
    } else {
      const newPlayerHp = Math.max(playerHp - BOSS_ATTACK, 0);
      setPlayerHp(newPlayerHp);
      if (newPlayerHp <= 0) setTimeout(() => setPhase('defeat'), 600);
    }
  };

  const handleNext = () => {
    setShowResult(false);
    if (questionIndex < bossQuestions.length - 1) setQuestionIndex((i) => i + 1);
  };

  const handleReset = () => {
    setPhase('lobby');
    setBossHp(BOSS_MAX_HP);
    setPlayerHp(PLAYER_MAX_HP);
    setQuestionIndex(0);
    setAnswers({});
    setShowResult(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-3">
        <Link href="/student/practice">
          <Button size="icon-sm" variant="ghost"><ArrowLeft className="w-4 h-4" /></Button>
        </Link>
        <div>
          <h1 className="text-xl font-display font-bold">Boss Battle</h1>
          <p className="text-xs text-muted-foreground">Defeat the boss by answering correctly</p>
        </div>
      </div>

      <div className="max-w-md mx-auto">
        <BossBattleArena
          boss={{ ...boss, hp: bossHp, maxHp: BOSS_MAX_HP }}
          player={{ hp: playerHp, maxHp: PLAYER_MAX_HP, attackPower: PLAYER_ATTACK, level: 8 }}
          onStartBattle={() => setPhase('battle')}
          phase={phase}
        />
      </div>

      {phase === 'battle' && currentQ && (
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="flex items-center justify-between">
            <Badge variant="secondary">Question {questionIndex + 1}/{bossQuestions.length}</Badge>
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={currentQ.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div className="p-6 rounded-2xl border border-border bg-card/50">
                <MCQQuestion
                  question={currentQ.question}
                  choices={currentQ.choices}
                  selectedId={answers[currentQ.id]}
                  correctId={currentQ.correctAnswer}
                  onSelect={(id) => handleAnswer(id)}
                  showResult={showResult}
                />
              </div>
              {showResult && (
                <ExplanationPanel correct={answers[currentQ.id] === currentQ.correctAnswer} explanation={currentQ.explanation} className="mt-4" />
              )}
            </motion.div>
          </AnimatePresence>

          {answers[currentQ.id] && phase === 'battle' && (
            <div className="flex justify-end">
              <Button onClick={handleNext} className="gap-2" disabled={questionIndex >= bossQuestions.length - 1 && bossHp > 0 && playerHp > 0}>
                Next Attack <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
