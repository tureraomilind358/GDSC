export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  username?: string;
  phone?: string;
  avatar?: string;
  roles: string[];
  permissions: string[];
  isActive: boolean;
  isEmailVerified: boolean;
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  profile?: UserProfile;
}

export interface UserProfile {
  id: string;
  userId: string;
  dateOfBirth?: Date;
  gender?: 'male' | 'female' | 'other';
  address?: Address;
  bio?: string;
  website?: string;
  socialLinks?: SocialLinks;
  preferences?: UserPreferences;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface SocialLinks {
  linkedin?: string;
  twitter?: string;
  facebook?: string;
  instagram?: string;
}

export interface UserPreferences {
  language: string;
  timezone: string;
  theme: 'light' | 'dark' | 'auto';
  notifications: NotificationPreferences;
}

export interface NotificationPreferences {
  email: boolean;
  push: boolean;
  sms: boolean;
  marketing: boolean;
}

export interface UserRole {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserPermission {
  id: string;
  name: string;
  description: string;
  resource: string;
  action: string;
  isActive: boolean;
}

export interface UserSession {
  id: string;
  userId: string;
  token: string;
  refreshToken: string;
  deviceInfo: DeviceInfo;
  ipAddress: string;
  userAgent: string;
  isActive: boolean;
  expiresAt: Date;
  createdAt: Date;
  lastActivityAt: Date;
}

export interface DeviceInfo {
  deviceType: 'desktop' | 'mobile' | 'tablet';
  browser: string;
  browserVersion: string;
  os: string;
  osVersion: string;
  deviceModel?: string;
}

export interface UserActivity {
  id: string;
  userId: string;
  action: string;
  resource: string;
  resourceId?: string;
  details?: any;
  ipAddress: string;
  userAgent: string;
  createdAt: Date;
}

export interface UserFilter {
  search?: string;
  roles?: string[];
  isActive?: boolean;
  isEmailVerified?: boolean;
  createdAt?: Date;
  lastLoginAt?: Date;
  page?: number;
  limit?: number;
}

export interface UserStats {
  totalUsers: number;
  activeUsers: number;
  verifiedUsers: number;
  usersByRole: { [role: string]: number };
  recentRegistrations: number;
  averageLoginFrequency: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: string;
}

export interface AuthResponse {
  token: string;
  refreshToken: string;
  user: User;
  expiresIn: number;
}
