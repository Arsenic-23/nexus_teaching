'use client';

import { UserButton } from '@clerk/nextjs';
import { Bell, Flame, Zap, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface TopBarProps {
  streak?: number;
  xp?: number;
  level?: number;
  unreadNotifications?: number;
}

export function TopBar({ streak = 0, xp = 0, level = 1, unreadNotifications = 0 }: TopBarProps) {
  return (
    <header className="fixed top-0 right-0 left-0 lg:left-[260px] h-16 z-30 border-b border-border bg-background/80 backdrop-blur-sm flex items-center justify-between px-6 transition-all duration-300">
      {/* Left: Search */}
      <div className="flex items-center gap-4">
        <button className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-card text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
          <Search className="w-4 h-4" />
          <span className="hidden sm:inline">Search...</span>
          <kbd className="hidden sm:inline-flex items-center gap-1 rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-xs">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Right: Stats + Profile */}
      <div className="flex items-center gap-4">
        {/* Streak */}
        <div className="flex items-center gap-1.5 text-sm">
          <Flame className="w-4 h-4 text-streak animate-flame-flicker" />
          <span className="font-semibold text-foreground">{streak}</span>
        </div>

        {/* XP */}
        <div className="flex items-center gap-1.5 text-sm">
          <Zap className="w-4 h-4 text-xp" />
          <span className="font-semibold text-foreground">{xp.toLocaleString()}</span>
          <Badge variant="secondary" className="text-xs">Lv.{level}</Badge>
        </div>

        {/* Notifications */}
        <button className="relative p-2 rounded-lg hover:bg-secondary transition-colors">
          <Bell className="w-5 h-5 text-muted-foreground" />
          {unreadNotifications > 0 && (
            <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
              {unreadNotifications > 9 ? '9+' : unreadNotifications}
            </span>
          )}
        </button>

        {/* User */}
        <UserButton
          appearance={{
            elements: {
              avatarBox: 'w-8 h-8',
            },
          }}
        />
      </div>
    </header>
  );
}
