import React from 'react'

export default function Alert({bg = "bg-green-500", text}){
	return(
		<div className={`fixed z-[99] top-[85px] w-full flex items-center ${bg} text-white text-sm font-bold px-4 py-3`} role="alert">
		  <i className='bx bx-info-circle text-xl'></i>
		  <p className="mx-1 ">{text}</p>
		</div>
	)
}