import React, { useState, useEffect } from 'react'
import Link from './../elements/link/Link'
import Searchbox from './searchbox/Searchbox'
import Dropdown from '../Dropdown'
import {getUser} from '../../utils/user.js'


export default function Navbar({onSubmitHandler}){

	// json.parse for change string to boolean
	const [ isLogin, setIsLogin] = useState(JSON.parse(sessionStorage.getItem('login')))
	const [ userInfo, setUserInfo ] = useState([])
	const userId = sessionStorage.getItem('userId')


	function inputChangeHandler(e){
		const value = e.target.value
	}

	useEffect(()=> {
		setUserInfo(getUser(userId))
	}, [])



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
					<Searchbox onSubmitHandler={onSubmitHandler}/>

					<button type="button" className="hover:bg-slate-50 rounded-md py-2 px-4">
						<i className='text-indigo-900 text-2xl bx bx-cart'></i>
					</button>

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
	)
}