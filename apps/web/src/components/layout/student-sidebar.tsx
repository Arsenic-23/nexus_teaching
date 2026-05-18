'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  BookOpen,
  Network,
  Sword,
  Bot,
  BarChart3,
  School,
  Trophy,
  Star,
  Settings,
  Zap,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const navItems = [
  { label: 'Dashboard', href: '/student/dashboard', icon: Home },
  { label: 'Learn', href: '/student/learn', icon: BookOpen },
  { label: 'Skill Tree', href: '/student/skill-tree', icon: Network },
  { label: 'Practice', href: '/student/practice', icon: Sword },
  { label: 'AI Tutor', href: '/student/ai-tutor', icon: Bot },
  { label: 'Progress', href: '/student/progress', icon: BarChart3 },
  { label: 'Classrooms', href: '/student/classrooms', icon: School },
  { label: 'Leaderboard', href: '/student/leaderboard', icon: Trophy },
  { label: 'Achievements', href: '/student/achievements', icon: Star },
  { label: 'Settings', href: '/student/settings', icon: Settings },
];

export function StudentSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        'hidden lg:flex flex-col fixed left-0 top-0 h-full border-r border-border bg-card/50 backdrop-blur-sm z-40 transition-all duration-300',
        collapsed ? 'w-[72px]' : 'w-[260px]',
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 h-16 px-4 border-b border-border">
        <div className="w-8 h-8 rounded-lg bg-gradient-xp flex items-center justify-center shrink-0">
          <Zap className="w-5 h-5 text-white" />
        </div>
        {!collapsed && (
          <span className="font-display text-lg font-bold">Nexus</span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 overflow-y-auto">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                    isActive
                      ? 'bg-primary/10 text-primary border border-primary/20'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary',
                    collapsed && 'justify-center px-2',
                  )}
                  title={collapsed ? item.label : undefined}
                >
                  <item.icon className={cn('shrink-0', isActive ? 'text-primary' : '', 'w-5 h-5')} />
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="flex items-center justify-center h-12 border-t border-border text-muted-foreground hover:text-foreground transition-colors"
      >
        {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>
    </aside>
  );
}
