import React from 'react'

export default function Link({to, style, text }){
	return(<a href={to} className={`font-montserrat capitalize ${style}`} >{text}</a>)
}