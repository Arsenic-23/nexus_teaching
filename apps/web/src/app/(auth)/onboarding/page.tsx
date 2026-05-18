'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { GraduationCap, School, ArrowRight, BookOpen, Zap, Target, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type OnboardingStep = 'role' | 'grade' | 'subjects' | 'goal' | 'complete';
type UserRole = 'STUDENT' | 'TEACHER';

const subjects = [
  { id: 'math', name: 'Mathematics', icon: '📐', description: 'Algebra, Geometry, Calculus' },
  { id: 'science', name: 'Science', icon: '🔬', description: 'Physics, Chemistry, Biology' },
  { id: 'english', name: 'English', icon: '📖', description: 'Literature, Grammar, Writing' },
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
  { minutes: 15, label: 'Light', description: '15 min/day', icon: '🌱' },
  { minutes: 30, label: 'Moderate', description: '30 min/day', icon: '🔥' },
  { minutes: 60, label: 'Intense', description: '60 min/day', icon: '⚡' },
  { minutes: 90, label: 'Champion', description: '90 min/day', icon: '👑' },
];

export default function OnboardingPage() {
  const { user } = useUser();
  const router = useRouter();
  const [step, setStep] = useState<OnboardingStep>('role');
  const [role, setRole] = useState<UserRole>('STUDENT');
  const [grade, setGrade] = useState<number>(9);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(['math']);
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
      // Update Clerk user metadata with role
      await user?.update({
        unsafeMetadata: {
          role,
          onboardingComplete: true,
        },
      });
      // TODO: Call API to create profile
      setStep('complete');
      setTimeout(() => {
        router.push(role === 'STUDENT' ? '/student/dashboard' : '/teacher/dashboard');
      }, 2000);
    } catch (error) {
      console.error('Onboarding error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-page flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-12">
          <div className="w-10 h-10 rounded-xl bg-gradient-xp flex items-center justify-center">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <span className="font-display text-2xl font-bold">Nexus Learning</span>
        </div>

        {/* Step: Role Selection */}
        {step === 'role' && (
          <div className="animate-fade-in">
            <h1 className="text-3xl font-display font-bold text-center mb-3">
              Welcome! Who are you?
            </h1>
            <p className="text-muted-foreground text-center mb-10">
              We will personalize your experience based on your role.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <button
                onClick={() => setRole('STUDENT')}
                className={cn(
                  'p-8 rounded-xl border text-left transition-all duration-200',
                  role === 'STUDENT'
                    ? 'border-primary bg-primary/10 shadow-lg shadow-primary/10'
                    : 'border-border bg-card/50 hover:border-primary/50',
                )}
              >
                <GraduationCap
                  className={cn(
                    'w-10 h-10 mb-4',
                    role === 'STUDENT' ? 'text-primary' : 'text-muted-foreground',
                  )}
                />
                <h3 className="text-lg font-semibold mb-1">I am a Student</h3>
                <p className="text-sm text-muted-foreground">
                  Learn, practice, and master subjects with gamified progression
                </p>
              </button>
              <button
                onClick={() => setRole('TEACHER')}
                className={cn(
                  'p-8 rounded-xl border text-left transition-all duration-200',
                  role === 'TEACHER'
                    ? 'border-primary bg-primary/10 shadow-lg shadow-primary/10'
                    : 'border-border bg-card/50 hover:border-primary/50',
                )}
              >
                <School
                  className={cn(
                    'w-10 h-10 mb-4',
                    role === 'TEACHER' ? 'text-primary' : 'text-muted-foreground',
                  )}
                />
                <h3 className="text-lg font-semibold mb-1">I am a Teacher</h3>
                <p className="text-sm text-muted-foreground">
                  Manage classrooms, assign work, and track student progress
                </p>
              </button>
            </div>
            <Button
              className="w-full"
              size="lg"
              onClick={() => setStep(role === 'STUDENT' ? 'grade' : 'complete')}
            >
              Continue
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        )}

        {/* Step: Grade Level */}
        {step === 'grade' && (
          <div className="animate-fade-in">
            <h1 className="text-3xl font-display font-bold text-center mb-3">
              What grade are you in?
            </h1>
            <p className="text-muted-foreground text-center mb-10">
              We will tailor the content to your level.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              {gradeOptions.map((g) => (
                <button
                  key={g.value}
                  onClick={() => setGrade(g.value)}
                  className={cn(
                    'p-4 rounded-xl border text-sm font-medium transition-all',
                    grade === g.value
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border bg-card/50 hover:border-primary/50 text-foreground',
                  )}
                >
                  {g.label}
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setStep('role')}>
                Back
              </Button>
              <Button className="flex-1" onClick={() => setStep('subjects')}>
                Continue
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step: Subject Selection */}
        {step === 'subjects' && (
          <div className="animate-fade-in">
            <h1 className="text-3xl font-display font-bold text-center mb-3">
              What do you want to study?
            </h1>
            <p className="text-muted-foreground text-center mb-10">
              You can always add more subjects later.
            </p>
            <div className="space-y-3 mb-8">
              {subjects.map((subject) => (
                <button
                  key={subject.id}
                  onClick={() => toggleSubject(subject.id)}
                  className={cn(
                    'w-full p-5 rounded-xl border text-left flex items-center gap-4 transition-all',
                    selectedSubjects.includes(subject.id)
                      ? 'border-primary bg-primary/10'
                      : 'border-border bg-card/50 hover:border-primary/50',
                  )}
                >
                  <span className="text-3xl">{subject.icon}</span>
                  <div>
                    <p className="font-semibold">{subject.name}</p>
                    <p className="text-sm text-muted-foreground">{subject.description}</p>
                  </div>
                  <div className="ml-auto">
                    <div
                      className={cn(
                        'w-5 h-5 rounded-full border-2',
                        selectedSubjects.includes(subject.id)
                          ? 'border-primary bg-primary'
                          : 'border-muted-foreground',
                      )}
                    />
                  </div>
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setStep('grade')}>
                Back
              </Button>
              <Button
                className="flex-1"
                disabled={selectedSubjects.length === 0}
                onClick={() => setStep('goal')}
              >
                Continue
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step: Daily Goal */}
        {step === 'goal' && (
          <div className="animate-fade-in">
            <h1 className="text-3xl font-display font-bold text-center mb-3">
              Set your daily goal
            </h1>
            <p className="text-muted-foreground text-center mb-10">
              Consistency is the key to mastery. How much time can you commit daily?
            </p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {dailyGoals.map((goal) => (
                <button
                  key={goal.minutes}
                  onClick={() => setDailyGoal(goal.minutes)}
                  className={cn(
                    'p-6 rounded-xl border text-center transition-all',
                    dailyGoal === goal.minutes
                      ? 'border-primary bg-primary/10'
                      : 'border-border bg-card/50 hover:border-primary/50',
                  )}
                >
                  <span className="text-3xl block mb-2">{goal.icon}</span>
                  <p className="font-semibold">{goal.label}</p>
                  <p className="text-sm text-muted-foreground">{goal.description}</p>
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setStep('subjects')}>
                Back
              </Button>
              <Button className="flex-1" onClick={handleComplete} disabled={isLoading}>
                {isLoading ? 'Setting up...' : 'Start Learning!'}
                {!isLoading && <Flame className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        )}

        {/* Step: Complete */}
        {step === 'complete' && (
          <div className="animate-fade-in text-center">
            <div className="text-6xl mb-6">🎉</div>
            <h1 className="text-3xl font-display font-bold mb-3">You are all set!</h1>
            <p className="text-muted-foreground mb-8">
              Your learning journey begins now. Let&apos;s get you to the dashboard...
            </p>
            <div className="flex items-center justify-center gap-3 text-muted-foreground">
              <div className="flex items-center gap-2 p-3 rounded-lg bg-primary/10 text-primary border border-primary/20">
                <Target className="w-4 h-4" />
                <span className="text-sm">Mastery-based</span>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-lg bg-streak/10 text-streak border border-streak/20">
                <Flame className="w-4 h-4" />
                <span className="text-sm">Build streaks</span>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-lg bg-mastery/10 text-mastery border border-mastery/20">
                <BookOpen className="w-4 h-4" />
                <span className="text-sm">Rank up</span>
              </div>
            </div>
          </div>
        )}

        {/* Progress dots */}
        {step !== 'complete' && (
          <div className="flex justify-center gap-2 mt-10">
            {(['role', 'grade', 'subjects', 'goal'] as OnboardingStep[]).map((s) => (
              <div
                key={s}
                className={cn(
                  'h-1.5 rounded-full transition-all duration-300',
                  s === step ? 'w-8 bg-primary' : 'w-1.5 bg-secondary',
                )}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
