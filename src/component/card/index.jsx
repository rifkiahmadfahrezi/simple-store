import React from 'react'

export default function Card({to, children, style = '', discount = 0}){
	return(
		<a href={to} 
			className={`rounded-lg relative bg-white shadow-md overflow-hidden ${style}`}>
			{discount > 0 && <span className="absolute top-0 right-0 bg-indigo-600 p-3 text-white text-sm">- {discount}%</span>}
			{children}
		</a>
	)
}

function image({src, alt, style = ''}){
	return (<img src={src} alt={alt} className={`w-full object-contain ${style}`} />)
}

function body({children, style = ''}){
	return (
		<div className={`p-3 ${style}`}>
			{children}
		</div>
	)
}

function footer({children, style = ''}){
	return (
		<div className={`p-3 ${style}`}>
			{children}
		</div>
	)
}


Card.image = image
Card.body = body
Card.footer = footer