import React from 'react'

export default function Skeleton({number = 1, style}){
	const skeletons = []
	for(let i = 0; i < number; i++){
		skeletons.push(<div key={i} className={`bg-slate-300 animate-pulse ${style}`}></div>)
	}
	return (
		<>
		{skeletons.map(item => item)}
		</>
	)
}