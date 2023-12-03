import React from 'react'

export default function pagination({activePage = 1, dataLength = 1, perPage = 20, numberPageClickHandler, prevPageClickHandler, nextPageClickHandler}){

	const pageNumber = []
	for(let i = 1; i <= Math.round(Number(dataLength) / Number(perPage)); i++){
		pageNumber.push(<li key={i}>
					      <button 
					      	type="button" 
					      	className="flex items-center justify-center px-4 h-10 leading-tight border-e-0 text-indigo-900 bg-white border border-indigo-900 hover:bg-indigo-100 hover:text-indigo-700"
					      	onClick={(e)=> numberPageClickHandler(e)}
					      	>{i}</button>
					    </li>)
	}


	return (
		<nav aria-label="Page navigation" className="container mt-8 w-full mx-auto">
		  <ul className="flex items-center justify-center">
		    {
		    	dataLength > 1 && 
			    <li>
			      <button 
			      	type="button" 
			      	className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-indigo-900 bg-white border border-e-0 border-indigo-900 rounded-s-lg hover:bg-indigo-100 hover:text-indigo-700"
			      	onClick={(e)=> prevPageClickHandler(e)}
			      	>Previous</button>
			    </li>
			}


			{pageNumber.map(item=> item)}


		   {
		    	dataLength > 1 && 
			    <li>
			      <button
			      	type="button" 
			      	className="flex items-center justify-center px-4 h-10 leading-tight text-indigo-900 bg-white border border-indigo-900 rounded-e-lg hover:bg-indigo-100 hover:text-indigo-700"
			      	onClick={(e)=> nextPageClickHandler(e)}
			      	>Next</button>
			    </li>
			}
		  </ul>
		</nav>
	)
}