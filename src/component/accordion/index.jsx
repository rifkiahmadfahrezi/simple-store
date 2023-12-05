import React, {useState, useEffect} from 'react'

export default function Accordion({children}){
	return(
		<>
			<div id="accordion-collapse" className="overflow-hidden border border-indigo-200 rounded-xl" data-accordion="collapse">
			  {children}
			</div>
		</>
	)
}

export function Trigger({children, target, toggleAccordion, isOpen}){


	return(
		<>
			<h2 id={target} onClick={(e) => toggleAccordion(e)} className={isOpen ? 'bg-indigo-100' : 'bg-white'}>
			    <button id={target} type="button" className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-indigo-900" aria-expanded="true" aria-controls="accordion-collapse-body-1">
			      {children}
			      <i id={target} className={`bx text-2xl transition duration-300 bx-chevron-down ${isOpen ? 'rotate-180' : 'rotate-0'}`}></i>
			    </button>
			  </h2>
		</>
	)
}

export function Content({isOpen, children, style}){


	return(
<>
	<div
		className={`transition-all duration-300  ${isOpen ? 'scale-y-100' : 'scale-y-0'} ${style}`} 
		aria-labelledby="accordion-collapse">
	    <div className="p-5">
	      {children}
	    </div>
	  </div>
</>
	)
}

Accordion.Trigger = Trigger
Accordion.Content = Content