import React, { createContext, useState } from 'react'

const ShoppingCartContext = createContext() 

function ShoppingCartContextProvider({children}){
	const [ cartItems, setCartItems ] = useState(JSON.parse(localStorage.getItem('cart')) ?? {items: [], totalPrice: 0})

	return (
		<ShoppingCartContext.Provider value={{ cartItems, setCartItems }}>
			{children}
		</ShoppingCartContext.Provider>
	)
}

export const ShoppingCart = ShoppingCartContext
export default ShoppingCartContextProvider