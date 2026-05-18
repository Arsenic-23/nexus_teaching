'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  School,
  Users,
  BarChart3,
  Settings,
  Zap,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const navItems = [
  { label: 'Dashboard', href: '/teacher/dashboard', icon: Home },
  { label: 'Classrooms', href: '/teacher/classrooms', icon: School },
  { label: 'Students', href: '/teacher/students', icon: Users },
  { label: 'Analytics', href: '/teacher/analytics', icon: BarChart3 },
  { label: 'Settings', href: '/teacher/settings', icon: Settings },
];

export function TeacherSidebar() {
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
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-primary flex items-center justify-center shrink-0">
          <GraduationCap className="w-5 h-5 text-white" />
        </div>
        {!collapsed && (
          <div>
            <span className="font-display text-lg font-bold">Nexus</span>
            <span className="text-xs text-muted-foreground ml-2">Teacher</span>
          </div>
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
                      ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary',
                    collapsed && 'justify-center px-2',
                  )}
                  title={collapsed ? item.label : undefined}
                >
                  <item.icon className={cn('shrink-0 w-5 h-5', isActive ? 'text-purple-400' : '')} />
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Teacher badge */}
      {!collapsed && (
        <div className="px-4 pb-3">
          <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20 text-xs text-purple-400 text-center font-semibold">
            👩‍🏫 Teacher Mode
          </div>
        </div>
      )}

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
