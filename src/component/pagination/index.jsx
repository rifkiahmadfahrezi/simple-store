import React from 'react'

export default function pagination({dataLength = 1}){

	const pageNumber = []
	for(let i = 1; i <= Number(dataLength) / 20; i++){
		pageNumber.push(<li key={i}>
					      <a href="#" className="flex items-center justify-center px-4 h-10 leading-tight border-e-0 text-indigo-900 bg-white border border-indigo-900 hover:bg-indigo-100 hover:text-indigo-700">{i}</a>
					    </li>)
	}


	return (
		<nav aria-label="Page navigation" className="container mt-8 w-full mx-auto">
		  <ul className="flex items-center justify-center">
		    {
		    	dataLength > 1 && 
			    <li>
			      <a href="#" className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-indigo-900 bg-white border border-e-0 border-indigo-900 rounded-s-lg hover:bg-indigo-100 hover:text-indigo-700">Previous</a>
			    </li>
			}


			{pageNumber.map(item=> item)}


		   {
		    	dataLength > 1 && 
			    <li>
			      <a href="#" className="flex items-center justify-center px-4 h-10 leading-tight text-indigo-900 bg-white border border-indigo-900 rounded-e-lg hover:bg-indigo-100 hover:text-indigo-700">Next</a>
			    </li>
			}
		  </ul>
		</nav>
	)
}