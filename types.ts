// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

// Student interface
export interface Student extends CosmicObject {
  type: 'students';
  metadata: {
    email: string;
    student_id: string;
    department?: string;
    semester?: number;
    attendance_percentage?: number;
    cgpa?: number;
    subjects?: {
      name: string;
      marks: number;
      grade: string;
    }[];
    financial_status?: 'Stable' | 'Moderate Stress' | 'High Stress';
    part_time_job?: boolean;
    current_risk_level?: RiskLevel;
    photo?: {
      url: string;
      imgix_url: string;
    };
  };
}

// Teacher interface
export interface Teacher extends CosmicObject {
  type: 'teachers';
  metadata: {
    email: string;
    teacher_id: string;
    department?: string;
    subjects?: string[];
    photo?: {
      url: string;
      imgix_url: string;
    };
  };
}

// Counselor interface
export interface Counselor extends CosmicObject {
  type: 'counselors';
  metadata: {
    email: string;
    counselor_id: string;
    specialization?: string;
    max_students?: number;
    current_students?: number;
    photo?: {
      url: string;
      imgix_url: string;
    };
  };
}

// Risk Assessment interface
export interface RiskAssessment extends CosmicObject {
  type: 'risk-assessments';
  metadata: {
    student: Student;
    teacher?: Teacher;
    assigned_counselor?: Counselor;
    risk_level: RiskLevel;
    prediction_score: number;
    assessment_date: string;
    factors?: {
      academic: number;
      attendance: number;
      financial: number;
      behavioral: number;
    };
    status: AssessmentStatus;
    counselor_report?: {
      url: string;
      imgix_url: string;
    };
    report_summary?: string;
  };
}

// Recommendation interface
export interface Recommendation extends CosmicObject {
  type: 'recommendations';
  metadata: {
    student: Student;
    risk_assessment: RiskAssessment;
    category: RecommendationCategory;
    recommendation_text: string;
    priority: 'Low' | 'Medium' | 'High';
    status: RecommendationStatus;
    approved_by_teacher: boolean;
    teacher?: Teacher;
    implementation_date?: string;
    completion_date?: string;
    effectiveness_rating?: number;
  };
}

// Intervention interface
export interface Intervention extends CosmicObject {
  type: 'interventions';
  metadata: {
    student: Student;
    recommendations: Recommendation[];
    start_date: string;
    end_date?: string;
    status: 'In Progress' | 'Completed' | 'Cancelled';
    notes?: string;
    outcome?: string;
  };
}

// Type literals
export type RiskLevel = 'Low' | 'Moderate' | 'High' | 'Very High';
export type AssessmentStatus = 'Pending' | 'Assigned' | 'In Progress' | 'Completed';
export type RecommendationStatus = 'Pending' | 'Approved' | 'Rejected' | 'In Progress' | 'Completed';
export type RecommendationCategory = 'Academic' | 'Financial' | 'Emotional/Psychological' | 'Social/Peer' | 'Time Management';

// Form data interfaces
export interface StudentFormData {
  title: string;
  email: string;
  student_id: string;
  department?: string;
  semester?: number;
  attendance_percentage?: number;
  cgpa?: number;
  subjects?: {
    name: string;
    marks: number;
    grade: string;
  }[];
  financial_status?: 'Stable' | 'Moderate Stress' | 'High Stress';
  part_time_job?: boolean;
}

export interface RiskPredictionData {
  attendance_percentage: number;
  cgpa: number;
  semester: number;
  financial_status: string;
  part_time_job: boolean;
  subject_performance: number;
}

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip: number;
}

// Type guards
export function isStudent(obj: CosmicObject): obj is Student {
  return obj.type === 'students';
}

export function isTeacher(obj: CosmicObject): obj is Teacher {
  return obj.type === 'teachers';
}

export function isCounselor(obj: CosmicObject): obj is Counselor {
  return obj.type === 'counselors';
}

export function isRiskAssessment(obj: CosmicObject): obj is RiskAssessment {
  return obj.type === 'risk-assessments';
}

export function isRecommendation(obj: CosmicObject): obj is Recommendation {
  return obj.type === 'recommendations';
}