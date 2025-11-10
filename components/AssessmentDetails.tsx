import { RiskAssessment } from '@/types'
import { formatDate, getRiskBgColor } from '@/lib/utils'

export default function AssessmentDetails({ assessment }: { assessment: RiskAssessment }) {
  const student = assessment.metadata?.student;
  const factors = assessment.metadata?.factors;
  
  return (
    <div className="card">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Risk Assessment</h2>
          <p className="text-gray-600">
            Assessment for {student?.title || 'Unknown Student'}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Date: {assessment.metadata?.assessment_date ? formatDate(assessment.metadata.assessment_date) : 'N/A'}
          </p>
        </div>
        
        <div className={`px-6 py-3 rounded-lg text-white font-bold text-lg ${getRiskBgColor(assessment.metadata?.risk_level || 'Low')}`}>
          {assessment.metadata?.risk_level || 'Unknown'} Risk
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Student Information</h3>
          <dl className="space-y-2">
            <div className="flex justify-between">
              <dt className="text-sm text-gray-600">Student ID:</dt>
              <dd className="text-sm font-medium text-gray-900">{student?.metadata?.student_id || 'N/A'}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-sm text-gray-600">Department:</dt>
              <dd className="text-sm font-medium text-gray-900">{student?.metadata?.department || 'N/A'}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-sm text-gray-600">Semester:</dt>
              <dd className="text-sm font-medium text-gray-900">{student?.metadata?.semester || 'N/A'}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-sm text-gray-600">CGPA:</dt>
              <dd className="text-sm font-medium text-gray-900">
                {student?.metadata?.cgpa ? student.metadata.cgpa.toFixed(2) : 'N/A'}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-sm text-gray-600">Attendance:</dt>
              <dd className="text-sm font-medium text-gray-900">
                {student?.metadata?.attendance_percentage ? `${student.metadata.attendance_percentage}%` : 'N/A'}
              </dd>
            </div>
          </dl>
        </div>
        
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Risk Factors</h3>
          {factors ? (
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Academic</span>
                  <span className="font-medium">{(factors.academic * 100).toFixed(0)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${factors.academic * 100}%` }}
                  />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Attendance</span>
                  <span className="font-medium">{(factors.attendance * 100).toFixed(0)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full"
                    style={{ width: `${factors.attendance * 100}%` }}
                  />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Financial</span>
                  <span className="font-medium">{(factors.financial * 100).toFixed(0)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-600 h-2 rounded-full"
                    style={{ width: `${factors.financial * 100}%` }}
                  />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Behavioral</span>
                  <span className="font-medium">{(factors.behavioral * 100).toFixed(0)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-purple-600 h-2 rounded-full"
                    style={{ width: `${factors.behavioral * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-500">No factor breakdown available</p>
          )}
        </div>
      </div>
      
      {assessment.metadata?.assigned_counselor && (
        <div className="border-t border-gray-200 pt-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Assigned Counselor</h3>
          <p className="text-sm text-gray-900">{assessment.metadata.assigned_counselor.title}</p>
          <p className="text-sm text-gray-500">{assessment.metadata.assigned_counselor.metadata?.email}</p>
        </div>
      )}
    </div>
  )
}