import { NextRequest, NextResponse } from 'next/server'
import { cosmic } from '@/lib/cosmic'
import { StudentFormData } from '@/types'

export async function POST(request: NextRequest) {
  try {
    const data: StudentFormData = await request.json();
    
    // Validate required fields
    if (!data.title || !data.email || !data.student_id) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Create student object
    const response = await cosmic.objects.insertOne({
      title: data.title,
      type: 'students',
      metadata: {
        email: data.email,
        student_id: data.student_id,
        department: data.department || '',
        semester: data.semester || 1,
        attendance_percentage: data.attendance_percentage || 0,
        cgpa: data.cgpa || 0,
        subjects: data.subjects || [],
        financial_status: data.financial_status || 'Stable',
        part_time_job: data.part_time_job || false
      }
    });
    
    return NextResponse.json({ 
      success: true,
      student: response.object 
    });
  } catch (error) {
    console.error('Error creating student:', error);
    return NextResponse.json(
      { error: 'Failed to create student' },
      { status: 500 }
    );
  }
}