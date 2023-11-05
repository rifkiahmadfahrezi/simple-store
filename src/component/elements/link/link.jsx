import React from 'react'

export default function Link({to, style, children }){
	return(<a href={to} className={`font-montserrat ${style}`} >{children}</a>)
}