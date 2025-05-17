import React from 'react'

function GlobalContainer({children}) {
  return (
    <div className='w-screen h-screen bg-gray-200 flex '>
        {children}
    </div>
  )
}

export default GlobalContainer