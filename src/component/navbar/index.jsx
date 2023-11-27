import React, { useState, useEffect } from 'react'
import Link from './../elements/link/Link'
import Searchbox from './searchbox/Searchbox'
import Dropdown from '../Dropdown'
import {getUser} from '../../utils/user.js'
import Modal from './../Modal'
import { convertDollar } from '../../utils/tools.js'
// convert number to text
import numberToText from 'number-to-text'
import enUsConverter from 'number-to-text/converters/en-us'


export default function Navbar({cartItems = {items: [], totalPrice: 0}, onSubmitHandler, addItem, decreaseItem, removeItem}){

	// json.parse for change string to boolean
	const [ isLogin, setIsLogin] = useState(JSON.parse(sessionStorage.getItem('login')))
	const [ userInfo, setUserInfo ] = useState([])
	const userId = sessionStorage.getItem('userId')
    const [ modalActive, setModalActive ] = useState(false)

	useEffect(() => {
		if (cartItems == null) cartItems = {items: [], totalPrice: 0}
		setUserInfo(getUser(userId))
	}, [])


	function doLogout(e){
		e.preventDefault()
		setIsLogin(false)
		sessionStorage.setItem('login', false)
	}

	function toggleModal(){
		modalActive ? setModalActive(false) : setModalActive(true) 
	}


	return(
	<>
		<nav className="bg-white shadow-md w-full py-5 sticky top-0 z-[99] ">
			<div className="container mx-auto w-[80%] sm:w-full flex flex-col sm:flex-row items-center justify-between">
				<Link to="/" style="items-center mb-5 sm:mb-0 hidden sm:flex">
					<img src="/favicon/android-chrome-192x192.png" alt="logo" width="30"/>
					<span className="font-montserrat ml-1 font-bold ">imple Store</span>
				</Link>

				<div className="flex items-center gap-[15px]">
					<Searchbox onSubmitHandler={onSubmitHandler}/>

					<div className="relative">
						<button 
							onClick={()=> toggleModal() } 
							type="button" 
							className="hover:bg-slate-50 rounded-md py-1 px-2">
							<i className='text-indigo-900 text-2xl bx bx-cart'></i>
							{cartItems.items?.length > 0 ?
								<span className="absolute right-[5px] bottom-[10px] flex h-3 w-3">
								  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
								  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
								</span>
								: null
							}
						</button>
					</div>

					<div className="flex items-center gap-[10px]">
						{!isLogin ? 
							<Link 
							to="/login" 
							style="border rounded-md py-1 px-2 border-indigo-900 hover:text-white transition duration-300 hover:shadow-md hover:bg-indigo-900 capitalize"
							>login</Link>
							: 
							userInfo.map((user, index) => {
								return (<Dropdown text="Settings" key={index}>
											<div className="py-2 text-center">
												Hello!, {user.username}
											</div>
											<div 
												onClick={e=> doLogout(e)} 
												className="py-2 text-center cursor-pointer bg-slate-50 hover:bg-slate-100">
												<span>logout</span>
											</div>
										</Dropdown>)
							})
						}
					</div>
				</div>
			</div>
		</nav>

		{modalActive ? 
			<Modal>
				<Modal.Body closeModalHandler={toggleModal}>
				{cartItems.items?.length > 0 ? 
				// console.log(cart)
				<Modal.Header>
					<div className="flex items-center justify-between mr-5">
						<div className="flex flex-col">
							<p className="text-lg">
								<span className="font-bold">Total</span>
								: ${cartItems.totalPrice == null ? convertDollar(cart.renewTotalPrice(cartItems)) : convertDollar(cartItems.totalPrice)}
								<span className="ml-2">({cartItems.items.length} items)</span>
							</p>
							<span className="text-md text-slate-500">({numberToText.convertToText(cartItems.totalPrice, {case: 'lowerCase'})})</span>
						</div>

						<Link 
							to="/checkout" 
							style="border rounded-md text-white py-1 px-2 transition duration-300 bg-indigo-900 capitalize"
							>Check out</Link>
					</div>
				</Modal.Header>
				: null
				}

					<div className="p-3">
						{cartItems.items?.length > 0 ? 
						cartItems.items.map((item, index) => {
							return (
								<div key={`${item.id}-${index}`} className="flex gap-3 border-b-2 border-indigo-900 py-2 mb-2 items-center justify-between">
									<div className="flex">
										<figure>
											<img 
											src={item.img} 
											alt="image of products"
											className="object-contain w-[100px] h-[100px]"/>
										</figure>
										<figcaption className="flex flex-col ml-2 justify-between">
											<div>
												<h4 className="font-semibold">{item.title}</h4>
												<h6 className="font-reguler">
													${item.price} &times; {item.quantity} = ${item.totalProductPrice}</h6>
											</div>

											<form onSubmit={e=> e.preventDefault()} className="flex rounded-sm">
												<button 
													type="button"
													className="bg-indigo-50 py-1 px-2"
													onClick={()=> decreaseItem(item)} >
													<i className='bx bx-minus'></i>
												</button>
												<input 
													onChange={(e)=> setQuantity(e.target.value)} 
													onInput={(e)=> setQuantity(e.target.value)} 
													className="w-[60px] text-center bg-slate-50" 
													type="number"
													value={ item.quantity }/>
												<button 
													type="button"
													className="bg-indigo-50 py-1 px-2"
													onClick={()=> addItem(item)}>
													<i className='bx bx-plus'></i>
												</button>
											</form>
										</figcaption>
									</div>
									<div>
										<button 
											type="button" 
											className="text-red-500 p-2 rounded-sm text-2xl hover:bg-red-50"
											onClick={()=> {
												removeItem(item.id)
											}}>
											<i className='bx bx-trash'></i>
										</button>
									</div>
								</div>
							)
						}).sort().reverse()
						: <p className="text-slate-500 text-center">Cart is empty :(</p>
					}
					</div>

				</Modal.Body>
			</Modal>
		: null
		}

	</>
	)
}