'use client';

import { useState } from 'react';
import { BossBattleArena } from '@/components/learning/practice/boss-battle-arena';
import { MCQQuestion } from '@/components/learning/quiz/mcq-question';
import { ExplanationPanel } from '@/components/learning/quiz/explanation-panel';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronRight, ArrowLeft, Sword, Lock, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const bosses = [
 {
 id: 'algebra-boss',
 name: 'The Algebra Titan',
 emoji: '🦾',
 topic: 'Quadratic Equations',
 difficulty: 'medium' as const,
 xpReward: 200,
 available: true,
 description: 'The Algebra Titan challenges your mastery of quadratic equations. Defeat it by answering 5 questions correctly before losing all HP!',
 questions: [
 { id: 'b1', question: 'Factor: x² + 5x + 6', choices: [{ id: 'a', text: '(x+2)(x+3)' }, { id: 'b', text: '(x+1)(x+6)' }, { id: 'c', text: '(x+2)(x+4)' }, { id: 'd', text: '(x-2)(x-3)' }], correctAnswer: 'a', explanation: 'We need factors of 6 that add to 5: that\'s 2 and 3. So (x+2)(x+3).' },
 { id: 'b2', question: 'Solve: x² - 9 = 0', choices: [{ id: 'a', text: 'x = ±3' }, { id: 'b', text: 'x = 3' }, { id: 'c', text: 'x = ±9' }, { id: 'd', text: 'x = ±√3' }], correctAnswer: 'a', explanation: 'x² = 9, so x = ±√9 = ±3.' },
 { id: 'b3', question: 'What is the vertex of y = x² - 4x + 3?', choices: [{ id: 'a', text: '(2, -1)' }, { id: 'b', text: '(-2, 3)' }, { id: 'c', text: '(2, 3)' }, { id: 'd', text: '(4, 3)' }], correctAnswer: 'a', explanation: 'Vertex x = -b/2a = 4/2 = 2. y = 4 - 8 + 3 = -1. Vertex is (2, -1).' },
 { id: 'b4', question: 'How many real roots does x² + 2x + 5 have?', choices: [{ id: 'a', text: 'None' }, { id: 'b', text: 'One' }, { id: 'c', text: 'Two' }, { id: 'd', text: 'Infinite' }], correctAnswer: 'a', explanation: 'Discriminant = 4 - 20 = -16 < 0, so no real roots.' },
 { id: 'b5', question: 'Solve: 2x² - 8 = 0', choices: [{ id: 'a', text: 'x = ±2' }, { id: 'b', text: 'x = ±4' }, { id: 'c', text: 'x = 2' }, { id: 'd', text: 'x = ±√8' }], correctAnswer: 'a', explanation: '2x² = 8, x² = 4, x = ±2.' },
 ],
 },
 {
 id: 'calculus-boss',
 name: 'Derivative Dragon',
 emoji: '🐉',
 topic: 'Calculus Concepts',
 difficulty: 'hard' as const,
 xpReward: 350,
 available: false,
 description: 'The Derivative Dragon tests your calculus knowledge. Unlock by mastering Trigonometry first.',
 questions: [],
 },
];

const PLAYER_MAX_HP = 100;
const BOSS_ATTACK = 20;
const PLAYER_ATTACK = 20;

