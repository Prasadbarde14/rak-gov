import React from 'react'
import Input from '../UI/Input'
import Select from '../UI/Select'
import { Bell, Search,Settings2,Users } from 'lucide-react'
function TopNav() {
    const selectOptions = ["Director of Infrastructure","Planning Analyst","Maintenance Head"];
    return (
        <div className='bg-background-white w-full h-30 shadow-xs shadow-gray-300 fixed'>
            <div className='flex flex-row items-center gap-26'>
                <div>
                    <h2 className='text-[19px] font-bold px-7 pt-3'>Ministry of Public Works</h2>
                    <p className='text-gray-500 text-sm px-7 pt-2 pb-5'>Dashboard  •  Smart Infrastructure & Sustainability</p>
                </div>
                <div className='flex flex-row gap-6 items-center justify-between'>
                    <div className="flex border-1 border-gray-200 bg-gray-100 p-2 items-center rounded-md">
                    <Search size={16} color="#3f3f3f"/>
                    <Input placeholder={"Search..."} type={"text"} className={" pl-2 rounded-md text-sm outline:none"}/>
                    </div>
                    <div className='flex'>
                        <Users size={18} color="#6b7280"/>
                        <Select options={selectOptions} className={"text-sm px-4"}/>
                    </div>
                    <Settings2 size={20} color='#475569'/>
                    <div className='relative hover:bg-gray-200 rounded-full p-2'>
                        <div className='px-1 items-center justify-center rounded-2xl bg-red-500 absolute top-0 right-0 text-xs text-white'><p>3</p></div>
                    <Bell size={18}/>
                    </div>
                </div>
                <div></div>
            </div>
            <hr className='border-gray-300'/>
            <div></div>
            
        </div>
    )
}

export default TopNav