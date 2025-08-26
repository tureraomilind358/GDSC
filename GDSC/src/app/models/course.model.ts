export interface CourseCategory {
  id: number;
  name: string;
  description?: string;
  icon?: string;
  color?: string;
}

export interface Course {
  id: number;
  name: string;
  description?: string;
  imageUrl?: string;
  platforms?: string;
  durationHours: number;
  fees: number;
  discountPercentage?: number;
  maxStudents?: number;
  isPublished: boolean;
  categoryId: number;
  categoryName?: string;
  discountedFees?: number;
}
