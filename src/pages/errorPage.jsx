import React from 'react'
import { useRouteError } from 'react-router-dom'

export default function ErrorPage(){
	const error = useRouteError()

	return (
	    <div className="container mx-auto min-h-screen w-screen flex justify-center items-center">
	      <div>
		      <h1 className="text-[65px] font-bold text-indigo-900 mb-3">Oops!</h1>
		      <p className="text-[30px]">Sorry, an unexpected error has occurred.</p>
		      <p className="text-slate-400 my-3 text-2xl">
		        <span>Status: {error.status} </span>
		        <i>{error.statusText || error.message}</i>
		      </p>
		      <a href="/" className="hover:underline text-indigo-900 text-lg font-semibold capitalize">back to home</a>
	      </div>
	    </div>
	  )
}
