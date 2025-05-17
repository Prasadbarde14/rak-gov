import React from 'react'

function GlobalContainer({children}) {
  return (
    <div className='w-screen h-screen bg-background-light flex '>
        {children}
    </div>
  )
}

export default GlobalContainer