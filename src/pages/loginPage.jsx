import React, { useState, useEffect } from 'react'
import Card from '../component/Card'
import Input from '../component/elements/input/input'
import Label from '../component/elements/input/label'

export default function LoginPage(){

	const [ seePassword, setSeePassword ] = useState(false)


	function seePasswordClickHandler(){
		(!seePassword) ? setSeePassword(true) : setSeePassword(false)
	} 


	return(
		<div className="container mx-auto min-h-screen w-screen flex justify-center items-center">
		      <Card style="border border-2-indigo-900 min-w-[400px]">
		      	<Card.body >
		      		<form action="">
		      			<h2 className="text-indigo-900 text-[37px] mb-9 font-bold">Login</h2>

		      			<div className="flex flex-col mb-4">
		      				<Label style="mb-1 text-indigo-900">Username</Label>
		      				<Input style="border border-2-indigo-900 rounded-md" placeHolder="Username..."/>
		      			</div>
		      			<div className="flex flex-col mb-4">
		      				<Label style="mb-1 text-indigo-900">Password</Label>
		      				<div className="flex justify-between">
		      					<Input type={`${!seePassword ? `password` : `text`}`} style="rounded-l-md w-[90%] border border-2-indigo-900" placeHolder="Password..."/>
		      					<button onClick={seePasswordClickHandler} type="button" className="w-[10%] rounded-r-md text-center text-xl bg-indigo-900 text-white">
		      						<span className={`bx bx-${!seePassword ? `happy-heart-eyes` : 'tired'}`}></span>
		      					</button>
		      				</div>
		      			</div>
		      			<div className="flex flex-col mt-3">
		      				<button className="py-3 w-full rounded-md bg-indigo-900 cursor-pointer font-montserrat text-white hover:bg-indigo-700">
	                        Login
	                       </button>
		      			</div>

		      		</form>
		      	</Card.body>
		      </Card>
	    </div>
	)
}