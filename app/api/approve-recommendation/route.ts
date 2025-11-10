import { NextRequest, NextResponse } from 'next/server'
import { cosmic } from '@/lib/cosmic'

export async function POST(request: NextRequest) {
  try {
    const { recommendationId, approved, teacherId } = await request.json();
    
    if (!recommendationId) {
      return NextResponse.json(
        { error: 'Missing recommendation ID' },
        { status: 400 }
      );
    }
    
    await cosmic.objects.updateOne(recommendationId, {
      metadata: {
        approved_by_teacher: approved,
        teacher: teacherId || '',
        status: approved ? 'Approved' : 'Rejected'
      }
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error approving recommendation:', error);
    return NextResponse.json(
      { error: 'Failed to approve recommendation' },
      { status: 500 }
    );
  }
}