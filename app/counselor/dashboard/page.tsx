import Link from 'next/link'
import { cosmic, safeCosmicCall } from '@/lib/cosmic'
import { RiskAssessment, Student } from '@/types'

export default async function CounselorDashboardPage({
  searchParams
}: {
  searchParams: { counselorId?: string }
}) {
  const counselorId = searchParams.counselorId

  if (!counselorId) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-6">Please log in to access the counselor dashboard.</p>
          <Link href="/counselor/login" className="btn btn-primary">
            Go to Login
          </Link>
        </div>
      </div>
    )
  }

  // Fetch counselor data
  const counselorResponse = await cosmic.objects
    .findOne({ type: 'counselors', id: counselorId })
    .props(['id', 'title', 'slug', 'metadata'])
    .depth(0)

  const counselor = counselorResponse.object

  // Fetch assessments assigned to this counselor
  const assessments = await safeCosmicCall<RiskAssessment>(async () =>
    await cosmic.objects
      .find({ type: 'risk-assessments' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
  )

  const myAssessments = assessments.filter(
    (a) => a.metadata?.assigned_counselor?.id === counselorId
  )

  const highRiskCount = myAssessments.filter(
    (a) => a.metadata?.risk_level === 'High' || a.metadata?.risk_level === 'Very High'
  ).length

  const pendingCount = myAssessments.filter(
    (a) => a.metadata?.status === 'Assigned' || a.metadata?.status === 'Pending'
  ).length

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Counselor Dashboard</h1>
              <p className="text-sm text-gray-600">{counselor?.title}</p>
            </div>
            <Link href="/counselor/login" className="text-gray-600 hover:text-gray-900">
              Logout
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Statistics Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Assigned Students</p>
                <p className="text-3xl font-bold text-gray-900">{myAssessments.length}</p>
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
                <p className="text-sm text-gray-600 mb-1">High Risk Cases</p>
                <p className="text-3xl font-bold text-red-600">{highRiskCount}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Pending Reviews</p>
                <p className="text-3xl font-bold text-yellow-600">{pendingCount}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Assigned Students List */}
        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-4">My Assigned Students</h2>
          
          {myAssessments.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No students assigned yet.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Student
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Risk Level
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Assessment Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {myAssessments.map((assessment) => {
                    const student = assessment.metadata?.student as Student
                    return (
                      <tr key={assessment.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{student?.title}</div>
                          <div className="text-sm text-gray-500">{student?.metadata?.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            assessment.metadata?.risk_level === 'Very High' ? 'bg-red-100 text-red-800' :
                            assessment.metadata?.risk_level === 'High' ? 'bg-orange-100 text-orange-800' :
                            assessment.metadata?.risk_level === 'Moderate' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {assessment.metadata?.risk_level}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {assessment.metadata?.assessment_date
                            ? new Date(assessment.metadata.assessment_date).toLocaleDateString()
                            : 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            assessment.metadata?.status === 'Completed' ? 'bg-green-100 text-green-800' :
                            assessment.metadata?.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {assessment.metadata?.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <Link
                            href={`/counselor/assessment/${assessment.id}`}
                            className="text-primary hover:text-primary-dark font-medium"
                          >
                            View Details
                          </Link>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}