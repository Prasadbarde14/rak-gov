import React from 'react'

function GlobalContainer({children}) {
  return (
    <div className='w-screen h-screen bg-[#f1f5f9] flex '>
        {children}
    </div>
  )
}

export default GlobalContainer