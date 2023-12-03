import React from 'react'
import { useSearchParams } from 'react-router-dom'
import Input from './../../elements/input/Input'
import Label from './../../elements/input/Label'

export default function Searchbox(){

	const [searchParams, setSearchParams] = useSearchParams({q: ''})
	const keyword = searchParams.get('q') ?? false

	function searchInputChangeHandler(e){
		const value = e.target.value
		setSearchParams(prev => {
			prev.set('q', value.toLowerCase())
			return prev
		}, {replace: true})
	}

	function searchSubmitHandler(e){
      e.preventDefault()

      const curentUrl = window.location.href
      const originUrl = window.location.origin

      // if current url is homepage but have url params
      if(curentUrl.split('/')[3].includes('?') || curentUrl.split('/')[3].includes('=')) return

      // if current page(url) is not the homepage
      if(curentUrl.split('/')[3] !== undefined){
      	// and if the current url != to origin url
	      if (curentUrl !== originUrl) {
	      	// redirect user to get result of the search ath the home page
	      	window.location.href = `${originUrl}/?q=${keyword.toLowerCase()}&category=all`
	      }
      }

    }

	return(
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