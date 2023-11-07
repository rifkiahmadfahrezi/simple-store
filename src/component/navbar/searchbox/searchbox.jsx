import React from 'react'
import Input from './../../elements/input/Input'
import Label from './../../elements/input/Label'

export default function Searchbox({submitHandler, changeHandler}){
	return(
		<form action="" onSubmit={(e) => submitHandler(e)} className="flex items-center  overflow-hidden rounded-lg bg-slate-100">
			<Input onChangeHandler={changeHandler} type="search" placeHolder="Search some products..." id="searchbox" style="bg-transparent" />
			<Label htmlFor="searchbox" style="py-2 px-3 bg-indigo-900 text-white"><i className='bx bx-search bx-sm'></i></Label>
		</form>
	)
}