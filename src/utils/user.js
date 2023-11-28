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
		surName: 'admin',
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

export default userData