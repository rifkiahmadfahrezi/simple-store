import React from 'react'
import NavbarLogo from './NavbarLogo'
import Link from './menu/Link'
import Searchbox from './searchbox/Searchbox'

export default function Navbar({children}){
	return(
		<nav className="bg-white w-full py-5">
			<div className="container mx-auto flex items-center justify-between">
				<NavbarLogo />

				<div className="flex items-center gap-[15px]">
					<Searchbox/>
					<div className="flex items-center gap-[10px]">
						<Link to="/login" text="login" style="hover:text-indigo-800 hover:font-semibold"/>
						<Link to="/register" style="py-1 px-2 rounded-md bg-indigo-900 text-slate-50 hover:font-normal hover:bg-indigo-700 hover:text-white" text="register"/>
					</div>
				</div>
			</div>
		</nav>
	)
}