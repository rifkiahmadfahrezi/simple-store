import React from 'react'
import { useSearchParams } from 'react-router-dom'
import Input from './../../elements/input/Input'
import Label from './../../elements/input/Label'

export default function Searchbox({onSubmitHandler}){

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
		<form action="" onSubmit={(e) => searchSubmitHandler(e)} className="flex items-center  overflow-hidden rounded-lg bg-slate-100">
			<Input value={!keyword ? '' : keyword} onChangeHandler={searchInputChangeHandler} type="search" placeHolder="Search some products..." id="searchbox" style="bg-transparent" />
			<Label htmlFor="searchbox" style="py-2 px-3 bg-indigo-900 text-white"><i className='bx bx-search bx-sm'></i></Label>
		</form>
	)
}