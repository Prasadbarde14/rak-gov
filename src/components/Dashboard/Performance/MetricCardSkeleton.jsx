const MetricCardSkeleton = () => {
  return (
    <div className="p-4 rounded-xl shadow-sm bg-gray-50 space-y-2 animate-pulse">
      {/* Title and values */}
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-2 w-1/2">
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        </div>
        <div className="flex flex-col gap-2 items-end w-1/2">
          <div className="h-4 bg-gray-300 rounded w-1/4"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>

      {/* Divider */}
      <hr className="border border-gray-100" />

      {/* Impact Analysis section */}
      <div className="space-y-2 mt-2">
        <div className="h-4 bg-gray-300 rounded w-1/3"></div>
        <div className="h-3 bg-gray-200 rounded w-2/3"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
      </div>

      {/* Recommendations section */}
      <div className="space-y-2 mt-4">
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        <div className="h-3 bg-gray-200 rounded w-full"></div>
        <div className="h-3 bg-gray-200 rounded w-5/6"></div>
        <div className="h-3 bg-gray-200 rounded w-full"></div>
      </div>
    </div>
  );
};

export default MetricCardSkeleton;
