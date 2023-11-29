import React, { useState, useEffect, useContext } from 'react'
import Link from './../elements/link/Link'
import Input from './../elements/input/Input'
import Label from './../elements/input/Label'
import Searchbox from './searchbox/Searchbox'
import Dropdown from '../Dropdown'
import {getUser} from '../../utils/user.js'
import cart from '../../utils/cart.js'
import Modal from '../Modal'
import { convertDollar } from '../../utils/tools.js'
// convert number to text
import numberToText from 'number-to-text'
import {enUsConverter} from 'number-to-text/converters/en-us'
import { ShoppingCart } from  '../../context/ShoppingCart'

export default function Navbar(){

	// json.parse for change string to boolean
	const [ isLogin, setIsLogin] = useState(JSON.parse(sessionStorage.getItem('login')) ?? false)
	const [ userInfo, setUserInfo ] = useState({})
	const userId = sessionStorage.getItem('userId')
    const [ modal, setModal ] = useState({isActive: false, target: null})
    const { cartItems, setCartItems } = useContext(ShoppingCart)


	useEffect(() => {
		if (cartItems == null) cartItems = {items: [], totalPrice: 0}
		setUserInfo(getUser(userId))
		console.log(cartItems)
	}, [])

	useEffect(()=> {
      if (cartItems.length > 1){
        const items = cartItems.filter((item) => item.id != undefined) 
         localStorage.setItem('cart', JSON.stringify(items))
      }else{
         localStorage.setItem('cart', JSON.stringify(cartItems))
      }
      // console.log(cartItems)
    }, [cartItems])


	function doLogout(e){
		e.preventDefault()
		setIsLogin(false)
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
			console.log('do checkout')
		}

	}

    function decreaseItem(item){
      if(item.quantity <= 1){
        removeItem(item.id)
      }else{
        cart.decrease(item)

      }
      setCartItems(JSON.parse(localStorage.getItem('cart')))
    }

    function removeItem(id){
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        // if user confirmed to delete the product
        if (result.isConfirmed) {
            cart.remove(id)
            // find removed product
            const removedProduct = cart.remove(id).items.find(item => item.id == id)
            // if removed product is not found
            // then show the success popup
            if(removedProduct === undefined) {
              setCartItems(JSON.parse(localStorage.getItem('cart')))
              Swal.fire({
                title: "Success",
                text: "This product deleted from cart!",
                icon: "success"
              })
               // if removed product still found 
              // show the unsuccess pop up
              }else{
                Swal.fire({
                  title: "Failed",
                  text: "This product failed to delete from cart, please try again!",
                  icon: "error"
                })
              }
        }
      })


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
					<Searchbox/>

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
									Account settings
								</div>
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

		{(modal.isActive && modal.target === 'cart') &&
			<Modal>
				<Modal.Body closeModalHandler={toggleModal}>
					{cartItems.items?.length > 0 ? 
					// console.log(cart)
					<Modal.Footer>
						{console.log(cartItems)}
						<div className="flex items-center justify-between mr-5">
							<div className="flex flex-col">
								<p className="text-lg">
									<span className="font-bold">Total</span>
									: ${cartItems.totalPrice == null ? convertDollar(cart.renewTotalPrice(cartItems)) : convertDollar(cartItems.totalPrice)}
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
					: console.log("cart is empty")
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
														${convertDollar(item.price)} &times; {item.quantity} = ${convertDollar(item.totalProductPrice)}</h6>
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
														onClick={()=> addItem(setCartItems, item)}>
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
		}

		{(modal.isActive && modal.target === 'account-setting') &&
			<Modal>
				<Modal.Body closeModalHandler={toggleModal}>
					<div className="p-3 flex flex-col gap-3 mb-8">
						<form action="">
							<div className="flex flex-col">
								<Label style="mb-2 capitalize">name:</Label>
								<Input value={userInfo.surName} style="bg-slate-50 rounded-md"/>
							</div>
							<div className="flex flex-col">
								<Label style="mb-2 capitalize">username:</Label>
								<Input value={userInfo.username} style="bg-slate-50 rounded-md"/>
							</div>
							<div className="flex flex-col">
								<Label style="mb-2 capitalize">e-mail:</Label>
								<Input value={userInfo.email} style="bg-slate-50 rounded-md"/>
							</div>
							<div className="flex flex-col">
								<Label style="mb-2 capitalize">full address:</Label>
								<Input value={userInfo.address.fullAdress} style="bg-slate-50 rounded-md"/>
							</div>
							<div className="grid grid-cols-3 gap-1">
								<div className="flex flex-col">
									<Label style="mb-2 capitalize">country:</Label>
									<Input value={userInfo.address.country} style="bg-slate-50 rounded-md"/>
								</div>
								<div className="flex flex-col">
									<Label style="mb-2 capitalize">state:</Label>
									<Input value={userInfo.address.state} style="bg-slate-50 rounded-md"/>
								</div>
								<div className="flex flex-col">
									<Label style="mb-2 capitalize">city:</Label>
									<Input value={userInfo.address.city} style="bg-slate-50 rounded-md"/>
								</div>
							</div>

							<Modal.Header>
								<button 
									className="font-montserrat py-2 px-3 rounded-md bg-indigo-900 mt-3 text-white" 
									type="submit">
									Update</button>
							</Modal.Header>

						</form>
					</div>
				</Modal.Body>
			</Modal>
		}

	</>
	)
}

export function addItem(setItemHook, item){
  if(item.quantity < item.stock || item.quantity == undefined){
    cart.add(item)
    setItemHook(JSON.parse(localStorage.getItem('cart')))
    return true
  }else{
    return false
  }
}