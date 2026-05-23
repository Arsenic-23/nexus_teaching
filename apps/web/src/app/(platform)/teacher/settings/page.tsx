'use client';

import { useState } from 'react';
import { Settings, Bell, User, Shield, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';

export default function TeacherSettingsPage() {
  const [notifications, setNotifications] = useState({
    studentActivity: true,
    assignmentSubmissions: true,
    atRiskAlerts: true,
    weeklyReport: true,
    emailDigest: false,
  });

  const toggle = (key: keyof typeof notifications) =>
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="space-y-6 animate-fade-in max-w-2xl mx-auto">
      <div>
        <h1 className="text-2xl font-display font-bold flex items-center gap-2">
          <Settings className="w-6 h-6 text-primary" />
          Settings
        </h1>
        <p className="text-muted-foreground text-sm mt-1">Manage your teacher account preferences</p>
      </div>

      {/* Notifications */}
      <Card className="border-border bg-card">
        <CardHeader className="pb-4">
          <CardTitle className="text-base flex items-center gap-2">
            <Bell className="w-4 h-4 text-mastery" />
            Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-0">
          {[
            { key: 'studentActivity' as const, label: 'Student Activity', desc: 'When students complete lessons or quizzes' },
            { key: 'assignmentSubmissions' as const, label: 'Assignment Submissions', desc: 'When students submit their work' },
            { key: 'atRiskAlerts' as const, label: 'At-Risk Alerts', desc: 'Immediate alerts when a student needs attention' },
            { key: 'weeklyReport' as const, label: 'Weekly Class Report', desc: 'Summary of class performance each week' },
            { key: 'emailDigest' as const, label: 'Email Digest', desc: 'Daily summary email for all activity' },
          ].map(({ key, label, desc }, i) => (
            <div key={key}>
              {i > 0 && <Separator className="my-3" />}
              <div className="flex items-center justify-between py-1">
                <div>
                  <p className="text-sm font-medium">{label}</p>
                  <p className="text-xs text-muted-foreground">{desc}</p>
                </div>
                <Switch checked={notifications[key]} onCheckedChange={() => toggle(key)} />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Account */}
      <Card className="border-border bg-card">
        <CardHeader className="pb-4">
          <CardTitle className="text-base flex items-center gap-2">
            <User className="w-4 h-4 text-primary" />
            Account
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          {[
            { label: 'Edit Profile', desc: 'Update your name and profile information' },
            { label: 'School Information', desc: 'Your institution details' },
            { label: 'Privacy Settings', desc: 'Control your data and visibility' },
            { label: 'Export Data', desc: 'Download your class and student data' },
          ].map(({ label, desc }) => (
            <button
              key={label}
              className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-secondary/60 transition-colors text-left"
            >
              <div>
                <p className="text-sm font-medium">{label}</p>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
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
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            These actions cannot be undone. Your classrooms and student data will be affected.
          </p>
          <Button variant="destructive" size="sm">Delete Account</Button>
        </CardContent>
      </Card>
    </div>
  );
}
