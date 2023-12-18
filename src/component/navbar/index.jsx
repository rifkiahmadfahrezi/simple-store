import React, { useState, useEffect, useContext} from 'react'
import Link from './../elements/link/link'
import Input from './../elements/input/input'
import Label from './../elements/input/label'
import Searchbox from './searchbox/searchbox'
import Dropdown from '../dropdown'
import {getUser} from '../../utils/user.js'
import cart from '../../utils/cart.js'
import Modal from '../Modal'
import { convertDollar } from '../../utils/tools.js'
// convert number to text
import numberToText from 'number-to-text'
import {enUsConverter} from 'number-to-text/converters/en-us'
import { ShoppingCart, doCheckOut, addItem, decreaseItem,removeItem } from  '../../context/ShoppingCart'

export default function Navbar({setErrorState}){

	// json.parse for change string to boolean
	const [ isLogin, setIsLogin] = useState(JSON.parse(sessionStorage.getItem('login')) ?? false)
	const [ userInfo, setUserInfo ] = useState({})
    const [ modal, setModal ] = useState({isActive: false, target: null})

	const userId = sessionStorage.getItem('userId')

    const { cartItems, setCartItems } = useContext(ShoppingCart)

	useEffect(() => {
		setUserInfo(getUser(userId))
	}, [])

	function doLogout(e){
		e.preventDefault()
		setIsLogin(false)
		window.location.href = window.location.origin
		sessionStorage.setItem('login', false)
	}

	function toggleModal(target){
		modal.isActive 
		? setModal({isActive: false, target: null}) 
		: setModal({isActive: true, target: target}) 
	}


	function checkOutHandler(e){
		e.preventDefault()

		if(!isLogin){
			Swal.fire({
	          title: 'Checkout failed',
	          text: 'Please login before checkout',
	          timer: 2500,
	          timerProgressBar: true,
	        })
		}else{
			 window.location.href = window.location.origin + '/transaction'
		}

	}

	function getCurrentPage(){
		return window.location.href.split('/')[3]
	}
	return(
	<>
		<nav className="bg-white shadow-md w-full py-5 sticky top-0 z-[99] ">
			<div className="container mx-auto w-[90%] p-1 sm:p-2 sm:w-full flex items-center justify-center sm:justify-between">
				<Link to="/" style="items-center mb-5 sm:mb-0 hidden sm:flex">
					<img src="/favicon/android-chrome-192x192.png" alt="logo" width="30"/>
					<span className="font-montserrat ml-1 font-bold ">imple Store</span>
				</Link>

				<div className="flex items-center sm:gap-3 mx-3">
					<Searchbox setErrorState={setErrorState}/>

					{getCurrentPage() !== 'transaction' &&
					<div className="relative">
						<button 
							onClick={()=> toggleModal('cart') } 
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
					}

					<div className="flex items-center gap-[10px]">
						{!isLogin ? 
							<Link 
							to="/login" 
							style="border rounded-md py-1 px-2 border-indigo-900 hover:text-white transition duration-300 hover:shadow-md hover:bg-indigo-900 capitalize"
							>login</Link>
							: 
							<Dropdown text="Settings">
								<div className="py-2 text-center">
									Hello!, {userInfo.surName || 'user'}
								</div>
								<div className="py-2 text-center cursor-pointer hover:bg-slate-100" onClick={()=>toggleModal('account-setting')}>
									Account information
								</div>
								<Link 
									to="/transaction-history"
									style="flex justify-center py-2 text-center cursor-pointer hover:bg-slate-100">
									Transaction history
								</Link>
								<div 
									onClick={e=> doLogout(e)} 
									className="py-2 text-center cursor-pointer bg-slate-50 hover:bg-slate-100">
									<span>logout</span>
								</div>
							</Dropdown>
						}
					</div>
				</div>
			</div>
		</nav>

		{}

		{(modal.isActive && modal.target === 'cart' && getCurrentPage() !== 'transaction') &&
			<Modal>
				<Modal.Body closeModalHandler={toggleModal}>
					{cartItems.items?.length > 0 ? 
					// console.log(cart)
					<Modal.Footer>
						<div className="flex items-center justify-between mr-5">
							<div className="flex flex-col">
								<p className="text-lg">
									<span className="font-bold">Total</span>
									: ${(cartItems.totalPrice == null || cartItems.totalPrice == undefined) ? convertDollar(cart.renewTotalPrice(cartItems)) : convertDollar(cartItems.totalPrice)}
									<span className="ml-2">({cartItems.items.length} items)</span>
								</p>
								<span className="text-md text-slate-500">({numberToText.convertToText(cartItems.totalPrice, {case: 'lowerCase'})})</span>
							</div>

							<button 
								type="button" 
								className="border rounded-md text-white py-1 px-2 transition duration-300 bg-indigo-900 capitalize"
								onClick={(e)=>checkOutHandler(e)}
								>Check out</button>
						</div>
					</Modal.Footer>
					: null
					}

					<div className="p-3">
						{cartItems.items?.length > 0 ? 
							cartItems.items.map((item, index) => {
								return (
									<div key={`${item.id}-${index}`} className="flex gap-3 border-b-2 border-indigo-900 py-2 mb-2 items-center justify-between">
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

												<div className="flex rounded-sm">
													<button 
														type="button"
														className="bg-indigo-50 py-1 px-2"
														onClick={()=> decreaseItem(setCartItems,item)} >
														<i className='bx bx-minus'></i>
													</button>
													<span className="w-[60px] text-center leading-0 bg-slate-50 flex items-center justify-center">
														{item.quantity}
													</span>
													<button 
														type="button"
														className="bg-indigo-50 py-1 px-2"
														onClick={()=> addItem(setCartItems, item)}>
														<i className='bx bx-plus'></i>
													</button>
												</div>
											</figcaption>
										</div>
										<div>
											<button 
												type="button" 
												className="text-red-500 p-2 rounded-sm text-2xl hover:bg-red-50"
												onClick={()=> {
													removeItem(setCartItems,item.id)
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
		}

		{(modal.isActive && modal.target === 'account-setting') &&
			<Modal>
				<Modal.Body closeModalHandler={toggleModal}>
					<div className="p-3 flex flex-col gap-3 mb-8">
						<form action="" onSubmit={e=> e.preventDefault()} >
							<div className="flex flex-col">
								<Label style="mb-2 capitalize">name:</Label>
								<input readOnly value={userInfo.fullName} className="bg-slate-50 py-2 px-4 rounded-md"/>
							</div>
							<div className="flex flex-col">
								<Label style="mb-2 capitalize">username:</Label>
								<input readOnly value={userInfo.username} className="bg-slate-50 py-2 px-4 rounded-md"/>
							</div>
							<div className="flex flex-col">
								<Label style="mb-2 capitalize">e-mail:</Label>
								<input readOnly value={userInfo.email} className="bg-slate-50 py-2 px-4 rounded-md"/>
							</div>
							<div className="flex flex-col">
								<Label style="mb-2 capitalize">full address:</Label>
								<input readOnly value={userInfo.address.fullAddress} className="bg-slate-50 py-2 px-4 rounded-md"/>
							</div>
							<div className="grid grid-cols-3 gap-1">
								<div className="flex flex-col">
									<Label style="mb-2 capitalize">country:</Label>
									<input readOnly value={userInfo.address.country} className="bg-slate-50 py-2 px-4 rounded-md"/>
								</div>
								<div className="flex flex-col">
									<Label style="mb-2 capitalize">state:</Label>
									<input readOnly value={userInfo.address.state} className="bg-slate-50 py-2 px-4 rounded-md"/>
								</div>
								<div className="flex flex-col">
									<Label style="mb-2 capitalize">city:</Label>
									<input readOnly value={userInfo.address.city} className="bg-slate-50 py-2 px-4 rounded-md"/>
								</div>
							</div>

						</form>
					</div>
				</Modal.Body>
			</Modal>
		}

	</>
	)
}