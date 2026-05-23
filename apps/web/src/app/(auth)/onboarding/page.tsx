'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser, useClerk } from '@clerk/nextjs';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GraduationCap, School, ArrowRight, BookOpen, Target, Flame,
  CheckCircle2, ChevronRight, Brain, Trophy, Star, Orbit
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { LottieAnimation } from '@/components/ui/lottie-animation';

type OnboardingStep = 'role' | 'grade' | 'subjects' | 'goal' | 'complete';
type UserRole = 'STUDENT' | 'TEACHER';

const subjects = [
  { id: 'mathematics', name: 'Mathematics', icon: '📐', description: 'Algebra, Geometry, Calculus' },
  { id: 'physics', name: 'Physics', icon: '⚡', description: 'Mechanics, Waves, Thermodynamics' },
  { id: 'chemistry', name: 'Chemistry', icon: '🧪', description: 'Organic, Inorganic, Physical' },
  { id: 'biology', name: 'Biology', icon: '🔬', description: 'Cell Biology, Genetics, Ecology' },
  { id: 'english', name: 'English', icon: '📖', description: 'Literature, Grammar, Writing' },
  { id: 'cs', name: 'Computer Science', icon: '💻', description: 'Algorithms, Programming, Data' },
];

const gradeOptions = [
  { value: 6, label: 'Grade 6' },
  { value: 7, label: 'Grade 7' },
  { value: 8, label: 'Grade 8' },
  { value: 9, label: 'Grade 9' },
  { value: 10, label: 'Grade 10' },
  { value: 11, label: 'Grade 11' },
  { value: 12, label: 'Grade 12' },
  { value: 13, label: 'University' },
];

const dailyGoals = [
  { minutes: 15, label: 'Casual', description: '15 min/day', icon: '🌱', color: 'text-success', border: 'border-success/30' },
  { minutes: 30, label: 'Regular', description: '30 min/day', icon: '📚', color: 'text-primary', border: 'border-primary/30' },
  { minutes: 60, label: 'Serious', description: '60 min/day', icon: '🔥', color: 'text-streak', border: 'border-streak/30' },
  { minutes: 90, label: 'Champion', description: '90 min/day', icon: '👑', color: 'text-mastery', border: 'border-mastery/30' },
];

