import React from 'react'

const Input = ({type,placeholder,onChange,className}) => {
  return (
    <input type={type} placeholder={placeholder} onChange={onChange} className={className} ></input>
  )
}

export default Input