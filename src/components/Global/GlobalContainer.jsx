import React from 'react'

function GlobalContainer({children}) {
  return (
    <div className='w-screen h-screen bg-[#F1F5F9] flex '>
        {children}
    </div>
  )
}

export default GlobalContainer