export default function OnboardingPage() {
  const { user } = useUser();
  const { session } = useClerk();
  const router = useRouter();
  const [step, setStep] = useState<OnboardingStep>('role');
  const [role, setRole] = useState<UserRole>('STUDENT');
  const [grade, setGrade] = useState<number>(10);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(['mathematics']);
  const [dailyGoal, setDailyGoal] = useState<number>(30);
  const [isLoading, setIsLoading] = useState(false);

  const toggleSubject = (id: string) => {
    setSelectedSubjects((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    );
  };

  const handleComplete = async () => {
    setIsLoading(true);
    try {
      // Save role to unsafeMetadata (readable by middleware via sessionClaims)
      await user?.update({
        unsafeMetadata: {
          role,
          onboardingComplete: true,
          grade: role === 'STUDENT' ? grade : null,
          subjects: role === 'STUDENT' ? selectedSubjects : [],
          dailyGoalMinutes: dailyGoal,
        },
      });

      // Reload the session so the JWT includes the updated unsafeMetadata
      await session?.reload();

      setStep('complete');

      // Use hard navigation after session reload so the browser fetches a fresh JWT
      // router.push() would carry the stale cached token and the middleware would redirect back
      setTimeout(() => {
        window.location.href = role === 'STUDENT' ? '/student/dashboard' : '/teacher/dashboard';
      }, 2500);
    } catch (error) {
      console.error('Onboarding error:', error);
      setIsLoading(false);
    }
  };

  const stepIndex = ['role', 'grade', 'subjects', 'goal'].indexOf(step);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden">
      {/* Premium organic mesh background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
      <div className="absolute -top-40 -right-40 w-[40rem] h-[40rem] bg-primary/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute -bottom-40 -left-40 w-[40rem] h-[40rem] bg-accent/10 rounded-full blur-[120px] pointer-events-none animate-pulse delay-700" />

      <div className="w-full max-w-3xl relative z-10 bg-card/30 backdrop-blur-[64px] border border-white/10 dark:border-white/5 p-8 md:p-14 rounded-[3rem] shadow-[0_8px_40px_-12px_rgba(0,0,0,0.3)]">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-3 mb-10 group cursor-default"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-brand flex items-center justify-center shadow-lg shadow-primary/25 group-hover:scale-105 group-hover:rotate-12 transition-all duration-500">
            <Orbit className="w-6 h-6 text-white group-hover:animate-spin-slow" />
          </div>
          <span className="font-display text-2xl font-bold">Nexus Learning</span>
        </motion.div>

        {/* Progress bar */}
        {step !== 'complete' && (
          <div className="mb-8">
            <div className="flex justify-between text-xs text-muted-foreground mb-2">
              <span>Step {stepIndex + 1} of {role === 'STUDENT' ? 4 : 1}</span>
              <span>{Math.round(((stepIndex + 1) / (role === 'STUDENT' ? 4 : 1)) * 100)}%</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-secondary overflow-hidden">
              <motion.div
                className="h-full bg-gradient-brand rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${((stepIndex + 1) / (role === 'STUDENT' ? 4 : 1)) * 100}%` }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              />
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
          {/* STEP: Role Selection */}
          {step === 'role' && (
            <motion.div
              key="role"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-display font-black tracking-tight mb-4 text-foreground drop-shadow-sm">
                  Welcome to Nexus! 👋
                </h1>
                <p className="text-muted-foreground text-lg max-w-md mx-auto leading-relaxed">
                  Tell us who you are so we can perfectly tailor your experience.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
                {[
                  {
                    id: 'STUDENT' as UserRole,
                    icon: GraduationCap,
                    title: 'I am a Student',
                    description: 'Learn, practice, and master subjects with gamified progression. Earn XP, build streaks, climb ranks.',
                    color: 'text-primary',
                    emoji: '🎓',
                  },
                  {
                    id: 'TEACHER' as UserRole,
                    icon: School,
                    title: 'I am a Teacher',
                    description: 'Manage classrooms, create assignments, and track every student\'s mastery and progress.',
                    color: 'text-primary',
                    emoji: '👩‍🏫',
                  },
                ].map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setRole(option.id)}
                    className={cn(
                      'p-8 rounded-[2rem] border text-left transition-all duration-500 group relative overflow-hidden',
                      role === option.id
                        ? 'border-primary/50 bg-gradient-to-br from-primary/10 to-transparent shadow-2xl shadow-primary/20 -translate-y-2'
                        : 'border-white/5 bg-card/30 hover:border-primary/30 hover:bg-card/60 hover:-translate-y-1 hover:shadow-xl',
                    )}
                  >
                    {/* Glass sheen */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    
                    {role === option.id && (
                      <div className="absolute top-3 right-3">
                        <CheckCircle2 className="w-5 h-5 text-primary" />
                      </div>
                    )}
                    <span className="text-4xl mb-4 block">{option.emoji}</span>
                    <h3 className="text-lg font-semibold mb-2">{option.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{option.description}</p>
                  </button>
                ))}
              </div>

              <Button
                className="w-full gap-3 h-14 rounded-2xl text-lg shadow-xl shadow-primary/20"
                variant="glow"
                onClick={() => setStep(role === 'STUDENT' ? 'grade' : 'goal')}
              >
                Continue
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
          )}

          {/* STEP: Grade Level */}
          {step === 'grade' && (
            <motion.div
              key="grade"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-display font-black tracking-tight mb-4 text-foreground drop-shadow-sm">
                  What grade are you in?
                </h1>
                <p className="text-muted-foreground text-lg max-w-md mx-auto leading-relaxed">
                  We'll tailor the difficulty and content directly to your level.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
                {gradeOptions.map((g) => (
                  <button
                    key={g.value}
                    onClick={() => setGrade(g.value)}
                    className={cn(
                      'p-5 rounded-2xl border text-base font-semibold transition-all duration-300 relative overflow-hidden group',
                      grade === g.value
                        ? 'border-primary/50 bg-gradient-to-br from-primary/10 to-transparent text-primary shadow-lg shadow-primary/20 -translate-y-1'
                        : 'border-white/5 bg-card/30 hover:border-primary/30 hover:bg-card/60 text-muted-foreground hover:text-foreground hover:-translate-y-1 hover:shadow-xl',
                    )}
                  >
                    {/* Glass sheen */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    {g.label}
                  </button>
                ))}
              </div>

              <div className="flex gap-4">
                <Button variant="outline" size="xl" className="flex-1 rounded-2xl h-14 bg-background/50 backdrop-blur-md border-white/10 hover:bg-background/80 transition-colors" onClick={() => setStep('role')}>Back</Button>
                <Button variant="glow" size="xl" className="flex-[2] gap-3 h-14 rounded-2xl text-lg shadow-xl shadow-primary/20 group" onClick={() => setStep('subjects')}>
                  Continue <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* STEP: Subject Selection */}
          {step === 'subjects' && (
            <motion.div
              key="subjects"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-display font-black tracking-tight mb-4 text-foreground drop-shadow-sm">
                  What do you want to study?
                </h1>
                <p className="text-muted-foreground text-lg max-w-md mx-auto leading-relaxed">
                  Pick your subjects. You can always add more later.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                {subjects.map((subject) => (
                  <button
                    key={subject.id}
                    onClick={() => toggleSubject(subject.id)}
                    className={cn(
                      'p-5 rounded-2xl border flex items-center gap-4 text-left transition-all duration-300 relative overflow-hidden group',
                      selectedSubjects.includes(subject.id)
                        ? 'border-primary/50 bg-gradient-to-br from-primary/10 to-transparent shadow-lg shadow-primary/20 -translate-y-1'
                        : 'border-white/5 bg-card/30 hover:border-primary/30 hover:bg-card/60 hover:-translate-y-1 hover:shadow-xl',
                    )}
                  >
                    {/* Glass sheen */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    <span className="text-3xl shrink-0">{subject.icon}</span>
                    <div className="min-w-0 relative z-10">
                      <p className="font-bold text-base mb-0.5">{subject.name}</p>
                      <p className="text-sm text-muted-foreground truncate">{subject.description}</p>
                    </div>
                    <div className={cn(
                      'w-5 h-5 rounded-full border-2 shrink-0 ml-auto transition-all relative z-10 flex items-center justify-center',
                      selectedSubjects.includes(subject.id)
                        ? 'border-primary bg-primary'
                        : 'border-white/20 bg-transparent',
                    )}>
                      {selectedSubjects.includes(subject.id) && <CheckCircle2 className="w-3 h-3 text-white" />}
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex gap-4">
                <Button variant="outline" size="xl" className="flex-1 rounded-2xl h-14 bg-background/50 backdrop-blur-md border-white/10 hover:bg-background/80 transition-colors" onClick={() => setStep('grade')}>Back</Button>
                <Button
                  variant="glow"
                  size="xl"
                  className="flex-[2] gap-3 h-14 rounded-2xl text-lg shadow-xl shadow-primary/20 group"
                  disabled={selectedSubjects.length === 0}
                  onClick={() => setStep('goal')}
                >
                  Continue <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* STEP: Daily Goal */}
          {step === 'goal' && (
            <motion.div
              key="goal"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-display font-black tracking-tight mb-4 text-foreground drop-shadow-sm">
                  Set your daily goal
                </h1>
                <p className="text-muted-foreground text-lg max-w-md mx-auto leading-relaxed">
                  Consistency beats intensity. Pick a target you can maintain.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-10">
                {dailyGoals.map((goal) => (
                  <button
                    key={goal.minutes}
                    onClick={() => setDailyGoal(goal.minutes)}
                    className={cn(
                      'p-6 rounded-[2rem] border text-center transition-all duration-300 relative overflow-hidden group',
                      dailyGoal === goal.minutes
                        ? `border-primary/50 bg-gradient-to-br from-primary/10 to-transparent shadow-lg shadow-primary/20 -translate-y-1 ${goal.border}`
                        : 'border-white/5 bg-card/30 hover:border-primary/30 hover:bg-card/60 hover:-translate-y-1 hover:shadow-xl',
                    )}
                  >
                    {/* Glass sheen */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    <span className="text-3xl block mb-2">{goal.icon}</span>
                    <p className="font-bold text-base">{goal.label}</p>
                    <p className={cn('text-sm font-medium', dailyGoal === goal.minutes ? goal.color : 'text-muted-foreground')}>
                      {goal.description}
                    </p>
                  </button>
                ))}
              </div>

              <div className="flex gap-4">
                <Button
                  variant="outline"
                  size="xl"
                  className="flex-1 rounded-2xl h-14 bg-background/50 backdrop-blur-md border-white/10 hover:bg-background/80 transition-colors"
                  onClick={() => setStep(role === 'STUDENT' ? 'subjects' : 'role')}
                >
                  Back
                </Button>
                <Button
                  variant="glow"
                  size="xl"
                  className="flex-[2] gap-3 h-14 rounded-2xl text-lg shadow-xl shadow-primary/20 group"
                  onClick={handleComplete}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Setting up...
                    </>
                  ) : (
                    <>
                      <Flame className="w-5 h-5 transition-transform group-hover:scale-110" />
                      {role === 'STUDENT' ? 'Start Learning!' : 'Enter Dashboard!'}
                    </>
                  )}
                </Button>
              </div>
            </motion.div>
          )}

          {/* STEP: Complete */}
          {step === 'complete' && (
            <motion.div
              key="complete"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              className="text-center py-8"
            >
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1, type: 'spring', stiffness: 300 }}
                className="w-72 h-72 mx-auto -mt-20 -mb-4 relative z-0 pointer-events-none drop-shadow-2xl"
              >
                <LottieAnimation animationPath="/lottie/Confetti.json" loop={false} />
              </motion.div>

              <h1 className="text-4xl md:text-5xl font-display font-black tracking-tight mb-4 text-foreground">
                Congratulations!
              </h1>
              <p className="text-muted-foreground text-lg mb-10 max-w-md mx-auto leading-relaxed">
                You're officially set up. Your {role === 'STUDENT' ? 'learning' : 'teaching'} journey begins right now.
              </p>

              <div className="flex items-center justify-center gap-3 flex-wrap mb-8">
                {[
                  { icon: Target, label: 'Mastery-based', color: 'text-primary bg-primary/10 border-primary/20' },
                  { icon: Flame, label: 'Build streaks', color: 'text-streak bg-streak/10 border-streak/20' },
                  { icon: Trophy, label: 'Rank up', color: 'text-mastery bg-mastery/10 border-mastery/20' },
                  { icon: Brain, label: 'AI Tutor', color: 'text-primary bg-primary/10 border-border' },
                ].map(({ icon: Icon, label, color }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.08 }}
                    className={cn('flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm font-semibold shadow-sm backdrop-blur-sm', color)}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </motion.div>
                ))}
              </div>

              {/* Primary CTA button - always visible as fallback */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Button
                  size="xl"
                  variant="glow"
                  className="w-full gap-3 h-14 rounded-2xl text-lg shadow-xl shadow-primary/20 mb-4"
                  onClick={() => {
                    window.location.href = role === 'STUDENT' ? '/student/dashboard' : '/teacher/dashboard';
                  }}
                >
                  {role === 'STUDENT' ? 'Enter Dashboard' : 'Enter Teacher Dashboard'}
                  <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Button>
                <p className="text-sm text-muted-foreground animate-pulse">
                  Auto-redirecting in a few seconds...
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step dots */}
        {step !== 'complete' && (
          <div className="flex justify-center gap-2 mt-8">
            {(role === 'STUDENT'
              ? ['role', 'grade', 'subjects', 'goal']
              : ['role', 'goal']
            ).map((s, i) => (
              <div
                key={s}
                className={cn(
                  'h-1.5 rounded-full transition-all duration-300',
                  s === step ? 'w-8 bg-primary' : stepIndex > i ? 'w-3 bg-primary/40' : 'w-3 bg-secondary',
                )}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
