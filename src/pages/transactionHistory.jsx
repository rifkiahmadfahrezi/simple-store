import React, { useState, useEffect} from 'react'

import { ShoppingCart, removeItem, doCheckOut } from  '../context/ShoppingCart'

import Modal from '../component/Modal'
import Navbar from '../component/navbar'
import Footer from '../component/footer'
import Accordion from '../component/accordion'

import { convertDollar, getDiscountedPrice } from '../utils/tools.js'
import cart from '../utils/cart.js'
import {getUser} from '../utils/user.js'

// convert number to text
import numberToText from 'number-to-text'
import {enUsConverter} from 'number-to-text/converters/en-us'


export default function Transaction(){

	// json.parse for change string to boolean
	const [ isLogin, setIsLogin] = useState(JSON.parse(sessionStorage.getItem('login')) ?? false)
	const [ userInfo, setUserInfo ] = useState({})
    const [ modal, setModal ] = useState({isActive: false, target: null})
    const [ accordion, setAccordion ] = useState({isOpen: false, target: null})
    const [historyExist, setHistoryExist] = useState(false)

	const userId = sessionStorage.getItem('userId')

	const transactionHistory = JSON.parse(localStorage.getItem('history')) || []

    const [accordionData, setAccordionData] = useState([])

    function toggleAccordion(e){
    	const selected = e.target.id

    	if(accordion.isOpen && accordion.target == selected) {
    		setAccordion({isOpen: false, target: null})
    	}else{
	    	setAccordion({isOpen: true, target: selected})
    	}
    }


	useEffect(() => {
		setUserInfo(getUser(Number(userId)))
		const data = []
		transactionHistory.forEach((item, index) => {
			data.push({
				id: item.id,
				text: `Transaction ${item.id}`,
				content: item
			})
		})
		setAccordionData(data)

		if (transactionHistory.filter(his => Number(his.user) === Number(userId)).length <= 0){
			setHistoryExist(false)
		}else{
			setHistoryExist(true)
		}

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

	{historyExist ?

		<>

		<h3 className="text-lg text-indigo-900 mb-5 font-semibold">Total {transactionHistory.filter(acc => Number(acc.user) === Number(userId))?.length} transactions</h3>


		<Accordion>
		{(accordionData?.length > 0) ? accordionData.filter(acc => Number(acc.content.user) === Number(userId))
		.sort().reverse().map((acc) => {
		return(
			<div key={acc.id}>
				<Accordion.Trigger 
					toggleAccordion={toggleAccordion}
					isOpen={accordion.isOpen && accordion.target == acc.id}
					target={acc.id}>
						<span>{acc.text}</span>
				</Accordion.Trigger>
			{(accordion.isOpen && accordion.target == acc.id) ? 
			<>
				<article className="flex flex-col bg-indigo-50 mb-5 p-3">
					<h3 className="text-bold text-indigo-900 text-xl mb-1">Sent to:</h3>
					<p className="text-md font-semibold">{acc.content.address.fullName}</p>
					<p className="text-md">{acc.content.address.email}</p>
					<p className="text-md">
					{acc.content.address.address.fullAddress}, {acc.content.address.address.city} ,{acc.content.address.address.zip}, {acc.content.address.address.state}, {acc.content.address.address.country}</p>
				</article>

				<Accordion.Content 
					isOpen={accordion.isOpen}
					>
					<div className="flex flex-col">
						{acc.content.items?.length > 0 ? 
							acc.content.items.map((item, index, arr) => {
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
								: <p className="text-slate-500 text-center">There is no transaction history</p>
							}

					</div>	
				
				</Accordion.Content>
				<div className="flex flex-col text-left p-3 bg-indigo-100">
					<span 
						className="font-semibold text-lg mb-1 text-indigo-900">
						Total: ${convertDollar(acc.content.totalCheckoutPrice || 0)}
					</span>
					<span
						className="text-slate-500 text-md">
						({numberToText.convertToText(acc.content.totalCheckoutPrice || 0, {case: 'lowerCase'})})
					</span>
				</div>
				</>
				: null
			}
			</div>


		)
	})
		: <p className="text-slate-500 my-4 text-center">There is no transaction history</p>
	}
		</Accordion>
	</>
	: <p className="text-slate-500 my-4 text-center">There is no transaction history</p>
}
	</div>
			
	</div>
	<Footer/>

</>
	)
}