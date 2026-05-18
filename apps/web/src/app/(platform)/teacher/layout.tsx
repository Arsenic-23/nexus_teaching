import { TeacherSidebar } from '@/components/layout/teacher-sidebar';
import { TopBar } from '@/components/layout/topbar';

export default function TeacherLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-page">
      <TeacherSidebar />
      <TopBar streak={0} xp={0} level={0} unreadNotifications={2} />
      <main className="lg:pl-[260px] pt-16 min-h-screen">
        <div className="p-6 max-w-content mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
