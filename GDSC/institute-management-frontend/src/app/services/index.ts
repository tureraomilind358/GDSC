// Core Services
export { ApiService } from '../core/services/api.service';
export { AuthService } from '../core/auth/auth.service';
export { StorageService } from '../core/services/storage.service';
export { NotificationService } from '../core/services/notification.service';

// Business Logic Services
export { CourseService } from './course.service';
export { StudentService } from './student.service';
export { ExamService } from './exam.service';
export { CentreService } from './centre.service';
export { CertificationService } from './certification.service';
export { UserService } from './user.service';
export { ReportService } from './report.service';

// Service Interfaces
export type { 
  Course, 
  CourseEnrollment, 
  CourseCategory, 
  CourseFilter,
  SyllabusItem,
  CourseMaterial,
  CourseSchedule 
} from '../shared/models/course.model';

export type { 
  Student, 
  StudentFilter, 
  StudentStats,
  Enrollment,
  Payment,
  Certificate,
  Assignment,
  ExamResult 
} from '../shared/models/student.model';

export type { 
  Exam, 
  Question, 
  ExamResult as ExamResultModel, 
  ExamSchedule as ExamScheduleModel, 
  ExamFilter, 
  ExamStats,
  StudentAnswer 
} from '../shared/models/exam.model';

export type { 
  Centre, 
  CentreFilter, 
  CentreStats,
  Facility,
  StaffMember,
  OperatingHours 
} from '../shared/models/centre.model';

export type { 
  User, 
  UserProfile, 
  UserRole,
  LoginCredentials,
  RegisterData,
  AuthResponse 
} from '../shared/models/user.model';

export type { 
  Certificate as CertificateModel, 
  CertificateTemplate, 
  CertificateVerification 
} from './certification.service';

export type { 
  UserFilter, 
  UserStats 
} from './user.service';

export type { 
  ReportFilter, 
  ReportConfig, 
  ReportParameter, 
  ReportSchedule 
} from './report.service';
