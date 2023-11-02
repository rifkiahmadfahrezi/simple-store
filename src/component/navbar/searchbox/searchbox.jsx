import React from 'react'

export default function Searchbox(){
	return(
		<form action="" className="flex items-center  overflow-hidden rounded-lg bg-slate-100">
			<input type="search" placeHolder="Search some products..." id="searchbox" 
			className="py-2 px-3 bg-transparent" />
			<label htmlFor="searchbox" className="py-2 px-3 bg-indigo-900 text-white"><i className='bx bx-search bx-sm'></i></label>
		</form>
	)
}