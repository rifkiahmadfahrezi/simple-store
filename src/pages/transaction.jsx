import React, { useState, useEffect, useContext} from 'react'

import { ShoppingCart, doCheckOut } from  '../context/ShoppingCart'

import Navbar from '../component/navbar'
import Footer from '../component/footer'
import Accordion from '../component/accordion'

import { convertDollar} from '../utils/tools.js'
// import cart from '../utils/cart.js'
import {getUser} from '../utils/user.js'

// convert number to text
import numberToText from 'number-to-text'
import {enUsConverter} from 'number-to-text/converters/en-us'


export default function Transaction(){

	// json.parse for change string to boolean
	const [ isLogin, setIsLogin] = useState(JSON.parse(sessionStorage.getItem('login')) ?? false)
	const [ userInfo, setUserInfo ] = useState({})
    // const [ modal, setModal ] = useState({isActive: false, target: null})
    const[ isOpen, setIsOpen ] = useState(false) // for accordion

	const userId = sessionStorage.getItem('userId')

    const { cartItems, setCartItems } = useContext(ShoppingCart)

    const accordionData = [
    	{	
    		id: 1,
    		text: `Checkout products (${cartItems.items.length} items)`,
    		content: cartItems.items
    	},
    ]

    function toggleAccordion(e){
    	isOpen ? setIsOpen(false) : setIsOpen(true)
    }


	useEffect(() => {
		setUserInfo(getUser(Number(userId)))
	}, [])


	useEffect(()=> {
		if(!isLogin){
			window.location.href = window.location.origin
		}
	}, [userInfo])

	return (
<>
	<Navbar/>

	<div className="container mx-auto w-[90%] sm:w-full mt-5 cursor-pointer hover:bg-white">
				<button type="button" onClick={()=> window.history.back()} ><i className='text-lg bx bx-arrow-back'></i></button>
			</div>

	<div className="min-h-screen container mt-9 mx-auto container mx-auto w-[90%] md:w-full">
	<div>
		<article className="flex flex-col bg-indigo-50 mb-5 p-4 rounded-md">
			<h3 className="text-bold text-indigo-900 text-xl mb-1">Send to:</h3>
			<p className="text-md font-semibold">{userInfo.fullName}</p>
			<p className="text-md">{userInfo.email}</p>
			<p className="text-md">
			{userInfo.address?.fullAddress}, {userInfo.address?.city} ,{userInfo.address?.zip}, {userInfo.address?.state}, {userInfo.address?.country}</p>
		</article>


		{accordionData.map((item) => {
		return(
			<Accordion key={item.id}>
				<Accordion.Trigger 
					toggleAccordion={toggleAccordion}
					isOpen={isOpen}>
					<span>{item.text}</span>
				</Accordion.Trigger>
				{console.log(isOpen)}
				<Accordion.Content 
					isOpen={isOpen}>
				
					<div className="flex flex-col">
						{item.content?.length > 0 ? 
							item.content.sort().reverse().map((item, index) => {
								return (
									<div 
									key={`${item.id}-${index}`} 
									className="flex gap-3 [&:nth-child(even)]:bg-slate-50 mb-3 border-indigo-900 py-2 items-center justify-between">
										<div className="flex">
											<figure className="relative">
												<img 
												src={item.img} 
												alt="image of products"
												className="object-contain w-[100px] h-[100px]"/>
											{(item.discountPercentage != undefined || item.discountPercentage <= 0 || item.discountPercentage != null )
											? <span 
												className="bg-indigo-500 p-1 absolute top-0 right-0 text-white font-montserrat text-sm rounded-sm">
												- {item.discountPercentage}%
												</span>
											: null
											}
											</figure>
											<figcaption 
											className="flex flex-col ml-2 justify-between">
												<div>
													<h4 className="font-semibold">{item.title}</h4>
													<p className={`${item.quantity >= item.stock ? 'text-red-400' : 'text-indigo-800'}`}>
														Stock: {item.stock}</p>
													<h6 className="font-reguler font-montserrat">
														<span className="
														text-lg line-through text-indigo-300 mr-1">
															${convertDollar(item.actualPrice)}
															</span>
														${convertDollar(item.price)} &times; {item.quantity} = ${convertDollar(item.totalProductPrice)}</h6>
												</div>
											</figcaption>
										</div>
									</div>
								)
								})
								: <p className="text-slate-500 text-center">There is no items to checkout</p>
							}
					</div>	

				</Accordion.Content>
			</Accordion>

		)
	})}
	<div className="flex justify-between items-center mt-5">
		<div className="flex flex-col ">
			<span 
				className="font-semibold text-lg mb-1 text-indigo-900">
				Total: ${convertDollar(cartItems.totalPrice)}
			</span>
			<span
				className="text-slate-500 text-md">
				({numberToText.convertToText(cartItems.totalPrice, {case: 'lowerCase'})})
			</span>
		</div>

		<div>
			<button
				type="button"
				onClick={() => doCheckOut(setCartItems, cartItems, true, userInfo.id)}
				disabled={cartItems.items.length <= 0 ? true : false}
				className={`${cartItems.items.length <= 0 ? 'cursor-not-allowed' : null} bg-indigo-900 text-white rounded-md hover:bg-indigo-800 py-2 px-5 text-bold capitalize`}>
			pay now
			</button>
		</div>
	</div>
	</div>
			
	</div>
	<Footer/>

</>
	)
}