import React, { useState, useRef, useEffect} from 'react'
import Card from '../component/Card'
import Input from '../component/elements/input/input'
import Label from '../component/elements/input/label'
import userData from '../utils/user.js'

export default function LoginPage(){

	const [ seePassword, setSeePassword ] = useState(false)
	const [ error, setError ] = useState({isError: false, message: null})
	// json.parse for change string to boolean
	const [ isLogin, setIsLogin] = useState(JSON.parse(sessionStorage.getItem('login')))

	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	useEffect(() => {
		if(isLogin){
			window.location.href = window.location.origin
		}
	},[])

	function seePasswordClickHandler(){
		(!seePassword) ? setSeePassword(true) : setSeePassword(false)
	} 


	function submitFormHandler(e){
		e.preventDefault()
		// reset form if login failed
		if (error.isError) e.target.reset() 
		doLogin(username, password)
	}

	function doLogin(username = null, password = null){
		if (username === null || password === null) return

		const filtered = userData.filter((data) => {	
			// check if username and password correct
			return (data.username == username || data.email === username) && data.password == password
		})

		if (filtered.length <= 0) return setError({isError: true, message: 'Your login information is incorrect, please try again'})
		// if login information correct set login session
		sessionStorage.setItem("login", true)
		sessionStorage.setItem("userId", filtered[0].id)


		// sessionStorage.setItem("userid", )
		setError({isError: false, message: null})
		// redirect to homePage
		window.location.href = window.location.origin
	}

	function userInputHandler(e){
		const value = e.target.value
		setUsername(value)

	}
	function passwordInputHandler(e){
		const value = e.target.value
		setPassword(value)
	}

	return(
	<>
		<div className="container mx-auto w-[90%] sm:w-full min-h-[80vh] md:min-h-screen w-screen flex justify-center items-center">
		      <Card style="border border-2-indigo-900 min-w-[400px]">
		      	<Card.body >
		      		<form onSubmit={(e) => submitFormHandler(e)} >
		      			<div className="mb-9">
		      				<h2 className="text-indigo-900 text-[37px] font-bold">Login</h2>
		      				{error.isError && <span className="mt-1 text-red-400">{error.message}</span>}
		      			</div>

		      			<div className="flex flex-col mb-4">
		      				<Label style="mb-1 text-indigo-900">Username</Label>
		      				<input 
		      					onChange={(e) => userInputHandler(e)} 
		      					className="py-2 px-4 border border-2-indigo-900 rounded-md" 
		      					defaultValue={username}
		      					placeholder="Username..."/>
		      			</div>
		      			<div className="flex flex-col mb-4">
		      				<Label style="mb-1 text-indigo-900">Password</Label>
		      				<div className="flex justify-between">
		      					<input 
		      						type={`${!seePassword ? `password` : `text`}`} 
		      						className="py-2 px-4 rounded-l-md w-[90%] border border-2-indigo-900" 
		      						placeholder="Password..."
		      						defaultValue={password} 
		      						onChange={(e) => passwordInputHandler(e)} />

		      					<button 
		      						onClick={seePasswordClickHandler} 
		      						type="button" 
		      						className="w-[10%] rounded-r-md text-center text-xl bg-indigo-900 text-white">
		      							<span className={`bx bx-${!seePassword ? `happy-heart-eyes` : 'tired'}`}></span>
		      					</button>
		      				</div>
		      			</div>
		      			<div className="flex flex-col mt-3">
		      				<button 
		      					type="submit"
		      					className="py-3 w-full rounded-md bg-indigo-900 cursor-pointer font-montserrat text-white hover:bg-indigo-700">
	                        Login
	                       </button>
		      			</div>

		      		</form>
		      	</Card.body>
		      </Card>
	    </div>
	  </>
	)
}