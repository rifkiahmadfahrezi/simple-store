const userData = [
	{
		id: 1,
		username: 'user',
		password: 'user12345', // min 8 characters
		type: 'buyer' // type = seller or buyer
	},
	{
		id: 2,
		username: 'seller',
		password: 'seller12345', // min 8 characters
		type: 'seller' // type = seller or buyer
	}
]

export function getUser(id){
	return userData.filter((data)=> data.id === Number(id))
}

export default userData