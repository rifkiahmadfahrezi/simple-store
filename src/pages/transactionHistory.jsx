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
    const[ accordion, setAccordion ] = useState({isOpen: false, target: null})

	const userId = sessionStorage.getItem('userId')

	const transactionHistory = JSON.parse(localStorage.getItem('history') ?? [])

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

	}, [])


	useEffect(()=> {
		if(!isLogin){
			window.location.href = window.location.origin
		}
	}, [userInfo])

	return (
<>
	<Navbar/>
	<div className="min-h-screen container mt-9 mx-auto container mx-auto w-[90%] md:w-full">
	<div>

		<Accordion>
		{accordionData?.length > 0 && accordionData.map((acc) => {
		return(
			<div key={acc.id}>
				<Accordion.Trigger 
					toggleAccordion={toggleAccordion}
					isOpen={accordion.isOpen && accordion.target == acc.id}
					target={acc.id}>
					{(accordion.isOpen && accordion.target == acc.id) ? 
						<div className="flex flex-col text-left">
							<span 
								className="font-semibold text-lg mb-1 text-indigo-900">
								Total: ${convertDollar(acc.content.price || 0)}
							</span>
							<span
								className="text-slate-500 text-md">
								({numberToText.convertToText(acc.content.price || 0, {case: 'lowerCase'})})
							</span>
						</div>
						: <span>{acc.text}</span>
					}
					
				</Accordion.Trigger>
			{(accordion.isOpen && accordion.target == acc.id) ? 
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
				: null
			}
			</div>


		)
	})}
			</Accordion>
	</div>
			
	</div>
	<Footer/>

</>
	)
}