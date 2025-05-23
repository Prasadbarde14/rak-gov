import { CirclePlus, PenTool, Wrench } from "lucide-react";
import { useGetMaintenanceData } from "../../../API/Query/query";
import { usePostGetMaintanenceOverview } from "../../../API/Query/query";


const MaintenanceOverview = ({selected,index,parentData}) => {

  const data=usePostGetMaintanenceOverview("Give me Overview data",selected,index,parentData,true)
  console.log(data.data)
  return (
    <div className="bg-white space-y-6 rounded-md shadow-sm border mt-5">
      <div className="  rounded p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <PenTool className="text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-800">Overview</h2>
          </div>
          <button className="text-blue-600 hover:underline text-sm font-medium flex gap-1 items-center cursor-pointer">
            <CirclePlus className="w-4 h-4" />
            New Maintenance Task
          </button>
        </div>

        {data?.isLoading ||
          data?.isFetching && (
            <div className="grid grid-cols-2 gap-4 mb-6 animate-pulse">
              <div className="bg-gray-200 h-20 rounded-lg"></div>
              <div className="bg-gray-200 h-20 rounded-lg"></div>
            </div>
          )}

        {!data?.isLoading && !data?.isError && !data.isFetching && (
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-[#fffbeb] text-yellow-800 rounded-lg p-4">
              <p className="text-sm font-semibold">High Priority Defects</p>
              <p className="text-2xl font-bold">
                {data?.data?.highPriorityDefects}
              </p>
              <p className="text-xs">Requires immediate attention</p>
            </div>
            <div className="bg-[#f0fdf4] text-green-800 rounded-lg p-4">
              <p className="text-sm font-semibold">Completed Repairs</p>
              <p className="text-2xl font-bold">
                {data?.data?.completedRepairs}
              </p>
              <p className="text-xs">This week</p>
            </div>
          </div>
        )}

        {!data.isLoading && !data.isError && !data.isRefetching && <div className="space-y-4">
          {data?.data?.defects?.map((defect) => (
            <div
              key={defect?.id}
              className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex justify-between items-start hover:shadow"
            >
              <div>
                <h3 className="text-sm font-semibold text-gray-800">
                  {defect?.title}
                </h3>
                <p className="text-sm text-gray-600">{defect?.description}</p>
                <p className="text-xs text-gray-400 mt-1">
                  Reported: {defect?.reportedAgo}
                </p>
              </div>
              <div className="flex flex-col items-end">
                <span className={`${defect?.priority==="Critical"? "bg-red-100 text-red-800":""} ${defect?.priority==="High"? "bg-orange-100 text-orange-800":""} ${defect?.priority==="Medium"? "bg-yellow-100 text-yellow-800":""} ${defect?.priority==="Low"? "bg-green-100 text-green-800":""}  text-xs font-semibold px-2 py-1 rounded mb-2`}>
                 {defect?.priority} Priority
                </span>
                <button className="text-blue-600 text-sm hover:underline">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>}
      </div>
    </div>
  );
};

export default MaintenanceOverview;
