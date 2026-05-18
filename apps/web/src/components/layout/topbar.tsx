'use client';

import { UserButton } from '@clerk/nextjs';
import { Bell, Flame, Zap, Search, X, BookOpen, BarChart3, Sword, Bot } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSidebar } from '@/providers/sidebar-provider';
import { cn } from '@/lib/utils';

interface TopBarProps {
  streak?: number;
  xp?: number;
  level?: number;
  unreadNotifications?: number;
}

const mockNotifications = [
  { id: 1, type: 'achievement', message: '🏆 Achievement unlocked: Quiz Master!', time: '2 min ago', unread: true },
  { id: 2, type: 'xp', message: '⚡ You earned +75 XP for completing a lesson', time: '1 hour ago', unread: true },
  { id: 3, type: 'streak', message: '🔥 12-day streak! Keep it up!', time: '3 hours ago', unread: false },
  { id: 4, type: 'class', message: '📢 New assignment in Advanced Math', time: 'Yesterday', unread: false },
];

const searchSuggestions = [
  { label: 'Dashboard', href: '/student/dashboard', icon: BarChart3 },
  { label: 'Learn — Mathematics', href: '/student/learn/mathematics', icon: BookOpen },
  { label: 'Practice Hub', href: '/student/practice', icon: Sword },
  { label: 'AI Tutor', href: '/student/ai-tutor', icon: Bot },
];

export function TopBar({ streak = 0, xp = 0, level = 1, unreadNotifications = 0 }: TopBarProps) {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState(mockNotifications);
  const searchRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { collapsed } = useSidebar();

  const unreadCount = notifications.filter((n) => n.unread).length;

  // Close on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotificationsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Keyboard shortcut ⌘K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setSearchOpen(false);
        setNotificationsOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const filteredSuggestions = searchQuery
    ? searchSuggestions.filter((s) =>
        s.label.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : searchSuggestions;

  return (
    <header className={cn(
      'fixed top-0 right-0 left-0 h-16 z-30 border-b border-border bg-card/95 backdrop-blur-xl shadow-sm flex items-center justify-between px-6 transition-all duration-300',
      collapsed ? 'lg:left-[72px]' : 'lg:left-[260px]',
    )}>
      {/* Left: Search */}
      <div className="flex items-center gap-4" ref={searchRef}>
        <div className="relative">
          <button
            onClick={() => setSearchOpen((prev) => !prev)}
            className="flex items-center gap-3 px-3 py-1.5 rounded-xl border border-border/60 bg-card text-sm text-muted-foreground hover:text-foreground hover:bg-card hover:border-foreground/20 transition-all shadow-sm"
          >
            <Search className="w-4 h-4" />
            <span className="hidden sm:inline">Search...</span>
            <kbd className="hidden sm:inline-flex items-center gap-1 rounded-md border border-border/60 bg-muted/50 px-1.5 py-0.5 font-mono text-[10px] font-medium text-muted-foreground">
              ⌘K
            </kbd>
          </button>

          {/* Search dropdown */}
          {searchOpen && (
            <div className="absolute top-full left-0 mt-2 w-72 bg-card border border-border rounded-xl shadow-2xl overflow-hidden z-50">
              <div className="p-2 border-b border-border">
                <div className="flex items-center gap-2 px-2">
                  <Search className="w-4 h-4 text-muted-foreground shrink-0" />
                  <input
                    autoFocus
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Type to search..."
                    className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && filteredSuggestions.length > 0) {
                        router.push(filteredSuggestions[0].href);
                        setSearchOpen(false);
                        setSearchQuery('');
                      }
                    }}
                  />
                  {searchQuery && (
                    <button onClick={() => setSearchQuery('')}>
                      <X className="w-3 h-3 text-muted-foreground hover:text-foreground" />
                    </button>
                  )}
                </div>
              </div>
              <div className="p-1">
                {filteredSuggestions.length === 0 ? (
                  <p className="text-xs text-muted-foreground text-center py-4">No results found</p>
                ) : (
                  filteredSuggestions.map((s) => (
                    <Link
                      key={s.href}
                      href={s.href}
                      onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-secondary/60 transition-colors"
                    >
                      <s.icon className="w-4 h-4 text-muted-foreground shrink-0" />
                      <span className="text-sm">{s.label}</span>
                    </Link>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right: Stats + Notifications + Profile */}
      <div className="flex items-center gap-4">
        {/* Streak */}
        {streak > 0 && (
          <div className="flex items-center gap-1.5 text-sm">
            <Flame className="w-4 h-4 text-streak animate-flame-flicker" />
            <span className="font-semibold text-foreground">{streak}</span>
          </div>
        )}

        {/* XP */}
        {xp > 0 && (
          <div className="flex items-center gap-1.5 text-sm">
            <Zap className="w-4 h-4 text-xp" />
            <span className="font-semibold text-foreground">{xp.toLocaleString()}</span>
            <Badge variant="secondary" className="text-xs">Lv.{level}</Badge>
          </div>
        )}

        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setNotificationsOpen((prev) => !prev)}
            className="relative p-2 rounded-xl hover:bg-foreground/5 text-muted-foreground hover:text-foreground transition-all"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>

          {/* Notifications panel */}
          {notificationsOpen && (
            <div className="absolute top-full right-0 mt-2 w-80 bg-card border border-border rounded-xl shadow-2xl overflow-hidden z-50">
              <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                <h3 className="font-semibold text-sm">Notifications</h3>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllRead}
                    className="text-xs text-primary hover:underline"
                  >
                    Mark all read
                  </button>
                )}
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-8">No notifications</p>
                ) : (
                  notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`flex items-start gap-3 px-4 py-3 border-b border-border/50 last:border-0 hover:bg-secondary/40 transition-colors cursor-pointer ${n.unread ? 'bg-primary/5' : ''}`}
                      onClick={() => setNotifications((prev) => prev.map((notif) => notif.id === n.id ? { ...notif, unread: false } : notif))}
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-sm leading-snug">{n.message}</p>
                        <p className="text-[10px] text-muted-foreground mt-1">{n.time}</p>
                      </div>
                      {n.unread && (
                        <div className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0" />
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

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
