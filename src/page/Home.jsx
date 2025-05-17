import React from 'react'
import { Outlet } from 'react-router-dom'
import SideNav from '../component/Dashboard/SideNav'
import TopNav from '../component/Dashboard/TopNav'
import GlobalContainer from '../component/Global/GlobalContainer'
import { useGetAllProducts } from '../API/Query/query'

function Home() {

    const data=useGetAllProducts("/products")

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

                    <div className=' flex  justify-between items-center w-full h-full gap-5'>
                        <div className='w-full bg-blue-300 h-full'>Sai Kiram</div>
                        <div className='w-96 bg-pink-300 h-full'>Prasad Bhai</div>
                    </div>
                    
                </div>

            </div >
        </GlobalContainer>
    )
}

export default Home