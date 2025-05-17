import { ChevronRight, House } from 'lucide-react'
import React from 'react'
import { useGetGraphData } from '../../API/Query/query';
import Charts from './Charts';

const BreadCrumb = ({ breadCrumbArray }) => {
    
    const iconSize = 16;

    return (
        <div className='flex items-center gap-4'>
            <House color='#64748b' className='font-thin cursor-pointer hover:text-black text-sm' size={iconSize} />
            {
                breadCrumbArray.map((i, indx) =>
                    <>
                        <p key={indx} className={`${breadCrumbArray.length - 1 != indx ? ' text-[#64748b] font-thin cursor-pointer hover:text-black' : 'text-black font-[500] '} text-sm`}>{i}</p>
                        {breadCrumbArray.length - 1 != indx && <ChevronRight color='#64748b' key={i} className='text-sm' size={iconSize} />}
                    </>
                )
            }
        </div>

    )

}

function TopAnalyisis() {

    const data = useGetGraphData()
    const breadCrumbArray = [
        "Department",
        "Ministry of Public",
        "Dashboard"
    ]



    return (
        <div className='flex flex-col gap-4 w-full h-full'>
            <BreadCrumb breadCrumbArray={breadCrumbArray} />
            <Charts graphData={data} />
        </div>
    )
}

export default TopAnalyisis