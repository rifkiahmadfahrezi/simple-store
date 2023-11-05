import React, {useState} from 'react'


export default function Dropdown({text = 'options' , children}){

	const [clicked, setClicked] = useState(false)

	return(
	<>
	<div className="relative inline-block text-left" onClick={()=> {
		setClicked(clicked ? false : true)
	}}>
	  <div>
	    <button type="button" className="iflex w-full items-center justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 capitalize" id="menu-button" aria-expanded="true" aria-haspopup="true">
	      {text}
	      <i className="bx bx-chevron-down ml-2"></i>
	    </button>
	  </div>
	  {clicked &&
		  <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button">
		    <div className="py-1 max-h-[450px] overflow-y-auto">
		     	{children}
		    </div>
		  </div>
	  }
	</div>

	</>
	)
}