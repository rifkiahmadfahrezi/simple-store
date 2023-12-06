const userData = [
	{
		id: 1,
		fullName: 'Rifki ahmad fahrezi',
		address: {
			country: 'indonesia',
			fullAddress: 'Jl Idi Adimaja 13, Jawa Barat',
			city: 'Bandung',
			state: 'west java',
			zip: '7107',
		},
		email: 'rifki@simplestore.com',
		username: 'user',
		password: 'user12345', // min 8 characters
		type: 'buyer' // type = admin or buyer
	},
	{
		id: 2,
		fullName: 'Budi',
		address: {
			country: 'indonesia',
			fullAddress: 'Jl jalan',
			city: 'Bandung',
			state: 'west java',
			zip: '8079',
		},
		email: 'budi@simplestore.com',
		username: 'user',
		password: 'user12345', // min 8 characters
		type: 'buyer' // type = admin or buyer
	},
	{
		id: 3,
		fullName: 'admin',
		username: 'admin',
		email: 'admin@simplestore.com',
		password: 'admin12345', // min 8 characters
		type: 'admin' // type = admin or buyer
	}
]

export function getUser(id){
	const user = userData.filter((data)=> data.id === Number(id))
	return user[0]
}

export function isUserExist(id= null){
	if(id === null) return console.error('Provide an id to check exist user')
	const existUser = userData.find((user) => Number(user.id) === Number(id)) ?? false
	return !existUser ? false : true
}

export default userData