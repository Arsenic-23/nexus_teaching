// ==================== USER TYPES ====================

export enum UserRole {
  STUDENT = 'STUDENT',
  TEACHER = 'TEACHER',
  SCHOOL_ADMIN = 'SCHOOL_ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN',
}

export interface User {
  id: string;
  clerkId: string;
  email: string;
  firstName: string;
  lastName: string;
  avatarUrl?: string;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface StudentProfile {
  id: string;
  userId: string;
  totalXp: number;
  level: number;
  rankId?: string;
  gradeLevel?: number;
  subjects: string[];
  dailyGoal: number;
  timezone: string;
  onboardingComplete: boolean;
  diagnosticComplete: boolean;
}

export interface TeacherProfile {
  id: string;
  userId: string;
  schoolId?: string;
  subjects: string[];
  bio?: string;
}

export interface AdminProfile {
  id: string;
  userId: string;
  schoolId?: string;
  adminLevel: 'SCHOOL' | 'DISTRICT' | 'SUPER';
}
