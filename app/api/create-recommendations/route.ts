import { NextRequest, NextResponse } from 'next/server'
import { cosmic } from '@/lib/cosmic'
import { AIRecommendation } from '@/lib/ai-recommendations'

export async function POST(request: NextRequest) {
  try {
    const { studentId, assessmentId, recommendations } = await request.json();
    
    if (!studentId || !assessmentId || !recommendations) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    const createdRecommendations = await Promise.all(
      recommendations.map(async (rec: AIRecommendation) => {
        const response = await cosmic.objects.insertOne({
          title: rec.text.substring(0, 50),
          type: 'recommendations',
          metadata: {
            student: studentId,
            risk_assessment: assessmentId,
            category: rec.category,
            recommendation_text: rec.text,
            priority: rec.priority,
            status: 'Pending',
            approved_by_teacher: false
          }
        });
        return response.object;
      })
    );
    
    return NextResponse.json({ 
      success: true,
      recommendations: createdRecommendations 
    });
  } catch (error) {
    console.error('Error creating recommendations:', error);
    return NextResponse.json(
      { error: 'Failed to create recommendations' },
      { status: 500 }
    );
  }
}