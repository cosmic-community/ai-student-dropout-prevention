import { RecommendationCategory, RiskLevel } from '@/types'

export interface AIRecommendation {
  category: RecommendationCategory;
  text: string;
  priority: 'Low' | 'Medium' | 'High';
  reasoning: string;
}

export async function generateRecommendations(
  riskLevel: RiskLevel,
  studentData: {
    cgpa?: number;
    attendance_percentage?: number;
    financial_status?: string;
    subjects?: any[];
    part_time_job?: boolean;
  },
  reportKeywords?: string[]
): Promise<AIRecommendation[]> {
  const recommendations: AIRecommendation[] = [];
  
  // Academic Recommendations
  if (studentData.cgpa && studentData.cgpa < 6) {
    recommendations.push({
      category: 'Academic',
      text: 'Enroll in remedial courses for low-performing subjects',
      priority: 'High',
      reasoning: 'CGPA below 6.0 indicates need for academic support',
    });
    
    recommendations.push({
      category: 'Academic',
      text: 'Watch curated YouTube lectures for difficult topics',
      priority: 'Medium',
      reasoning: 'Supplementary learning resources can improve understanding',
    });
  }
  
  if (studentData.subjects && studentData.subjects.length > 0) {
    const lowPerformingSubjects = studentData.subjects.filter(s => s.marks < 50);
    if (lowPerformingSubjects.length > 0) {
      recommendations.push({
        category: 'Academic',
        text: `Focus on improving ${lowPerformingSubjects.map(s => s.name).join(', ')}`,
        priority: 'High',
        reasoning: 'Multiple subjects with marks below 50%',
      });
    }
  }
  
  // Financial Recommendations
  if (studentData.financial_status === 'High Stress' || studentData.financial_status === 'Moderate Stress') {
    recommendations.push({
      category: 'Financial',
      text: 'Apply for Merit-cum-Means Scholarship',
      priority: 'High',
      reasoning: 'Student experiencing financial stress',
    });
    
    recommendations.push({
      category: 'Financial',
      text: 'Contact financial aid office for emergency assistance',
      priority: 'High',
      reasoning: 'Immediate financial support may prevent dropout',
    });
  }
  
  if (studentData.part_time_job) {
    recommendations.push({
      category: 'Financial',
      text: 'Explore campus work-study programs with flexible hours',
      priority: 'Medium',
      reasoning: 'Balance work commitments with studies',
    });
  }
  
  // Attendance-based recommendations
  if (studentData.attendance_percentage && studentData.attendance_percentage < 75) {
    recommendations.push({
      category: 'Time Management',
      text: 'Use Pomodoro study planner to improve time management',
      priority: 'High',
      reasoning: 'Low attendance indicates time management issues',
    });
    
    recommendations.push({
      category: 'Time Management',
      text: 'Attend productivity workshop organized by the institution',
      priority: 'Medium',
      reasoning: 'Structured approach to managing academic workload',
    });
    
    recommendations.push({
      category: 'Social/Peer',
      text: 'Join peer study group for accountability',
      priority: 'Medium',
      reasoning: 'Peer support can improve attendance and engagement',
    });
  }
  
  // Keyword-based recommendations from counselor report
  if (reportKeywords && reportKeywords.length > 0) {
    const keywords = reportKeywords.map(k => k.toLowerCase());
    
    if (keywords.some(k => k.includes('stress') || k.includes('anxiety') || k.includes('depression'))) {
      recommendations.push({
        category: 'Emotional/Psychological',
        text: 'Book counseling session for stress management',
        priority: 'High',
        reasoning: 'Counselor report indicates emotional distress',
      });
      
      recommendations.push({
        category: 'Emotional/Psychological',
        text: 'Join mindfulness or meditation club',
        priority: 'Medium',
        reasoning: 'Mental wellness activities can reduce stress',
      });
    }
    
    if (keywords.some(k => k.includes('isolated') || k.includes('lonely') || k.includes('social'))) {
      recommendations.push({
        category: 'Social/Peer',
        text: 'Connect with student welfare officer for peer integration',
        priority: 'High',
        reasoning: 'Social isolation identified in counselor report',
      });
      
      recommendations.push({
        category: 'Social/Peer',
        text: 'Participate in department cultural activities',
        priority: 'Medium',
        reasoning: 'Increase social connections and sense of belonging',
      });
    }
    
    if (keywords.some(k => k.includes('family') || k.includes('home'))) {
      recommendations.push({
        category: 'Emotional/Psychological',
        text: 'Arrange family counseling session if needed',
        priority: 'Medium',
        reasoning: 'Family-related issues identified',
      });
    }
  }
  
  // Risk-level based recommendations
  if (riskLevel === 'Very High' || riskLevel === 'High') {
    recommendations.push({
      category: 'Social/Peer',
      text: 'Assign mentorship by topper student from same department',
      priority: 'High',
      reasoning: 'High-risk students benefit from peer mentorship',
    });
    
    recommendations.push({
      category: 'Academic',
      text: 'Enroll in flexible timetable program to accommodate challenges',
      priority: 'Medium',
      reasoning: 'Flexibility can help manage multiple stressors',
    });
  }
  
  // Sort by priority
  const priorityOrder = { High: 0, Medium: 1, Low: 2 };
  recommendations.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
  
  return recommendations;
}