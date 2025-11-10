'use client'

import { useState } from 'react'
import { Recommendation } from '@/types'

export default function RecommendationList({ 
  recommendations, 
  assessmentId 
}: { 
  recommendations: Recommendation[]
  assessmentId: string
}) {
  const [approvedIds, setApprovedIds] = useState<Set<string>>(new Set());
  
  const handleApprove = (id: string) => {
    setApprovedIds(prev => new Set(prev).add(id));
    // In production, update via API
    console.log('Approved recommendation:', id);
  };
  
  const handleReject = (id: string) => {
    // In production, update via API
    console.log('Rejected recommendation:', id);
  };
  
  const groupedRecs = recommendations.reduce((acc, rec) => {
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
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No Recommendations Generated</h3>
        <p className="text-gray-600 mb-4">Upload a counselor report to generate AI-powered recommendations</p>
        <button className="btn btn-primary">
          Upload Report
        </button>
      </div>
    );
  }
  
  return (
    <div className="card">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">AI-Generated Recommendations</h2>
      
      <div className="space-y-6">
        {categories.map(category => {
          const recs = groupedRecs[category];
          if (!recs) return null;
          
          return (
            <div key={category} className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {category}
              </h3>
              
              <div className="space-y-3">
                {recs.map(rec => {
                  const isApproved = approvedIds.has(rec.id);
                  const status = rec.metadata?.status;
                  
                  return (
                    <div
                      key={rec.id}
                      className={`flex items-start justify-between p-4 rounded-lg border ${
                        isApproved ? 'border-green-300 bg-green-50' : 'border-gray-200 bg-white'
                      }`}
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            rec.metadata?.priority === 'High' ? 'bg-red-100 text-red-800' :
                            rec.metadata?.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {rec.metadata?.priority} Priority
                          </span>
                          
                          {status && (
                            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                              {status}
                            </span>
                          )}
                        </div>
                        
                        <p className="text-gray-900 mb-1">{rec.metadata?.recommendation_text}</p>
                        <p className="text-sm text-gray-600">{rec.title}</p>
                      </div>
                      
                      {status === 'Pending' && !isApproved && (
                        <div className="flex gap-2 ml-4">
                          <button
                            onClick={() => handleApprove(rec.id)}
                            className="btn bg-green-100 text-green-700 hover:bg-green-200 text-sm px-3 py-1"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleReject(rec.id)}
                            className="btn bg-red-100 text-red-700 hover:bg-red-200 text-sm px-3 py-1"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                      
                      {isApproved && (
                        <div className="ml-4">
                          <span className="text-green-600 font-semibold">✓ Approved</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  )
}