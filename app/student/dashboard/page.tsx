import Link from 'next/link'
import { cosmic, safeCosmicCall } from '@/lib/cosmic'
import { RiskAssessment, Recommendation } from '@/types'
import StudentRiskCard from '@/components/StudentRiskCard'
import StudentRecommendations from '@/components/StudentRecommendations'

export default async function StudentDashboardPage() {
  // In production, get student ID from session
  const studentId = 'mock-student-id';
  
  let assessment: RiskAssessment | null = null;
  let recommendations: Recommendation[] = [];
  
  try {
    const assessments = await safeCosmicCall<RiskAssessment>(() =>
      cosmic.objects.find({
        type: 'risk-assessments',
        'metadata.student': studentId
      }).props(['id', 'title', 'slug', 'metadata']).depth(1)
    );
    
    if (assessments.length > 0) {
      assessment = assessments[0];
      
      recommendations = await safeCosmicCall<Recommendation>(() =>
        cosmic.objects.find({
          type: 'recommendations',
          'metadata.risk_assessment': assessment!.id
        }).props(['id', 'title', 'slug', 'metadata']).depth(1)
      );
    }
  } catch (error) {
    // Handle errors
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">My Dashboard</h1>
            <Link href="/" className="text-gray-600 hover:text-gray-900">
              Logout
            </Link>
          </div>
        </div>
      </nav>
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back!</h2>
            <p className="text-gray-600">Here's your current status and personalized recommendations</p>
          </div>
          
          {assessment ? (
            <>
              <StudentRiskCard assessment={assessment} />
              <StudentRecommendations recommendations={recommendations} />
            </>
          ) : (
            <div className="card text-center">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Assessment Available</h3>
              <p className="text-gray-600">Your teacher hasn't created an assessment for you yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}