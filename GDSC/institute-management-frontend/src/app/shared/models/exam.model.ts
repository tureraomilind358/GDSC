import { Course, Student, User } from './index';

export interface Exam {
  id: string;
  title: string;
  description: string;
  courseId: string;
  course?: Course;
  duration: number; // in minutes
  totalMarks: number;
  passingMarks: number;
  examType: 'quiz' | 'midterm' | 'final' | 'assignment';
  status: 'draft' | 'published' | 'active' | 'completed' | 'archived';
  startDate: Date;
  endDate: Date;
  instructions: string[];
  questions: Question[];
  settings: ExamSettings;
  results: ExamResult[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Question {
  id: string;
  type: 'multiple_choice' | 'single_choice' | 'true_false' | 'short_answer' | 'essay' | 'file_upload';
  question: string;
  options?: string[];
  correctAnswer?: string | string[];
  marks: number;
  difficulty: 'easy' | 'medium' | 'hard';
  category?: string;
  explanation?: string;
  attachments?: string[];
}

export interface ExamSettings {
  allowReview: boolean;
  showResults: boolean;
  shuffleQuestions: boolean;
  shuffleOptions: boolean;
  timeLimit: boolean;
  allowRetake: boolean;
  maxAttempts: number;
  requireProctoring: boolean;
  allowCalculator: boolean;
  allowNotes: boolean;
}

export interface ExamResult {
  id: string;
  examId: string;
  exam?: Exam;
  studentId: string;
  student?: Student;
  score: number;
  maxScore: number;
  percentage: number;
  status: 'passed' | 'failed' | 'pending';
  startTime: Date;
  endTime?: Date;
  duration: number; // actual time taken
  answers: StudentAnswer[];
  feedback?: string;
  gradedBy?: string;
  gradedAt?: Date;
}

export interface StudentAnswer {
  questionId: string;
  answer: string | string[];
  isCorrect: boolean;
  marks: number;
  feedback?: string;
  attachments?: string[];
}

export interface ExamSchedule {
  id: string;
  examId: string;
  exam?: Exam;
  startTime: Date;
  endTime: Date;
  room?: string;
  maxStudents: number;
  currentStudents: number;
  proctorId?: string;
  proctor?: User;
  status: 'scheduled' | 'active' | 'completed' | 'cancelled';
}

export interface ExamFilter {
  courseId?: string;
  status?: string;
  examType?: string;
  startDate?: Date;
  endDate?: Date;
  search?: string;
  page?: number;
  limit?: number;
}

export interface ExamStats {
  totalExams: number;
  activeExams: number;
  completedExams: number;
  averageScore: number;
  passRate: number;
  totalAttempts: number;
}
