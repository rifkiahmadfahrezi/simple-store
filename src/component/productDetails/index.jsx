import React from 'react'
import Link from '../elements/link/Link'

import { getDiscountedPrice } from '../../utils/tools.js'


export default function ProductDetails({id = 1, children}){
	return(
		<div className="container flex-col md:flex-row mx-auto mx-auto w-[90%] sm:w-full mt-6 flex justify-between gap-[25px]">
			{children}
		</div>
	)
}

export function thumbnail({src, discount = 0, children}){
	return (
		<div className="flex flex-col w-full">
			<div className="relative overflow-hidden">
				{discount > 0 && <span className="absolute top-0 right-0 bg-indigo-600 p-3 text-white text-sm">- {discount}%</span>}
				<img src={src} className="rounded-md h-[400px] object-contain" width="100%" alt="ok"/>
			</div>
			<div className="flex justify-start items-center gap-[10px] mt-5 h-[100px]">
				{children}
			</div>
		</div>
	)
}

export function information({title, price, discount, actualPrice, description, brand, id, stock ,addToCartHandler}){
	return (
		<div className="w-full flex flex-col justify-between items-start mt-4">
			<div>
				<h2 
					className="font-montserrat mb-2 font-bold text-[36px] text-indigo-900">
					{title}</h2>
				<div className="flex items-end justify-between">
					<span>
						<span className="text-2xl text-indigo-900 mr-1">
                      	${getDiscountedPrice(discount,price)}</span>
                      	<span className="line-through text-md text-indigo-300">${price}</span>
						<p>
						<i className='text-indigo-900 bx bxs-check-circle'></i>
						{brand}</p>
					</span>
					<span>Stock: {stock}</span>
				</div>
				<hr/>
				<article className="min-h-[100px] max-h-[300px] overflow-y-auto">
					<p className="font-montserrat font-semibold text-sm mt-5">
					{description}</p>
				</article>
			</div>

			<div className="mb-[140px]">
				 <button 
				 	type="button" 
				 	onClick={e => addToCartHandler(e)} 
				 	className="py-2 px-5 w-full rounded-md bg-indigo-900 cursor-pointer font-montserrat text-white hover:bg-indigo-700" data-productid={id}>
                         <i className="bx bx-cart"></i> Add to cart
                        </button>
			</div>
		</div>

	)	
}

ProductDetails.thumbnail = thumbnail
ProductDetails.information = information