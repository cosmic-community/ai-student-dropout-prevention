import { RiskAssessment } from '@/types'
import { getRiskBgColor, formatDate } from '@/lib/utils'

export default function StudentRiskCard({ assessment }: { assessment: RiskAssessment }) {
  const factors = assessment.metadata?.factors;
  
  return (
    <div className="card">
      <div className="text-center mb-6">
        <div className={`inline-block px-8 py-4 rounded-lg text-white font-bold text-2xl ${getRiskBgColor(assessment.metadata?.risk_level || 'Low')}`}>
          {assessment.metadata?.risk_level || 'Unknown'} Risk
        </div>
        <p className="text-gray-600 mt-4">
          Last assessed: {assessment.metadata?.assessment_date ? formatDate(assessment.metadata.assessment_date) : 'N/A'}
        </p>
      </div>
      
      {factors && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Risk Factors Breakdown</h3>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Academic Performance</span>
                <span className="text-lg font-bold text-blue-600">{(factors.academic * 100).toFixed(0)}%</span>
              </div>
              <div className="w-full bg-blue-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${factors.academic * 100}%` }}
                />
              </div>
            </div>
            
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Attendance</span>
                <span className="text-lg font-bold text-green-600">{(factors.attendance * 100).toFixed(0)}%</span>
              </div>
              <div className="w-full bg-green-200 rounded-full h-2">
                <div
                  className="bg-green-600 h-2 rounded-full"
                  style={{ width: `${factors.attendance * 100}%` }}
                />
              </div>
            </div>
            
            <div className="p-4 bg-yellow-50 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Financial Situation</span>
                <span className="text-lg font-bold text-yellow-600">{(factors.financial * 100).toFixed(0)}%</span>
              </div>
              <div className="w-full bg-yellow-200 rounded-full h-2">
                <div
                  className="bg-yellow-600 h-2 rounded-full"
                  style={{ width: `${factors.financial * 100}%` }}
                />
              </div>
            </div>
            
            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Behavioral Indicators</span>
                <span className="text-lg font-bold text-purple-600">{(factors.behavioral * 100).toFixed(0)}%</span>
              </div>
              <div className="w-full bg-purple-200 rounded-full h-2">
                <div
                  className="bg-purple-600 h-2 rounded-full"
                  style={{ width: `${factors.behavioral * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      
      {assessment.metadata?.assigned_counselor && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Your Assigned Counselor</h3>
          <p className="text-gray-900 font-medium">{assessment.metadata.assigned_counselor.title}</p>
          <p className="text-sm text-gray-600">{assessment.metadata.assigned_counselor.metadata?.email}</p>
        </div>
      )}
    </div>
  )
}