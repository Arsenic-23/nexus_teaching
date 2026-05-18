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
  User,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSidebar } from '@/providers/sidebar-provider';

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
];

const bottomNavItems = [
  { label: 'Profile', href: '/student/profile', icon: User },
  { label: 'Settings', href: '/student/settings', icon: Settings },
];

export function StudentSidebar() {
  const pathname = usePathname();
  const { collapsed, setCollapsed } = useSidebar();

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + '/');

  return (
    <aside
      className={cn(
        'hidden lg:flex flex-col fixed left-0 top-0 h-full border-r border-border/50 bg-gradient-to-b from-card/90 to-card/50 backdrop-blur-2xl z-40 transition-all duration-300 shadow-xl shadow-black/5',
        collapsed ? 'w-[72px]' : 'w-[260px]',
      )}
    >
      {/* Logo */}
      <Link href="/" className="flex items-center gap-3 h-16 px-4 border-b border-border shrink-0 hover:bg-foreground/5 transition-colors">
        <div className="w-8 h-8 rounded-xl bg-gradient-xp flex items-center justify-center shrink-0 shadow-md shadow-primary/25">
          <Zap className="w-4 h-4 text-white" />
        </div>
        {!collapsed && (
          <div>
            <span className="font-display text-lg font-bold">Nexus</span>
            <span className="text-xs text-muted-foreground ml-1.5 font-medium">Student</span>
          </div>
        )}
      </Link>

      {/* Navigation */}
      <nav className="flex-1 p-3 overflow-y-auto scrollbar-thin">
        <ul className="space-y-0.5">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-300',
                    active
                      ? 'bg-foreground/10 text-foreground border border-foreground/10 shadow-sm'
                      : 'text-muted-foreground hover:text-foreground hover:bg-foreground/5',
                    collapsed && 'justify-center px-2',
                  )}
                  title={collapsed ? item.label : undefined}
                >
                  <item.icon className={cn('shrink-0 w-5 h-5', active ? 'text-primary' : '')} />
                  {!collapsed && <span>{item.label}</span>}
                  {active && !collapsed && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom nav */}
      <div className="p-3 border-t border-border space-y-0.5">
        {bottomNavItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-300',
                active
                  ? 'bg-foreground/10 text-foreground border border-foreground/10 shadow-sm'
                  : 'text-muted-foreground hover:text-foreground hover:bg-foreground/5',
                collapsed && 'justify-center px-2',
              )}
              title={collapsed ? item.label : undefined}
            >
              <item.icon className={cn('shrink-0 w-5 h-5', active ? 'text-primary' : '')} />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="flex items-center justify-center h-10 border-t border-border text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
      >
        {collapsed ? (
          <ChevronRight className="w-4 h-4" />
        ) : (
          <div className="flex items-center gap-2 text-xs">
            <ChevronLeft className="w-4 h-4" />
            <span>Collapse</span>
          </div>
        )}
      </button>
    </aside>
  );
}
