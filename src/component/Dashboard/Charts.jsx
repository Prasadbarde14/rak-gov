import { OctagonAlert, TrendingDown, TrendingUp } from 'lucide-react'
import React from 'react'


const Skeleton = () => {
    return (
        <div class=" w-1/4 h-full max-w-sm rounded-md border border-gray-300 p-2">
            <div class="flex animate-pulse w-full h-full flex-col items-start gap-2 ">
                <div className='flex w-full  items-center gap-2'>
                    <div class="h-2 rounded w-full bg-gray-300"></div>
                    <div class="size-10 rounded-full bg-gray-300"></div>
                </div>
                <div class="h-5 rounded w-1/4 bg-gray-300"></div>
                <div class="h-2 rounded w-full bg-gray-300"></div>
                <div class="h-8 rounded w-full bg-gray-300"></div>
                <div class="h-5 rounded w-1/4 bg-gray-300"></div>
            </div>
        </div>
    )
}

const Card = (data) => {
    return (
        <div class="w-1/4 h-full max-w-sm rounded-md border border-gray-300 p-4 overflow-x-auto bg-white shadow-sm">
            <div class="flex w-full h-full flex-col items-start">
                <div className='flex w-full  items-center gap-2 items-center justify-center'>
                    <div class="w-full text-[#64748b] text-sm">{data.data.name}</div>
                    {data.data.status === "Needs attention" ? <TrendingDown color='#ef4444' /> : <TrendingUp color='#22c55e' />}
                </div>
                <div className='flex items-end gap-2 justify-center'>
                    <div className='text-2xl font-semibold '>
                        {data.data.value}
                    </div>
                    <div className='text-[#64748b]'>
                        {data.data.unit}
                    </div>
                </div>
                <div>
                    <div className='text-[#64748b] text-xs'>Progress</div>
                </div>
                <div className='flex w-full  items-center gap-2 items-center justify-between'>
                    <div className='text-sm text-[#64748b]'>
                        Target:
                        {data.data.value + " "}
                        {data.data.unit}
                    </div>
                    {data.data.status=="Needs attention" && <div className='flex text-sm justify-center items-center gap-1 text-[#eab308]'><OctagonAlert size={14} color='#eab308'/> {data.data.status}</div>}

                </div>
            </div>
        </div>)
}

function Charts({ graphData }) {

    const { data, isLoading, isError } = graphData;

    console.log(data, isLoading, isError)

    return (
        <div className='h-full'>

            {isLoading &&
                <div className='flex gap-2 w-full h-full justify-between items-center'>
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                </div>
            }

            {isError && <div>

            </div>}

            <div className='flex w-full h-full justify-between items-center'>
                {
                    !isLoading && !isError && data.map((i, indx) =>
                        <Card data={i} key={indx} />)
                }
            </div>
        </div>
    )
}

export default Charts