import { User } from './index';

export interface Course {
  id: string;
  title: string;
  description: string;
  code: string;
  duration: number; // in weeks
  price: number;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  isActive: boolean;
  maxStudents: number;
  currentStudents: number;
  instructorId: string;
  instructor?: User;
  syllabus: SyllabusItem[];
  materials: CourseMaterial[];
  schedule: CourseSchedule[];
  createdAt: Date;
  updatedAt: Date;
}

export interface SyllabusItem {
  id: string;
  title: string;
  description: string;
  week: number;
  topics: string[];
  learningObjectives: string[];
}

export interface CourseMaterial {
  id: string;
  title: string;
  type: 'document' | 'video' | 'link' | 'assignment';
  url: string;
  description: string;
  week: number;
  isRequired: boolean;
}

export interface CourseSchedule {
  id: string;
  dayOfWeek: number; // 0-6 (Sunday-Saturday)
  startTime: string; // HH:mm format
  endTime: string; // HH:mm format
  room: string;
  instructorId: string;
}

export interface CourseEnrollment {
  id: string;
  studentId: string;
  courseId: string;
  enrollmentDate: Date;
  status: 'active' | 'completed' | 'dropped' | 'pending';
  grade?: string;
  certificateId?: string;
  student?: User;
  course?: Course;
}

export interface CourseCategory {
  id: string;
  name: string;
  description: string;
  icon?: string;
  color?: string;
}

export interface CourseFilter {
  category?: string;
  level?: string;
  instructorId?: string;
  isActive?: boolean;
  search?: string;
  page?: number;
  limit?: number;
}
