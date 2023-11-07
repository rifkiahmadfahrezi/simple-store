import React from 'react'
import Link from './../elements/link/Link'
import Searchbox from './searchbox/Searchbox'


export default function Navbar(){

	function search(e){
		e.preventDefault()
	}

	function inputChangeHandler(e){
		const value = e.target.value
	}

	return(
		<nav className="bg-white w-full py-5">
			<div className="container mx-auto flex items-center justify-between">
				<Link to="/" style="flex items-center">
					<img src="/favicon/android-chrome-192x192.png" alt="logo" width="30"/>
					<span className="font-montserrat ml-1 font-bold">imple Store</span>
				</Link>

				<div className="flex items-center gap-[15px]">
					<Searchbox submitHandler={search} changeHandler={inputChangeHandler}/>
					<div className="flex items-center gap-[10px]">
						<Link 
							to="/login" 
							style="border rounded-md py-1 px-2 border-indigo-900 hover:text-white transition duration-300 hover:shadow-md hover:bg-indigo-900 capitalize"
							>login</Link>
					</div>
				</div>
			</div>
		</nav>
	)
}