import React from 'react'

const Input = ({type, placeholder}) => {
  return (
    <div>
        <input type={type} placeholder={placeholder} />
        <span></span>
    </div>
  )
}

export default Input