import React from 'react'

const Select = ({options}) => {
  return (
    <select>
        {options.map((item,idx)=>{
            <option key={idx}>item</option>
        })}
    </select>
  )
}

export default Select