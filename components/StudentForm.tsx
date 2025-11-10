'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { StudentFormData, Counselor } from '@/types'

export default function StudentForm({ counselors }: { counselors: Counselor[] }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<StudentFormData>({
    title: '',
    email: '',
    student_id: '',
    department: '',
    semester: 1,
    attendance_percentage: 0,
    cgpa: 0,
    subjects: [],
    financial_status: 'Stable',
    part_time_job: false,
  });
  
  const [subjects, setSubjects] = useState([
    { name: '', marks: 0, grade: '' }
  ]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const inputValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) : inputValue
    }));
  };
  
  const handleSubjectChange = (index: number, field: string, value: string | number) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[index] = {
      ...updatedSubjects[index],
      [field]: value
    };
    setSubjects(updatedSubjects);
  };
  
  const addSubject = () => {
    setSubjects([...subjects, { name: '', marks: 0, grade: '' }]);
  };
  
  const removeSubject = (index: number) => {
    setSubjects(subjects.filter((_, i) => i !== index));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Predict risk
      const predictionResponse = await fetch('/api/predict-risk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          attendance_percentage: formData.attendance_percentage,
          cgpa: formData.cgpa,
          semester: formData.semester,
          financial_status: formData.financial_status,
          part_time_job: formData.part_time_job,
          subject_performance: subjects.reduce((sum, s) => sum + s.marks, 0) / subjects.length
        })
      });
      
      const prediction = await predictionResponse.json();
      
      // Create student with risk assessment
      const studentData = {
        ...formData,
        subjects: subjects.filter(s => s.name && s.marks)
      };
      
      // In production, create student and assessment via API
      console.log('Student data:', studentData);
      console.log('Prediction:', prediction);
      
      // Redirect to recommendations page
      router.push(`/teacher/dashboard`);
    } catch (error) {
      console.error('Error creating student:', error);
      alert('Failed to create student assessment');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="card space-y-6">
      <div className="border-b border-gray-200 pb-4">
        <h2 className="text-2xl font-bold text-gray-900">Student Information</h2>
        <p className="text-gray-600 mt-1">Enter student details for risk assessment</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="title" className="label">Full Name *</label>
          <input
            type="text"
            id="title"
            name="title"
            className="input"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div>
          <label htmlFor="student_id" className="label">Student ID *</label>
          <input
            type="text"
            id="student_id"
            name="student_id"
            className="input"
            value={formData.student_id}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div>
          <label htmlFor="email" className="label">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            className="input"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div>
          <label htmlFor="department" className="label">Department</label>
          <input
            type="text"
            id="department"
            name="department"
            className="input"
            value={formData.department}
            onChange={handleInputChange}
          />
        </div>
        
        <div>
          <label htmlFor="semester" className="label">Semester *</label>
          <input
            type="number"
            id="semester"
            name="semester"
            className="input"
            min="1"
            max="8"
            value={formData.semester}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div>
          <label htmlFor="attendance_percentage" className="label">Attendance % *</label>
          <input
            type="number"
            id="attendance_percentage"
            name="attendance_percentage"
            className="input"
            min="0"
            max="100"
            step="0.1"
            value={formData.attendance_percentage}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div>
          <label htmlFor="cgpa" className="label">CGPA *</label>
          <input
            type="number"
            id="cgpa"
            name="cgpa"
            className="input"
            min="0"
            max="10"
            step="0.01"
            value={formData.cgpa}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div>
          <label htmlFor="financial_status" className="label">Financial Status</label>
          <select
            id="financial_status"
            name="financial_status"
            className="input"
            value={formData.financial_status}
            onChange={handleInputChange}
          >
            <option value="Stable">Stable</option>
            <option value="Moderate Stress">Moderate Stress</option>
            <option value="High Stress">High Stress</option>
          </select>
        </div>
      </div>
      
      <div>
        <label className="flex items-center">
          <input
            type="checkbox"
            name="part_time_job"
            className="mr-2"
            checked={formData.part_time_job}
            onChange={handleInputChange}
          />
          <span className="text-sm text-gray-700">Student has part-time job</span>
        </label>
      </div>
      
      <div className="border-t border-gray-200 pt-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Subject Performance</h3>
          <button
            type="button"
            onClick={addSubject}
            className="btn btn-secondary text-sm"
          >
            + Add Subject
          </button>
        </div>
        
        <div className="space-y-4">
          {subjects.map((subject, index) => (
            <div key={index} className="grid md:grid-cols-4 gap-4 items-end">
              <div className="md:col-span-2">
                <label className="label">Subject Name</label>
                <input
                  type="text"
                  className="input"
                  value={subject.name}
                  onChange={(e) => handleSubjectChange(index, 'name', e.target.value)}
                  placeholder="e.g., Mathematics"
                />
              </div>
              <div>
                <label className="label">Marks</label>
                <input
                  type="number"
                  className="input"
                  min="0"
                  max="100"
                  value={subject.marks}
                  onChange={(e) => handleSubjectChange(index, 'marks', parseFloat(e.target.value))}
                />
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => removeSubject(index)}
                  className="btn bg-red-100 text-red-600 hover:bg-red-200 w-full"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex gap-4 pt-6 border-t border-gray-200">
        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary flex-1"
        >
          {loading ? 'Processing...' : 'Predict Risk & Assign Counselor'}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="btn btn-secondary"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}