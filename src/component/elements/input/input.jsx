import React from 'react'

export default function Input({ readOnly, type = 'text', onChangeHandler, placeHolder, style, id, value}){
	return(<input readOnly type={type} placeholder={placeHolder} id={id} 
			className={`py-2 px-3 ${style}`} value={value} onChange={e=> onChangeHandler(e)}/>)
}