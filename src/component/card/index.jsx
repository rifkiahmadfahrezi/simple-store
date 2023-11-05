import React from 'react'

export default function Card({to, children, style}){
	return(
		<a href={to} className={`p-3 rounded bg-white shadow-md ${style}`}>
			{children}
		</a>
	)
}