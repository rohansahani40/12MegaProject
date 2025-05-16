import React from 'react'

const Select = ({
    options,
    label,
    className,
    ...props
},ref) => {
    const id= useId()
  return (
    <div className='w-full'>
        {label && <label> </label>}
        <select
        id={id}
        ref={ref}
        className={`px-3 py-2 rounded-lg bg-white text-black
            duration-200 border border-gray-200 w-full
            ${className}`}
        >
            {
                options?.map((option)=>(
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))
            }
        </select>
      
    </div>
  )
}

export default React.forwardRef(Select)
