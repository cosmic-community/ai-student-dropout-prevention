import { NextRequest, NextResponse } from 'next/server'
import { predictDropoutRisk } from '@/lib/ai-predictions'
import { RiskPredictionData } from '@/types'

export async function POST(request: NextRequest) {
  try {
    const data: RiskPredictionData = await request.json();
    
    // Validate input data
    if (!data.attendance_percentage || !data.cgpa || !data.semester) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Get prediction from AI model
    const prediction = await predictDropoutRisk(data);
    
    return NextResponse.json(prediction);
  } catch (error) {
    console.error('Error predicting risk:', error);
    return NextResponse.json(
      { error: 'Failed to predict risk' },
      { status: 500 }
    );
  }
}