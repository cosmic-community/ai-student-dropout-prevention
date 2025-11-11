import { NextRequest, NextResponse } from 'next/server'
import { cosmic } from '@/lib/cosmic'
import { Counselor } from '@/types'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Find counselor by email with proper error handling
    let counselors: Counselor[] = []
    
    try {
      const response = await cosmic.objects
        .find({ type: 'counselors' })
        .props(['id', 'title', 'slug', 'metadata'])
        .depth(0)
      
      counselors = response.objects as Counselor[]
    } catch (cosmicError: any) {
      // Handle 404 (no counselors found) or other Cosmic errors
      console.error('Cosmic query error:', cosmicError)
      if (cosmicError.status === 404) {
        return NextResponse.json(
          { error: 'No counselors found in the system' },
          { status: 404 }
        )
      }
      throw cosmicError
    }

    // Find counselor with matching email
    const counselor = counselors.find(
      (c) => c.metadata?.email?.toLowerCase().trim() === email.toLowerCase().trim()
    )

    if (!counselor) {
      console.log('Available counselor emails:', counselors.map(c => c.metadata?.email))
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // In production, verify password hash
    // For demo, accept any password for existing counselors
    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    return NextResponse.json({
      success: true,
      counselor: {
        id: counselor.id,
        title: counselor.title,
        email: counselor.metadata?.email,
        specialization: counselor.metadata?.specialization
      }
    })
  } catch (error) {
    console.error('Error during counselor login:', error)
    return NextResponse.json(
      { error: 'Login failed. Please try again.' },
      { status: 500 }
    )
  }
}