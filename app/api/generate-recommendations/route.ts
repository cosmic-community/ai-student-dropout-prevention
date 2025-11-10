import { NextRequest, NextResponse } from 'next/server'
import { generateRecommendations } from '@/lib/ai-recommendations'
import { RiskLevel } from '@/types'

export async function POST(request: NextRequest) {
  try {
    const { riskLevel, studentData, reportKeywords } = await request.json();
    
    if (!riskLevel || !studentData) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    const recommendations = await generateRecommendations(
      riskLevel as RiskLevel,
      studentData,
      reportKeywords
    );
    
    return NextResponse.json({ recommendations });
  } catch (error) {
    console.error('Error generating recommendations:', error);
    return NextResponse.json(
      { error: 'Failed to generate recommendations' },
      { status: 500 }
    );
  }
}