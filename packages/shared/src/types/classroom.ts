// ==================== CLASSROOM TYPES ====================

export enum EnrollmentStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  REMOVED = 'REMOVED',
}

export enum AssignmentType {
  LESSON = 'LESSON',
  QUIZ = 'QUIZ',
  TOPIC_MASTERY = 'TOPIC_MASTERY',
  PRACTICE_SET = 'PRACTICE_SET',
}

export enum SubmissionStatus {
  IN_PROGRESS = 'IN_PROGRESS',
  SUBMITTED = 'SUBMITTED',
  GRADED = 'GRADED',
  RETURNED = 'RETURNED',
}

export interface Classroom {
  id: string;
  teacherId: string;
  schoolId?: string;
  name: string;
  slug: string;
  description?: string;
  subject: string;
  gradeLevel?: number;
  joinCode: string;
  isActive: boolean;
  maxStudents: number;
  studentCount?: number;
  createdAt: string;
}

export interface Enrollment {
  id: string;
  studentId: string;
  classroomId: string;
  status: EnrollmentStatus;
  joinedAt: string;
}

export interface Assignment {
  id: string;
  classroomId: string;
  title: string;
  description?: string;
  type: AssignmentType;
  topicId?: string;
  quizId?: string;
  lessonIds: string[];
  dueDate?: string;
  availableFrom: string;
  maxAttempts?: number;
  passingScore?: number;
  xpBonus: number;
  isActive: boolean;
  createdAt: string;
}

export interface AssignmentSubmission {
  id: string;
  assignmentId: string;
  studentId: string;
  status: SubmissionStatus;
  score?: number;
  timeSpent?: number;
  attempts: number;
  submittedAt?: string;
  gradedAt?: string;
  feedback?: string;
}

export interface Discussion {
  id: string;
  classroomId: string;
  authorId: string;
  authorName: string;
  title: string;
  content: string;
  isPinned: boolean;
  replyCount: number;
  createdAt: string;
}

export interface DiscussionReply {
  id: string;
  discussionId: string;
  authorId: string;
  authorName: string;
  content: string;
  createdAt: string;
}
