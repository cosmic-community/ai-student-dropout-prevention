import { cosmic } from '@/lib/cosmic'
import { RiskAssessment, Recommendation } from '@/types'
import AssessmentDetails from '@/components/AssessmentDetails'
import RecommendationList from '@/components/RecommendationList'
import Link from 'next/link'

export default async function AssessmentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  let assessment: RiskAssessment | null = null;
  let recommendations: Recommendation[] = [];
  
  try {
    const assessmentResponse = await cosmic.objects.findOne({
      id,
      type: 'risk-assessments'
    }).depth(1);
    assessment = assessmentResponse.object as RiskAssessment;
    
    const recsResponse = await cosmic.objects.find({
      type: 'recommendations',
      'metadata.risk_assessment': id
    }).props(['id', 'title', 'slug', 'metadata']).depth(1);
    recommendations = recsResponse.objects as Recommendation[];
  } catch (error) {
    // Handle errors
  }
  
  if (!assessment) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Assessment Not Found</h1>
          <Link href="/teacher/dashboard" className="text-primary hover:underline">
            Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Assessment Details</h1>
            <Link href="/teacher/dashboard" className="text-gray-600 hover:text-gray-900">
              ← Back to Dashboard
            </Link>
          </div>
        </div>
      </nav>
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <AssessmentDetails assessment={assessment} />
          <RecommendationList recommendations={recommendations} assessmentId={id} />
        </div>
      </div>
    </div>
  )
}