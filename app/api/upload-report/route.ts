import { NextRequest, NextResponse } from 'next/server'
import { cosmic } from '@/lib/cosmic'
import { extractKeywords } from '@/lib/utils'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const assessmentId = formData.get('assessmentId') as string;
    
    if (!file || !assessmentId) {
      return NextResponse.json(
        { error: 'Missing file or assessment ID' },
        { status: 400 }
      );
    }
    
    // Upload file to Cosmic media library
    const mediaResponse = await cosmic.media.insertOne({
      media: file,
      folder: 'counselor-reports'
    });
    
    // Extract text from file (in production, use proper PDF/text extraction)
    const text = await file.text();
    const keywords = extractKeywords(text);
    
    // Update assessment with report
    await cosmic.objects.updateOne(assessmentId, {
      metadata: {
        counselor_report: mediaResponse.media.name,
        report_summary: text.substring(0, 500)
      }
    });
    
    return NextResponse.json({
      success: true,
      keywords,
      mediaName: mediaResponse.media.name
    });
  } catch (error) {
    console.error('Error uploading report:', error);
    return NextResponse.json(
      { error: 'Failed to upload report' },
      { status: 500 }
    );
  }
}