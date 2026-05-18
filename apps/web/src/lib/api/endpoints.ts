import apiClient from './client';
import type { ApiResponse } from '@nexus/shared';

// ==================== Auth ====================
export const authApi = {
  syncUser: () => apiClient.post('/auth/sync'),
  getMe: () => apiClient.get<ApiResponse<unknown>>('/auth/me'),
  completeOnboarding: (data: {
    role: string;
    gradeLevel?: number;
    subjects?: string[];
    dailyGoal?: number;
  }) => apiClient.post('/users/onboarding', data),
};

// ==================== Learning ====================
export const learningApi = {
  getSubjects: () => apiClient.get('/subjects'),
  getSubject: (slug: string) => apiClient.get(`/subjects/${slug}`),
  getSkillTree: (subjectSlug: string) =>
    apiClient.get(`/subjects/${subjectSlug}/skill-tree`),
  getTopicLessons: (topicId: string) => apiClient.get(`/topics/${topicId}/lessons`),
  getLesson: (lessonId: string) => apiClient.get(`/lessons/${lessonId}`),
  startLesson: (lessonId: string) => apiClient.post(`/lessons/${lessonId}/start`),
  completeStep: (lessonId: string, stepId: string, result: { correct: boolean; answer: unknown; timeSpent: number }) =>
    apiClient.post(`/lessons/${lessonId}/steps/${stepId}/complete`, result),
  completeLesson: (lessonId: string) => apiClient.post(`/lessons/${lessonId}/complete`),
  getTopicQuizzes: (topicId: string) => apiClient.get(`/topics/${topicId}/quizzes`),
  startQuiz: (quizId: string) => apiClient.post(`/quizzes/${quizId}/start`),
  submitAnswer: (quizId: string, data: { questionId: string; answer: unknown; timeSpent: number }) =>
    apiClient.post(`/quizzes/${quizId}/submit`, data),
  completeQuiz: (quizId: string) => apiClient.post(`/quizzes/${quizId}/complete`),
};

// ==================== Progression ====================
export const progressionApi = {
  getProgress: () => apiClient.get('/progress/overview'),
  getTopicProgress: (topicId?: string) =>
    topicId ? apiClient.get(`/progress/topics/${topicId}`) : apiClient.get('/progress/topics'),
  getMastery: () => apiClient.get('/progress/mastery'),
  getRetention: () => apiClient.get('/progress/retention'),
  getWeakAreas: () => apiClient.get('/progress/weak-areas'),
  getRecommendations: () => apiClient.get('/progress/recommendations'),
};

// ==================== Gamification ====================
export const gamificationApi = {
  getXP: () => apiClient.get('/gamification/xp'),
  getXPHistory: () => apiClient.get('/gamification/xp/history'),
  getCurrentRank: () => apiClient.get('/gamification/ranks/current'),
  getRanks: () => apiClient.get('/gamification/ranks'),
  getStreak: () => apiClient.get('/gamification/streaks'),
  freezeStreak: () => apiClient.post('/gamification/streaks/freeze'),
  getAchievements: () => apiClient.get('/gamification/achievements'),
  getDailyQuests: () => apiClient.get('/gamification/quests/daily'),
  getLeaderboard: (type: 'global' | 'weekly' | 'monthly' = 'weekly') =>
    apiClient.get(`/gamification/leaderboard/${type}`),
  getClassLeaderboard: (classId: string) =>
    apiClient.get(`/gamification/leaderboard/class/${classId}`),
};

// ==================== AI ====================
export const aiApi = {
  createTutorSession: (data?: { topicId?: string; lessonId?: string }) =>
    apiClient.post('/ai/tutor/sessions', data),
  getTutorSessions: () => apiClient.get('/ai/tutor/sessions'),
  getSession: (sessionId: string) => apiClient.get(`/ai/tutor/sessions/${sessionId}`),
  sendMessage: (sessionId: string, message: string) =>
    apiClient.post(`/ai/tutor/sessions/${sessionId}/message`, { message }),
  getHint: (data: { questionId: string; currentHintLevel: number; studentAnswer?: string }) =>
    apiClient.post('/ai/hints', data),
  getExplanation: (data: { conceptId: string; context?: string }) =>
    apiClient.post('/ai/explain', data),
  getRecommendations: () => apiClient.get('/ai/recommendations'),
  getUsage: () => apiClient.get('/ai/usage'),
};

// ==================== Classrooms ====================
export const classroomApi = {
  getClassrooms: () => apiClient.get('/classrooms'),
  getClassroom: (id: string) => apiClient.get(`/classrooms/${id}`),
  createClassroom: (data: { name: string; subject: string; description?: string }) =>
    apiClient.post('/classrooms', data),
  joinClassroom: (joinCode: string) => apiClient.post('/classrooms/join', { joinCode }),
  leaveClassroom: (id: string) => apiClient.post(`/classrooms/${id}/leave`),
  getAssignments: (classId: string) => apiClient.get(`/classrooms/${classId}/assignments`),
  getAssignment: (id: string) => apiClient.get(`/assignments/${id}`),
  submitAssignment: (id: string, data: unknown) =>
    apiClient.post(`/assignments/${id}/submit`, data),
  getStudents: (classId: string) => apiClient.get(`/classrooms/${classId}/students`),
  getClassAnalytics: (classId: string) => apiClient.get(`/classrooms/${classId}/analytics`),
};

// ==================== Notifications ====================
export const notificationApi = {
  getNotifications: () => apiClient.get('/notifications'),
  getUnreadCount: () => apiClient.get('/notifications/unread-count'),
  markRead: (id: string) => apiClient.patch(`/notifications/${id}/read`),
  markAllRead: () => apiClient.patch('/notifications/read-all'),
};
