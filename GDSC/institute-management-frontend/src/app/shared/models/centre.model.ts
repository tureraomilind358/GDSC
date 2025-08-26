import { Course, Student, User } from './index';

export interface Centre {
  id: string;
  name: string;
  code: string;
  description: string;
  address: CentreAddress;
  contact: ContactInfo;
  facilities: Facility[];
  courses: Course[];
  staff: StaffMember[];
  students: Student[];
  capacity: number;
  currentEnrollment: number;
  status: 'active' | 'inactive' | 'maintenance';
  operatingHours: OperatingHours;
  amenities: string[];
  images: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CentreAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

export interface ContactInfo {
  phone: string;
  email: string;
  website?: string;
  emergencyContact: string;
}

export interface Facility {
  id: string;
  name: string;
  type: 'classroom' | 'lab' | 'library' | 'auditorium' | 'cafeteria' | 'parking' | 'other';
  capacity: number;
  description: string;
  equipment: string[];
  isAvailable: boolean;
  maintenanceSchedule?: MaintenanceSchedule;
}

export interface MaintenanceSchedule {
  lastMaintenance: Date;
  nextMaintenance: Date;
  frequency: 'weekly' | 'monthly' | 'quarterly' | 'yearly';
  notes: string;
}

export interface StaffMember {
  id: string;
  userId: string;
  user?: User;
  role: 'manager' | 'instructor' | 'coordinator' | 'support' | 'admin';
  department: string;
  hireDate: Date;
  salary?: number;
  isActive: boolean;
  skills: string[];
  certifications: string[];
}

export interface OperatingHours {
  monday: DaySchedule;
  tuesday: DaySchedule;
  wednesday: DaySchedule;
  thursday: DaySchedule;
  friday: DaySchedule;
  saturday: DaySchedule;
  sunday: DaySchedule;
}

export interface DaySchedule {
  isOpen: boolean;
  openTime?: string; // HH:mm format
  closeTime?: string; // HH:mm format
  notes?: string;
}

export interface CentreStats {
  totalCentres: number;
  activeCentres: number;
  totalStudents: number;
  totalStaff: number;
  totalCourses: number;
  averageEnrollment: number;
  totalRevenue: number;
}

export interface CentreFilter {
  status?: string;
  city?: string;
  state?: string;
  search?: string;
  page?: number;
  limit?: number;
}
