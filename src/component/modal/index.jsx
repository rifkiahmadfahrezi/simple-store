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
		<div className="bg-white w-[90%] md:max-w-xl opacity-1 rounded-md shadow-md max-h-[350px] w-[500px] relative p-3">
			<Modal.CloseModal closeModalHandler={closeModalHandler}/>
			<div className="mt-5 flex flex-col  max-h-[300px] py-5 overflow-y-auto">
				{children}
			</div>
		</div>
	)
}

export function CloseModal({closeModalHandler}){
	return(
		<button 
			type="button" 
			className="text-white bg-red-500 rounded-full py-1 px-2 text-bold text-2xl hover:bg-red-600 absolute top-[-10px] right-[-10px]" 
			onClick={()=> closeModalHandler()}>
			<i className='bx bx-x'></i>
		</button>
	)
}

// export function Content({src, title, price, minBtn, plusBtn, qty}){
// 	return (
// 		<div className="flex gap-3">
// 			<figure>
// 				<img 
// 				src="https://i.dummyjson.com/data/products/18/thumbnail.jpg" 
// 				alt="image of products"
// 				className="object-contain w-[100px] h-[100px]"/>
// 			</figure>
// 			<figcaption className="flex flex-col justify-between">
// 				<div>
// 					<h4 className="font-semibold">Test judul produk</h4>
// 					<h6 className="font-reguler">$ price</h6>
// 				</div>

// 				<form className="flex border border-1-indigo-100 rounded-sm">
// 					<button 
// 						type="button"
// 						className="bg-indigo-50 py-1 px-2">
// 						<i className='bx bx-minus'></i>
// 					</button>
// 					<input className="w-[60px] text-center" type="number" value="0"/>
// 					<button 
// 						type="button"
// 						className="bg-indigo-50 py-1 px-2">
// 						<i className='bx bx-plus'></i>
// 					</button>
// 				</form>
// 			</figcaption>
// 		</div>
// 	)
// }

Modal.Body = Body
Modal.CloseModal = CloseModal
// Modal.Content = Content