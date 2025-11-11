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

    // Build metadata object with proper structure
    const metadata: Record<string, any> = {
      student: studentId,
      risk_level: prediction.risk_level,
      prediction_score: prediction.prediction_score,
      factors: prediction.factors,
      assessment_date: new Date().toISOString(),
      status: counselorId ? 'Assigned' : 'Pending'
    };

    // Only add optional fields if they exist
    if (teacherId) {
      metadata.teacher = teacherId;
    }
    
    if (counselorId) {
      metadata.assigned_counselor = counselorId;
    }

    const response = await cosmic.objects.insertOne({
      title: `Risk Assessment - ${studentId}`,
      type: 'risk-assessments',
      metadata: metadata
    });
    
    return NextResponse.json({ 
      success: true,
      assessment: response.object 
    });
  } catch (error) {
    console.error('Error creating assessment:', error);
    return NextResponse.json(
      { error: 'Failed to create assessment', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}