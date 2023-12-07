import React from 'react'

export default function pagination({activePage = 1, dataLength = 1, perPage = 20, numberPageClickHandler, prevPageClickHandler, nextPageClickHandler}){

	const numOfPage = Math.round(Number(dataLength) / Number(perPage))

	const pageNumber = []
	for(let i = 1; i <= numOfPage ; i++){
		pageNumber.push(<li key={i}>
					      <button 
					      	type="button"
					      	data-activepage={i}
					      	className={`
					      		${activePage == i ? 'bg-indigo-100' : 'bg-white'} 
					      		${numOfPage <= 1 ? 'rounded-md' : 'border-e-0'}
					      		flex items-center justify-center px-4 h-10 leading-tight  text-indigo-900 border border-indigo-900 hover:bg-indigo-100 hover:text-indigo-700`}
					      	onClick={(e)=> numberPageClickHandler(e)}
					      	>{i}</button>
					    </li>)
	}


	return (
		<nav aria-label="Page navigation" className="container mt-8 w-full mx-auto">
		  <ul className="flex items-center justify-center">
		    {
		    	(numOfPage > 1 && activePage > 1 )?
			    <li>
			      <button 
			      	type="button" 
			      	className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-indigo-900 bg-white border border-e-0 border-indigo-900 rounded-s-lg hover:bg-indigo-100 hover:text-indigo-700"
			      	onClick={(e)=> prevPageClickHandler(e)}
			      	>Previous</button>
			    </li>
			    : null
			}


			{pageNumber.map(item=> item)}


		   {
		    	(numOfPage > 1 )?
			    <li>
			      <button
			      	disabled={activePage < numOfPage ? false : true}
			      	type="button" 
			      	className={`flex items-center justify-center px-4 h-10 leading-tight text-indigo-900 bg-white border border-indigo-900 rounded-e-lg hover:bg-indigo-100 hover:text-indigo-700 ${activePage == numOfPage ? 'cursor-not-allowed bg-slate-200' : 'cursor-pointer'}`}
			      	onClick={(e)=> nextPageClickHandler(e)}
			      	>Next</button>
			    </li>
			    :null
			}
		  </ul>
		</nav>
	)
}