import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            AI Student Dropout Prevention System
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Intelligent platform for predicting student dropout risk and providing AI-powered intervention recommendations
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Teacher Portal */}
          <Link href="/teacher/login" className="group">
            <div className="card hover:shadow-xl transition-shadow duration-300 h-full">
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                  <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Teacher Portal</h2>
                <p className="text-gray-600">
                  Enter student data, predict dropout risk, assign counselors, and manage interventions
                </p>
              </div>
            </div>
          </Link>
          
          {/* Student Portal */}
          <Link href="/student/login" className="group">
            <div className="card hover:shadow-xl transition-shadow duration-300 h-full">
              <div className="text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                  <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Student Portal</h2>
                <p className="text-gray-600">
                  View your risk assessment, personalized recommendations, and track intervention progress
                </p>
              </div>
            </div>
          </Link>
          
          {/* Counselor Portal */}
          <Link href="/counselor/login" className="group">
            <div className="card hover:shadow-xl transition-shadow duration-300 h-full">
              <div className="text-center">
                <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
                  <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Counselor Portal</h2>
                <p className="text-gray-600">
                  Manage assigned students, upload reports, and monitor intervention outcomes
                </p>
              </div>
            </div>
          </Link>
        </div>
        
        <div className="mt-16 text-center">
          <div className="inline-block bg-white rounded-lg shadow-md p-8 max-w-3xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">How It Works</h3>
            <div className="space-y-4 text-left">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">1</div>
                <div>
                  <h4 className="font-semibold text-gray-900">Teacher enters student data</h4>
                  <p className="text-gray-600">Input academic performance, attendance, and other relevant information</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">2</div>
                <div>
                  <h4 className="font-semibold text-gray-900">AI predicts dropout risk</h4>
                  <p className="text-gray-600">Machine learning model analyzes data and classifies risk level</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">3</div>
                <div>
                  <h4 className="font-semibold text-gray-900">Student assigned to counselor</h4>
                  <p className="text-gray-600">High-risk students automatically routed to appropriate counselor</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">4</div>
                <div>
                  <h4 className="font-semibold text-gray-900">AI generates recommendations</h4>
                  <p className="text-gray-600">Personalized interventions across academic, financial, emotional, social, and time management categories</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">5</div>
                <div>
                  <h4 className="font-semibold text-gray-900">Teacher reviews and approves</h4>
                  <p className="text-gray-600">Review AI suggestions and approve relevant interventions</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}