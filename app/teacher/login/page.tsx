import Link from 'next/link'

export default function TeacherLoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Teacher Portal</h1>
          <p className="text-gray-600">Sign in to access student management</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-xl p-8">
          <form className="space-y-6">
            <div>
              <label htmlFor="email" className="label">Email Address</label>
              <input
                type="email"
                id="email"
                className="input"
                placeholder="teacher@institution.edu"
                required
              />
            </div>
            
            <div>
              <label htmlFor="password" className="label">Password</label>
              <input
                type="password"
                id="password"
                className="input"
                placeholder="••••••••"
                required
              />
            </div>
            
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-sm text-primary hover:underline">
                Forgot password?
              </a>
            </div>
            
            <Link href="/teacher/dashboard" className="block">
              <button type="button" className="btn btn-primary w-full">
                Sign In
              </button>
            </Link>
          </form>
        </div>
        
        <div className="text-center mt-6">
          <Link href="/" className="text-gray-600 hover:text-gray-900">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}