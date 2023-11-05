import React from 'react'
import Link from './../elements/link/Link'
import Searchbox from './searchbox/Searchbox'

export default function Navbar(){
	return(
		<nav className="bg-white w-full py-5">
			<div className="container mx-auto flex items-center justify-between">
				<Link to="/" style="flex items-center">
					<img src="favicon/android-chrome-192x192.png" alt="logo" width="30"/>
					<span className="font-montserrat ml-1 font-bold">imple Store</span>
				</Link>

				<div className="flex items-center gap-[15px]">
					<Searchbox/>
					<div className="flex items-center gap-[10px]">
						<Link to="/login" style="hover:text-indigo-800 hover:font-semibold capitalize">login</Link>
						<Link to="/register" style="py-1 px-2 rounded-md bg-indigo-900 text-slate-50 hover:font-normal hover:bg-indigo-700 hover:text-white capitalize">register</Link>
					</div>
				</div>
			</div>
		</nav>
	)
}