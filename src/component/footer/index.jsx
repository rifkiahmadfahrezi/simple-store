import React from 'react'
import Link from '../elements/link/Link'

export default function Footer(){
	return(
		<footer className="w-full left-0 bottom-0 bg-indigo-900 py-7 mt-9">
			<div className="container mx-auto">
				<div className="flex flex-col items-center">
					<div className="flex items-center mb-3">
						<Link to="/" style="items-center mb-5 sm:mb-0 hidden sm:flex">
							<img src="/favicon/android-chrome-192x192.png" alt="logo" width="30"/>
							<span className="font-montserrat ml-1 font-bold text-white">imple Store</span>
						</Link>
					</div>
					<p className="text-white">
						&copy; 2023 created with 
						<i className='bx mx-1 bxs-heart text-red-500'></i> 
						by <a className="underline" target="_blank" href="https://github.com/rifkiahmadfahrezi">Rifki ahmad fahrezi</a></p>
				</div>
			</div>
		</footer>
	)
}