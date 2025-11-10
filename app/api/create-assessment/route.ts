import { NextRequest, NextResponse } from 'next/server'
import { cosmic } from '@/lib/cosmic'

export async function POST(request: NextRequest) {
  try {
    const { studentId, prediction, teacherId, counselorId } = await request.json();
    
    if (!studentId || !prediction) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    const response = await cosmic.objects.insertOne({
      title: `Risk Assessment - ${studentId}`,
      type: 'risk-assessments',
      metadata: {
        student: studentId,
        teacher: teacherId || '',
        assigned_counselor: counselorId || '',
        risk_level: prediction.risk_level,
        prediction_score: prediction.prediction_score,
        factors: prediction.factors,
        assessment_date: new Date().toISOString(),
        status: counselorId ? 'Assigned' : 'Pending'
      }
    });
    
    return NextResponse.json({ 
      success: true,
      assessment: response.object 
    });
  } catch (error) {
    console.error('Error creating assessment:', error);
    return NextResponse.json(
      { error: 'Failed to create assessment' },
      { status: 500 }
    );
  }
}