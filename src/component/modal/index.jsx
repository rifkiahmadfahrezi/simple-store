import React from 'react'

export default function Modal({children}){
	return(
		<div 
			className="fixed z-30 w-screen h-screen bg-[rgba(0,0,0,0.3)] inset-0 grid place-items-center">
			{children}
		</div>
	)
}

export function Body({closeModalHandler, children}){
	return (
		<div className="bg-red-500 z-[-1] w-[90%] h-[90%] md:max-w-2xl rounded-md shadow-md max-h-[500px] relative">
			<Modal.CloseModal closeModalHandler={closeModalHandler}/>
			<div className="flex rounded-md flex-col bg-white max-h-[420px] py-5 mb-[200px] overflow-y-auto">
				{children}
			</div>
		</div>
	)
}

export function Footer({children}){
	return (
		<div className="flex flex-col px-2 absolute bottom-0 left-0 bg-slate-50 w-full rounded-md py-5">
			{children}
		</div>
	)
}

export function CloseModal({closeModalHandler}){
	return(
		<button 
			type="button" 
			className="text-white z-[99] bg-red-500 rounded-full py-1 px-2 text-bold text-2xl hover:bg-red-600 absolute top-[-10px] right-[-10px]" 
			onClick={()=> closeModalHandler()}>
			<i className='bx bx-x'></i>
		</button>
	)
}

Modal.Body = Body
Modal.CloseModal = CloseModal
Modal.Footer = Footer