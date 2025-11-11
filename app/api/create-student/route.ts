import { NextRequest, NextResponse } from 'next/server'
import { cosmic } from '@/lib/cosmic'
import { StudentFormData } from '@/types'

export async function POST(request: NextRequest) {
  try {
    const data: StudentFormData = await request.json();
    
    console.log('Received student data:', JSON.stringify(data, null, 2));
    
    // Validate required fields
    if (!data.title || !data.email || !data.student_id) {
      return NextResponse.json(
        { error: 'Missing required fields: title, email, or student_id' },
        { status: 400 }
      );
    }

    // Build metadata object with only the fields that should be in metadata
    const metadata: Record<string, any> = {
      email: data.email,
      student_id: data.student_id,
      department: data.department || '',
      semester: data.semester || 1,
      attendance_percentage: data.attendance_percentage || 0,
      cgpa: data.cgpa || 0,
      subjects: data.subjects || [],
      financial_status: data.financial_status || 'Stable',
      part_time_job: data.part_time_job || false
    };

    // Only add current_risk_level if it exists
    if ((data as any).current_risk_level) {
      metadata.current_risk_level = (data as any).current_risk_level;
    }

    console.log('Creating student with metadata:', JSON.stringify(metadata, null, 2));

    // Create student object
    const response = await cosmic.objects.insertOne({
      title: data.title,
      type: 'students',
      metadata: metadata
    });
    
    console.log('Student created successfully:', response.object.id);
    
    return NextResponse.json({ 
      success: true,
      student: response.object 
    });
  } catch (error) {
    console.error('Error creating student:', error);
    
    // Provide more detailed error information
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorDetails = error instanceof Error ? error.stack : undefined;
    
    console.error('Error details:', errorDetails);
    
    return NextResponse.json(
      { 
        error: 'Failed to create student', 
        message: errorMessage,
        details: errorDetails 
      },
      { status: 500 }
    );
  }
}