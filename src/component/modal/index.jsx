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
		<>
		<div className="bg-white h-[100%] w-[90%] md:max-w-2xl opacity-1 rounded-md shadow-md max-h-[500px] relative">
			<Modal.CloseModal closeModalHandler={closeModalHandler}/>
			<div className=" flex flex-col bg-white max-h-[408px] py-5  overflow-y-auto">
				{children}
			</div>
		</div>
		</>
	)
}

export function Footer({children}){
	return (
		<div className="flex flex-col px-2 absolute left-0 bottom-0 bg-white w-full rounded-md py-5">
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