export default function BossPage() {
 const [selectedBossId, setSelectedBossId] = useState<string | null>(null);
 const [phase, setPhase] = useState<'lobby' | 'battle' | 'victory' | 'defeat'>('lobby');
 const [bossHp, setBossHp] = useState(0);
 const [bossMaxHp, setBossMaxHp] = useState(0);
 const [playerHp, setPlayerHp] = useState(PLAYER_MAX_HP);
 const [questionIndex, setQuestionIndex] = useState(0);
 const [answers, setAnswers] = useState<Record<string, string>>({});
 const [showResult, setShowResult] = useState(false);

 const activeBoss = bosses.find(b => b.id === selectedBossId);
 const currentQ = activeBoss?.questions[questionIndex];

 const startBoss = (bossId: string) => {
 const boss = bosses.find(b => b.id === bossId);
 if (!boss || !boss.available) return;
 setSelectedBossId(bossId);
 setBossHp(boss.questions.length * PLAYER_ATTACK);
 setBossMaxHp(boss.questions.length * PLAYER_ATTACK);
 setPlayerHp(PLAYER_MAX_HP);
 setQuestionIndex(0);
 setAnswers({});
 setShowResult(false);
 setPhase('lobby');
 };

 const handleAnswer = (id: string) => {
 if (!currentQ || answers[currentQ.id]) return;
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
 if (activeBoss && questionIndex < activeBoss.questions.length - 1) {
 setQuestionIndex((i) => i + 1);
 }
 };

 const handleReset = () => {
 setSelectedBossId(null);
 setPhase('lobby');
 setBossHp(0);
 setPlayerHp(PLAYER_MAX_HP);
 setQuestionIndex(0);
 setAnswers({});
 setShowResult(false);
 };

 // Boss selection screen
 if (!selectedBossId) {
 return (
 <div className="space-y-6 animate-fade-in">
 <div className="flex items-center gap-3">
 <Link href="/student/practice">
 <Button size="icon-sm" variant="ghost"><ArrowLeft className="w-4 h-4" /></Button>
 </Link>
 <div>
 <h1 className="text-xl font-display font-bold">Boss Battles</h1>
 <p className="text-xs text-muted-foreground">Choose a boss to challenge</p>
 </div>
 </div>

 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 {bosses.map((boss) => (
 <Card
 key={boss.id}
 className={`border transition-all ${boss.available ? 'border-destructive/30 bg-destructive/5 hover:border-destructive/50 hover:shadow-lg cursor-pointer' : 'border-border bg-muted/50 opacity-60 cursor-not-allowed'}`}
 onClick={() => boss.available && startBoss(boss.id)}
 >
 <CardContent className="p-6">
 <div className="flex items-start gap-4">
 <span className="text-4xl">{boss.emoji}</span>
 <div className="flex-1">
 <div className="flex items-center gap-2 mb-1">
 <p className="font-bold">{boss.name}</p>
 {!boss.available && <Lock className="w-3.5 h-3.5 text-muted-foreground" />}
 </div>
 <p className="text-xs text-muted-foreground mb-2">{boss.topic}</p>
 <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{boss.description}</p>
 <div className="flex items-center justify-between">
 <div className="flex items-center gap-1 text-xs font-bold text-brand">
 <Zap className="w-3 h-3" />
 +{boss.xpReward} XP
 </div>
 <Badge
 variant={boss.difficulty === 'hard' ? 'destructive' : 'warning'}
 className="text-xs capitalize"
 >
 {boss.difficulty}
 </Badge>
 </div>
 {boss.available && (
 <Button size="sm" className="w-full mt-3 gap-1 bg-destructive hover:bg-destructive/90 text-destructive-foreground">
 Fight <Sword className="w-3.5 h-3.5" />
 </Button>
 )}
 {!boss.available && (
 <Button size="sm" variant="secondary" className="w-full mt-3 text-xs" disabled>
 🔒 Locked
 </Button>
 )}
 </div>
 </div>
 </CardContent>
 </Card>
 ))}
 </div>
 </div>
 );
 }

 // Battle screen
 return (
 <div className="space-y-6 animate-fade-in">
 <div className="flex items-center gap-3">
 <Button size="icon-sm" variant="ghost" onClick={handleReset}>
 <ArrowLeft className="w-4 h-4" />
 </Button>
 <div>
 <h1 className="text-xl font-display font-bold">Boss Battle</h1>
 <p className="text-xs text-muted-foreground">Defeat {activeBoss?.name}</p>
 </div>
 </div>

 <div className="max-w-md mx-auto">
 {activeBoss && (
 <BossBattleArena
 boss={{ ...activeBoss, hp: bossHp, maxHp: bossMaxHp }}
 player={{ hp: playerHp, maxHp: PLAYER_MAX_HP, attackPower: PLAYER_ATTACK, level: 8 }}
 onStartBattle={() => setPhase('battle')}
 phase={phase}
 />
 )}
 </div>

 {phase === 'battle' && currentQ && (
 <div className="max-w-2xl mx-auto space-y-4">
 <div className="flex items-center justify-between">
 <Badge variant="secondary">Question {questionIndex + 1}/{activeBoss?.questions.length}</Badge>
 </div>

 <AnimatePresence mode="wait">
 <motion.div key={currentQ.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
 <div className="p-6 rounded-xl border border-border bg-card">
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

 {answers[currentQ.id] && phase === 'battle' && activeBoss && questionIndex < activeBoss.questions.length - 1 && bossHp > 0 && playerHp > 0 && (
 <div className="flex justify-end">
 <Button onClick={handleNext} className="gap-2">
 Next Attack <ChevronRight className="w-4 h-4" />
 </Button>
 </div>
 )}
 </div>
 )}
 </div>
 );
}
