import { Student } from '@/types'
import { getRiskColor } from '@/lib/utils'

export default function StudentList({ students }: { students: Student[] }) {
  if (!students || students.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No students found. Add your first student to get started.
      </div>
    );
  }
  
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Student
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Student ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Department
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              CGPA
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Attendance
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Risk Level
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {students.map((student) => (
            <tr key={student.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{student.title}</div>
                <div className="text-sm text-gray-500">{student.metadata?.email}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {student.metadata?.student_id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {student.metadata?.department || 'N/A'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {student.metadata?.cgpa?.toFixed(2) || 'N/A'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {student.metadata?.attendance_percentage ? `${student.metadata.attendance_percentage}%` : 'N/A'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {student.metadata?.current_risk_level ? (
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRiskColor(student.metadata.current_risk_level)}`}>
                    {student.metadata.current_risk_level}
                  </span>
                ) : (
                  <span className="text-sm text-gray-500">Not assessed</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}