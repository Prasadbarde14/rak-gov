import React from 'react'

function SkeletonRecommendationCard() {
  return (
    <div className="border-l-4 border-gray-300 bg-white shadow-md p-4 rounded-md space-y-2 w-full animate-pulse">
    <div className="flex items-center justify-between text-xs text-gray-400 font-semibold uppercase">
      <span className="flex items-center gap-1">
        <div className="w-4 h-4 bg-gray-300 rounded-full" />
        <div className="w-24 h-3 bg-gray-300 rounded" />
      </span>
      <div className="w-16 h-3 bg-gray-300 rounded" />
    </div>
    <div className="w-full h-4 bg-gray-300 rounded text-justify"></div>
    <div className="w-5/6 h-3 bg-gray-300 rounded text-justify"></div>
    <div className="bg-gray-100 p-2 rounded-md">
      <div className="w-full h-3 bg-gray-300 rounded mb-2"></div>
      <div className="w-3/4 h-3 bg-gray-300 rounded"></div>
    </div>
    <div className="w-full h-8 bg-gray-300 rounded-md mt-1"></div>
  </div>
  )
}

export default SkeletonRecommendationCard