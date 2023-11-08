import React from 'react'

export default function Link({to, style, children, onClickHandler}){
	return(<a href={to} className={`font-montserrat cursor-pointer ${style}`} onClick={e=> onClickHandler(e)}>{children}</a>)
}