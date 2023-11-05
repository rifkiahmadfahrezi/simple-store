import React from 'react'

export default function Label({htmlFor, style, children}){
	return(<label htmlFor={htmlFor} className={style}>{children}</label>)
}