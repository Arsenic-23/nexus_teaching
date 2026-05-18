'use client';

import { useState } from 'react';
import { Settings, Bell, Target, Moon, Sun, User, Shield, ChevronRight, Check } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

export default function SettingsPage() {
  const [dailyGoal, setDailyGoal] = useState(30);
  const [notifications, setNotifications] = useState({
    streakReminder: true,
    weeklyReport: true,
    achievementAlerts: true,
    classAnnouncements: true,
    newLessons: false,
  });
  const [theme, setTheme] = useState<'dark' | 'light' | 'system'>('dark');

  const toggle = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-2xl mx-auto">
      <div>
        <h1 className="text-2xl font-display font-bold flex items-center gap-2">
          <Settings className="w-6 h-6 text-primary" />
          Settings
        </h1>
        <p className="text-muted-foreground text-sm mt-1">Customize your learning experience</p>
      </div>

      {/* Daily Goal */}
      <Card className="border-border bg-card/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Target className="w-4 h-4 text-primary" />
            Daily Learning Goal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">Set your daily study goal in minutes</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {[10, 20, 30, 45, 60].map((mins) => (
              <button
                key={mins}
                onClick={() => setDailyGoal(mins)}
                className={cn(
                  'px-4 py-2 rounded-lg border text-sm font-medium transition-all',
                  dailyGoal === mins
                    ? 'bg-primary/10 border-primary/50 text-primary'
                    : 'border-border text-muted-foreground hover:border-primary/30',
                )}
              >
                {mins} min
              </button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            Current goal: <span className="font-semibold text-foreground">{dailyGoal} minutes/day</span>
          </p>
        </CardContent>
      </Card>

      {/* Theme */}
      <Card className="border-border bg-card/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Moon className="w-4 h-4 text-purple-400" />
            Appearance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'dark', label: 'Dark', icon: Moon },
              { id: 'light', label: 'Light', icon: Sun },
              { id: 'system', label: 'System', icon: Settings },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setTheme(id as 'dark' | 'light' | 'system')}
                className={cn(
                  'flex flex-col items-center gap-2 p-3 rounded-xl border transition-all',
                  theme === id
                    ? 'bg-primary/10 border-primary/50 text-primary'
                    : 'border-border text-muted-foreground hover:border-primary/30',
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs font-medium">{label}</span>
                {theme === id && <Check className="w-3 h-3" />}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card className="border-border bg-card/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Bell className="w-4 h-4 text-mastery" />
            Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { key: 'streakReminder', label: 'Streak Reminder', desc: 'Get reminded to maintain your streak' },
            { key: 'weeklyReport', label: 'Weekly Report', desc: 'Receive your weekly progress summary' },
            { key: 'achievementAlerts', label: 'Achievement Alerts', desc: 'Notify when you unlock achievements' },
            { key: 'classAnnouncements', label: 'Class Announcements', desc: 'Teacher posts and updates' },
            { key: 'newLessons', label: 'New Lessons', desc: 'When new content is added' },
          ].map(({ key, label, desc }, i) => (
            <div key={key}>
              {i > 0 && <Separator className="mb-4" />}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{label}</p>
                  <p className="text-xs text-muted-foreground">{desc}</p>
                </div>
                <button
                  onClick={() => toggle(key as keyof typeof notifications)}
                  className={cn(
                    'w-11 h-6 rounded-full transition-all relative',
                    notifications[key as keyof typeof notifications]
                      ? 'bg-primary'
                      : 'bg-secondary',
                  )}
                >
                  <span
                    className={cn(
                      'absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all duration-200',
                      notifications[key as keyof typeof notifications] ? 'left-5.5 translate-x-0' : 'left-0.5',
                    )}
                    style={{ left: notifications[key as keyof typeof notifications] ? 'calc(100% - 22px)' : '2px' }}
                  />
                </button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Account */}
      <Card className="border-border bg-card/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <User className="w-4 h-4 text-primary" />
            Account
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {[
            { label: 'Edit Profile', desc: 'Change name, bio, avatar' },
            { label: 'Change Password', desc: 'Update your password' },
            { label: 'Privacy Settings', desc: 'Control who sees your data' },
            { label: 'Export Data', desc: 'Download your learning data' },
          ].map(({ label, desc }) => (
            <div
              key={label}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary/50 cursor-pointer transition-colors"
            >
              <div>
                <p className="text-sm font-medium">{label}</p>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Danger zone */}
      <Card className="border-destructive/20 bg-destructive/5">
        <CardHeader className="pb-3">
          <CardTitle className="text-base text-destructive flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Danger Zone
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-3">These actions are irreversible.</p>
          <Button variant="destructive" size="sm">Delete Account</Button>
        </CardContent>
      </Card>
    </div>
  );
}
