import StudentForm from '@/components/StudentForm'
import { cosmic, safeCosmicCall } from '@/lib/cosmic'
import { Counselor } from '@/types'
import Link from 'next/link'

export default async function NewStudentPage() {
  const counselors = await safeCosmicCall<Counselor>(() =>
    cosmic.objects.find({ type: 'counselors' }).props(['id', 'title', 'slug', 'metadata'])
  );
  
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Add New Student</h1>
            <Link href="/teacher/dashboard" className="text-gray-600 hover:text-gray-900">
              ← Back to Dashboard
            </Link>
          </div>
        </div>
      </nav>
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <StudentForm counselors={counselors} />
        </div>
      </div>
    </div>
  )
}