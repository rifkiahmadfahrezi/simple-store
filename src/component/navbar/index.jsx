import React, { useState } from 'react'
import Link from './../elements/link/Link'
import Searchbox from './searchbox/Searchbox'
import Dropdown from '../Dropdown'


export default function Navbar(){

	// json.parse for change string to boolean
	const [ isLogin, setIsLogin] = useState(JSON.parse(sessionStorage.getItem('login')))

	function search(e){
		e.preventDefault()
	}

	function inputChangeHandler(e){
		const value = e.target.value
	}

	function doLogout(e){
		e.preventDefault()
		setIsLogin(false)
		sessionStorage.setItem('login', false)
	}

	return(
		<nav className="bg-white shadow-md w-full py-5">
			<div className="container mx-auto w-[90%] sm:w-full flex flex-col sm:flex-row items-center justify-between">
				<Link to="/" style="flex items-center mb-5 sm:mb-0">
					<img src="/favicon/android-chrome-192x192.png" alt="logo" width="30"/>
					<span className="font-montserrat ml-1 font-bold">imple Store</span>
				</Link>

				<div className="flex items-center gap-[15px]">
					<Searchbox submitHandler={search} changeHandler={inputChangeHandler}/>
					<div className="flex items-center gap-[10px]">
						{!isLogin ? 
							<Link 
							to="/login" 
							style="border rounded-md py-1 px-2 border-indigo-900 hover:text-white transition duration-300 hover:shadow-md hover:bg-indigo-900 capitalize"
							>login</Link>
							: 
							<Link 
							onClickHandler={doLogout}
							style="border rounded-md py-1 px-2 border-indigo-900 hover:text-white transition duration-300 hover:shadow-md hover:bg-indigo-900 capitalize"
							>logout</Link>
						}
					</div>
				</div>
			</div>
		</nav>
	)
}