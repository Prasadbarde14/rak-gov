import React from 'react'
import { Outlet } from 'react-router-dom'
import SideNav from '../component/Dashboard/SideNav'
import TopNav from '../component/Dashboard/TopNav'
import GlobalContainer from '../component/Global/GlobalContainer'
import { useGetAllProducts } from '../API/Query/query'
import AIrecommendations from '../component/Dashboard/AIrecommendations'

function Dashboard() {

    const data = useGetAllProducts("/products")

    console.log(data.isLoading)

    return (
        <GlobalContainer>
            <SideNav />

            <div className='flex flex-col w-full h-full '>
                <TopNav />

                <div className='p-5 flex flex-col gap-5 h-full'>
                    <div className='bg-gray-100 h-96 '>
                        Sainssh
                    </div>

                    <div className=' flex  justify-between items-center w-full h-auto gap-5'>
                        <div className='w-full bg-blue-300 h-full'>

                            <div class=" p-4 bg-accent-green">Card Background</div>


                        </div>
                        <div className='w-96 border rounded-r-sm  h-full'><AIrecommendations/></div>
                    </div>

                </div>

            </div >
        </GlobalContainer>
    )
}

export default Dashboard