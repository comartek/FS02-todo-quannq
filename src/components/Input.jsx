import React from 'react'


const Input = ({type, value, id, setValue,placeholder,...inputProps }) => {
  return (
    <div>
      <input className='form__control' type={type} value={value} id={id} placeholder={placeholder} onChange={(e) => setValue(e.target.value)} {...inputProps} />
      <span></span>
    </div>
  )
}



export default Input