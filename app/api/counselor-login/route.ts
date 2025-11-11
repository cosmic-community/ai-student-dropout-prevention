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

    // Find counselor by email
    const response = await cosmic.objects
      .find({ type: 'counselors' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(0)

    const counselors = response.objects as Counselor[]
    const counselor = counselors.find(
      (c) => c.metadata?.email?.toLowerCase() === email.toLowerCase()
    )

    if (!counselor) {
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
      { error: 'Login failed' },
      { status: 500 }
    )
  }
}