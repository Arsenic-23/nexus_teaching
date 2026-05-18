'use client';

import { useState } from 'react';
import { Settings, Bell, Target, Moon, Sun, User, Shield, ChevronRight, Monitor } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [dailyGoal, setDailyGoal] = useState(30);
  const [notifications, setNotifications] = useState({
    streakReminder: true,
    weeklyReport: true,
    achievementAlerts: true,
    classAnnouncements: true,
    newLessons: false,
    emailDigest: false,
  });

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-2xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-display font-bold flex items-center gap-2">
          <Settings className="w-6 h-6 text-primary" />
          Settings
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Customize your learning experience
        </p>
      </div>

      {/* Daily Goal */}
      <Card className="border-border bg-card/50">
        <CardHeader className="pb-4">
          <CardTitle className="text-base flex items-center gap-2">
            <Target className="w-4 h-4 text-primary" />
            Daily Learning Goal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            How much time do you want to spend learning each day?
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              { mins: 10, label: '10 min', desc: 'Quick' },
              { mins: 20, label: '20 min', desc: 'Light' },
              { mins: 30, label: '30 min', desc: 'Moderate' },
              { mins: 45, label: '45 min', desc: 'Focused' },
              { mins: 60, label: '1 hour', desc: 'Serious' },
            ].map(({ mins, label, desc }) => (
              <button
                key={mins}
                onClick={() => setDailyGoal(mins)}
                className={cn(
                  'flex flex-col items-center px-4 py-3 rounded-xl border text-sm font-medium transition-all',
                  dailyGoal === mins
                    ? 'bg-primary/10 border-primary/50 text-primary'
                    : 'border-border text-muted-foreground hover:border-primary/30 hover:text-foreground',
                )}
              >
                <span className="font-bold">{label}</span>
                <span className="text-[10px] opacity-70 mt-0.5">{desc}</span>
              </button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            Current goal: <span className="font-semibold text-foreground">{dailyGoal} minutes/day</span>
          </p>
        </CardContent>
      </Card>

      {/* Appearance */}
      <Card className="border-border bg-card/50">
        <CardHeader className="pb-4">
          <CardTitle className="text-base flex items-center gap-2">
            <Moon className="w-4 h-4 text-purple-400" />
            Appearance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: 'dark', label: 'Dark', icon: Moon, desc: 'Default' },
              { id: 'light', label: 'Light', icon: Sun, desc: 'Light mode' },
              { id: 'system', label: 'System', icon: Monitor, desc: 'Auto' },
            ].map(({ id, label, icon: Icon, desc }) => (
              <button
                key={id}
                onClick={() => setTheme(id)}
                className={cn(
                  'flex flex-col items-center gap-2 p-4 rounded-xl border transition-all',
                  theme === id
                    ? 'bg-primary/10 border-primary/50 text-primary'
                    : 'border-border text-muted-foreground hover:border-primary/30',
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs font-semibold">{label}</span>
                <span className="text-[10px] opacity-60">{desc}</span>
              </button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            Current theme: <span className="font-semibold text-foreground capitalize">{theme}</span>
          </p>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card className="border-border bg-card/50">
        <CardHeader className="pb-4">
          <CardTitle className="text-base flex items-center gap-2">
            <Bell className="w-4 h-4 text-mastery" />
            Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-0">
          {[
            { key: 'streakReminder' as const, label: 'Streak Reminder', desc: 'Get reminded before your streak breaks' },
            { key: 'weeklyReport' as const, label: 'Weekly Progress Report', desc: 'Summary of your weekly performance' },
            { key: 'achievementAlerts' as const, label: 'Achievement Unlocks', desc: 'When you earn new achievements' },
            { key: 'classAnnouncements' as const, label: 'Class Announcements', desc: 'Teacher posts and updates' },
            { key: 'newLessons' as const, label: 'New Content', desc: 'When new lessons are added to your subjects' },
            { key: 'emailDigest' as const, label: 'Email Digest', desc: 'Weekly summary email' },
          ].map(({ key, label, desc }, i, arr) => (
            <div key={key}>
              {i > 0 && <Separator className="my-3" />}
              <div className="flex items-center justify-between py-1">
                <div>
                  <p className="text-sm font-medium">{label}</p>
                  <p className="text-xs text-muted-foreground">{desc}</p>
                </div>
                <Switch
                  checked={notifications[key]}
                  onCheckedChange={() => toggleNotification(key)}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Account */}
      <Card className="border-border bg-card/50">
        <CardHeader className="pb-4">
          <CardTitle className="text-base flex items-center gap-2">
            <User className="w-4 h-4 text-primary" />
            Account
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          {[
            { label: 'Edit Profile', desc: 'Change your name, bio, and avatar', href: '/student/profile' },
            { label: 'Change Password', desc: 'Update your account password', href: '#' },
            { label: 'Privacy Settings', desc: 'Control what others can see', href: '#' },
            { label: 'Connected Accounts', desc: 'Google, GitHub, and more', href: '#' },
            { label: 'Export Learning Data', desc: 'Download all your progress data', href: '#' },
          ].map(({ label, desc, href }) => (
            <a
              key={label}
              href={href}
              className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-secondary/60 cursor-pointer transition-colors text-left"
            >
              <div>
                <p className="text-sm font-medium">{label}</p>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </a>
          ))}
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-destructive/20 bg-destructive/5">
        <CardHeader className="pb-4">
          <CardTitle className="text-base text-destructive flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Danger Zone
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">
            These actions are permanent and cannot be undone.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="outline" size="sm" className="border-destructive/30 text-destructive hover:bg-destructive/5">
              Reset All Progress
            </Button>
            <Button variant="destructive" size="sm">
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
