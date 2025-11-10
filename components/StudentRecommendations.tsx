import { Recommendation } from '@/types'

export default function StudentRecommendations({ recommendations }: { recommendations: Recommendation[] }) {
  const approvedRecs = recommendations.filter(rec => rec.metadata?.approved_by_teacher);
  
  const groupedRecs = approvedRecs.reduce((acc, rec) => {
    const category = rec.metadata?.category || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(rec);
    return acc;
  }, {} as Record<string, Recommendation[]>);
  
  const categories = Object.keys(groupedRecs);
  
  if (categories.length === 0) {
    return (
      <div className="card text-center">
        <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No Recommendations Yet</h3>
        <p className="text-gray-600">Your teacher will review and approve recommendations for you soon.</p>
      </div>
    );
  }
  
  return (
    <div className="card">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Personalized Recommendations</h2>
      <p className="text-gray-600 mb-6">
        These interventions have been approved by your teacher to help support your academic success.
      </p>
      
      <div className="space-y-6">
        {categories.map(category => {
          const recs = groupedRecs[category];
          if (!recs) return null;
          
          return (
            <div key={category} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-4">
                <div className={`w-3 h-3 rounded-full ${
                  category === 'Academic' ? 'bg-blue-500' :
                  category === 'Financial' ? 'bg-green-500' :
                  category === 'Emotional/Psychological' ? 'bg-purple-500' :
                  category === 'Social/Peer' ? 'bg-yellow-500' :
                  'bg-gray-500'
                }`} />
                <h3 className="text-lg font-semibold text-gray-900">{category}</h3>
              </div>
              
              <div className="space-y-3">
                {recs.map(rec => (
                  <div
                    key={rec.id}
                    className="p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        rec.metadata?.priority === 'High' ? 'bg-red-100 text-red-800' :
                        rec.metadata?.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {rec.metadata?.priority} Priority
                      </span>
                      
                      {rec.metadata?.status && (
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          rec.metadata.status === 'Completed' ? 'bg-green-100 text-green-800' :
                          rec.metadata.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {rec.metadata.status}
                        </span>
                      )}
                    </div>
                    
                    <p className="text-gray-900 font-medium mb-2">
                      {rec.metadata?.recommendation_text}
                    </p>
                    
                    <p className="text-sm text-gray-600">{rec.title}</p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  )
}