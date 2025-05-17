import React from 'react'
import Input from '../UI/Input'
import Select from '../UI/Select'
import { Search } from 'lucide-react'
function TopNav() {
    return (
        <div className='bg-background-light w-full h-34 shadow-xs shadow-gray-300'>
            <div className='flex flex-row items-center justify-even'>
                <div>
                    <h2 className='text-[19px] font-bold px-7 pt-3'>Ministry of Public Works</h2>
                    <p className='text-gray-500 text-sm px-7 pt-2 pb-5'>Dashboard  •  Smart Infrastructure & Sustainability</p>
                </div>
                <div className='flex flex-row gap-4'>
                    <div className="flex border-1 border-gray-200 bg-gray-200 p-2 items-center rounded-md">
                    <Search size={16} color="#3f3f3f"/>
                    <Input placeholder={"Search"} type={"text"} className={" pl-4 rounded-md text-sm outline:none"}/>
                    </div>
                    <div>
                        <Select options={[1,2,3,4]}/>
                    </div>
                </div>
            </div>
            <hr className='border-gray-300'/>
            <div></div>
            
        </div>
    )
}

export default TopNav