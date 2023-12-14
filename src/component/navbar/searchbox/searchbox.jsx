import React, {useState} from 'react'
import { useSearchParams } from 'react-router-dom'

export default function Searchbox({setErrorState = undefined}){

	const [searchParams, setSearchParams] = useSearchParams({q: ''})
	const keywordParams = searchParams.get('q') || null

	const [ keyword, setKeyword ] = useState(searchParams.get('q')|| null)


	function searchInputChangeHandler(e){
		const value = e.target.value

		setKeyword(value?.toLowerCase())
	}

	function searchSubmitHandler(e){
      e.preventDefault()

      window.scrollTo(0,0)

      if (setErrorState !== undefined) setErrorState({isError: false,message: '', img: null})
	  
	  setSearchParams(prev => {
      prev.set('q', keyword?.toLowerCase())
	  	return prev
	  }, {replace: true})

      const curentUrl = window.location.href
      const originUrl = window.location.origin
      const currentPage = curentUrl.split('/')[3]
      const currentPageName = currentPage.split('?')[0]

      // check if currect page is not the homePage
      if(currentPageName !== ''){
      	// redirect user to get result of the search ath the home page
	      	window.location.href = `${originUrl}/?q=${keywordParams.toLowerCase()}&category=all`
      }

      // if current url is homepage but have url params
      if(currentPage.includes('?') || currentPage.includes('=')) return

      // if current page(url) is not the homepage
      if(currentPage !== undefined){
      	// and if the current url != to origin url
	      if (curentUrl !== originUrl) {
	      	// redirect user to get result of the search ath the home page
	      	window.location.href = `${originUrl}/?q=${keywordParams.toLowerCase()}&category=all`
	      }
      }

    }

	return(
     <form action="" 
     	onSubmit={(e) => searchSubmitHandler(e)} 
     	className="text-gray-600 relative">
	        <input 
	          	type="search" 
	        	className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none focus:border-indigo-900 focus:ring focus:ring-indigo-200"
	        	defaultValue={keywordParams === null ? '' : keywordParams}
	        	onChange={(e) => searchInputChangeHandler(e)} 
				id="searchbox" 
	          	placeholder="Search some products..."/>
	        <button 
	        	onClick={e=> searchSubmitHandler(e)} 
	        	type="submit" 
	        	className="absolute right-[20px] top-[50%] translate-y-[-40%]">
	          <i className='bx bx-search bx-sm text-indigo-900 h-4 w-4 fill-current'></i>
	        </button>
      </form>
	)
}