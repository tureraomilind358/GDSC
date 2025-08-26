import { User, Course, Exam } from './index';

export interface Student {
  id: string;
  userId: string;
  studentId: string; // Unique student number
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: Date;
  gender: 'male' | 'female' | 'other';
  address: StudentAddress;
  emergencyContact: EmergencyContact;
  academicInfo: AcademicInfo;
  enrollmentHistory: Enrollment[];
  payments: Payment[];
  certificates: Certificate[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  user?: User;
}

export interface StudentAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
  email?: string;
}

export interface AcademicInfo {
  highestEducation: string;
  institution: string;
  graduationYear?: number;
  gpa?: number;
  achievements: string[];
  skills: string[];
}

export interface Enrollment {
  id: string;
  courseId: string;
  course?: Course;
  enrollmentDate: Date;
  status: 'active' | 'completed' | 'dropped' | 'pending';
  grade?: string;
  attendance: number; // percentage
  assignments: Assignment[];
  exams: StudentExamResult[];
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  submittedDate?: Date;
  grade?: number;
  feedback?: string;
  attachments: string[];
}

export interface StudentExamResult {
  id: string;
  examId: string;
  exam?: Exam;
  score: number;
  maxScore: number;
  percentage: number;
  status: 'passed' | 'failed' | 'pending';
  attemptDate: Date;
  feedback?: string;
}

export interface Payment {
  id: string;
  amount: number;
  currency: string;
  method: 'credit_card' | 'debit_card' | 'bank_transfer' | 'cash' | 'online';
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  transactionId?: string;
  paymentDate: Date;
  description: string;
  receiptUrl?: string;
}

export interface Certificate {
  id: string;
  courseId: string;
  course?: Course;
  issueDate: Date;
  expiryDate?: Date;
  certificateNumber: string;
  status: 'active' | 'expired' | 'revoked';
  downloadUrl?: string;
  verificationCode: string;
}

export interface StudentFilter {
  search?: string;
  status?: string;
  courseId?: string;
  enrollmentDate?: Date;
  page?: number;
  limit?: number;
}

export interface StudentStats {
  totalStudents: number;
  activeStudents: number;
  completedStudents: number;
  averageGrade: number;
  totalRevenue: number;
  monthlyEnrollments: number;
}
