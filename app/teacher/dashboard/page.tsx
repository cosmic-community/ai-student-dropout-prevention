import Link from 'next/link'
import { cosmic, safeCosmicCall } from '@/lib/cosmic'
import { Student, RiskAssessment } from '@/types'
import StudentList from '@/components/StudentList'

export default async function TeacherDashboardPage() {
  const students = await safeCosmicCall<Student>(() =>
    cosmic.objects.find({ type: 'students' }).props(['id', 'title', 'slug', 'metadata']).depth(1)
  );
  
  const assessments = await safeCosmicCall<RiskAssessment>(() =>
    cosmic.objects.find({ type: 'risk-assessments' }).props(['id', 'title', 'metadata']).depth(1)
  );
  
  const highRiskCount = assessments.filter(a => 
    a.metadata?.risk_level === 'High' || a.metadata?.risk_level === 'Very High'
  ).length;
  
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Teacher Dashboard</h1>
            <Link href="/" className="text-gray-600 hover:text-gray-900">
              Logout
            </Link>
          </div>
        </div>
      </nav>
      
      <div className="container mx-auto px-4 py-8">
        {/* Statistics Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Students</p>
                <p className="text-3xl font-bold text-gray-900">{students.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Assessed</p>
                <p className="text-3xl font-bold text-gray-900">{assessments.length}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">High Risk</p>
                <p className="text-3xl font-bold text-red-600">{highRiskCount}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
            </div>
          </div>
          
          <Link href="/teacher/student/new" className="block">
            <div className="card hover:shadow-lg transition-shadow cursor-pointer h-full flex items-center justify-center bg-primary text-white">
              <div className="text-center">
                <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <p className="font-semibold">Add New Student</p>
              </div>
            </div>
          </Link>
        </div>
        
        {/* Student List */}
        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Students</h2>
          <StudentList students={students} />
        </div>
      </div>
    </div>
  )
}