import React from 'react'
import { useSearchParams } from 'react-router-dom'
import Input from './../../elements/input/Input'
import Label from './../../elements/input/Label'

export default function Searchbox(){

	const [searchParams, setSearchParams] = useSearchParams({q: ''})
	const keyword = searchParams.get('q').toLowerCase() ?? false

	function searchInputChangeHandler(e){
		const value = e.target.value
		setSearchParams(prev => {
			prev.set('q', value)
			return prev
		}, {replace: true})
	}

	function searchSubmitHandler(e){
      e.preventDefault()

      if (window.location.href!==window.location.origin) {
      	window.location.href = `${window.location.origin}/?q=${keyword}`
      }
    }

	return(
		// <form action="" onSubmit={(e) => searchSubmitHandler(e)} className="flex items-center  overflow-hidden rounded-lg bg-slate-100">
		// 	<Input 
			// value={!keyword ? '' : keyword} 
			// onChangeHandler={searchInputChangeHandler} 
			// type="search" 
			// placeHolder="Search some products..." 
			// id="searchbox" 
			// style="bg-transparent" />
		// 	<Label htmlFor="searchbox" style="py-2 px-3 bg-indigo-900 text-white"><i className='bx bx-search bx-sm'></i></Label>
		// </form>
     <form action="" 
     	onSubmit={(e) => searchSubmitHandler(e)} 
     	className="text-gray-600 relative">
	        <Input 
	          	type="search" 
	        	style="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none focus:border-indigo-900 focus:ring focus:ring-indigo-200"
	        	value={!keyword ? '' : keyword}
	        	onChangeHandler={searchInputChangeHandler} 
				id="searchbox" 
	          	placeHolder="Search some products..."/>
	        <button 
	        	onClick={e=> searchSubmitHandler(e)} 
	        	type="submit" 
	        	className="absolute right-[20px] top-[50%] translate-y-[-40%]">
	          <i className='bx bx-search bx-sm text-indigo-900 h-4 w-4 fill-current'></i>
	        </button>
      </form>
	)
}