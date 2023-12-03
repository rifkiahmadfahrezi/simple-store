import React, { createContext, useState, useEffect } from 'react'
import cart from '../utils/cart.js'
import product from '../utils/data.js'
const ShoppingCartContext = createContext() 

function ShoppingCartContextProvider({children}){
	const [ cartItems, setCartItems ] = useState(JSON.parse(localStorage.getItem('cart')) ?? {items: [], totalPrice: 0})

	useEffect(()=> {

      if (cartItems.length > 1){
        const items = cartItems.filter((item) => item.id != undefined) 
		    items.totalPrice = cart.renewTotalPrice(items)
        localStorage.setItem('cart', JSON.stringify(items))
      }else{
         localStorage.setItem('cart', JSON.stringify(cartItems))
      }
      // console.log(cartItems)
    }, [cartItems])


	return (
		<ShoppingCartContext.Provider value={{ cartItems, setCartItems }}>
			{children}
		</ShoppingCartContext.Provider>
	)
}

export function addNewItem(cartItems, setItemHook,id){
  // get Product info by ID
      async function getProductById(data){
        const response = await data ?? false
        if(!response){
          Swal.fire({
            title: "Adding product to cart failed!",
            timer: 1500,
            timerProgressBar: true,
            icon: 'error'
          });
        }else{
          if(addItem(setItemHook, response)){
            const existCartItem = cartItems.items.find(item => item.id == response.id)

            if(existCartItem?.quantity > 1){
              Swal.fire({
                title: "Product added to cart!",
                position: 'top-end',
                timer: 1500,
                timerProgressBar: true,
                icon: 'success'
              }) 
            }


            if (!existCartItem){
              Swal.fire({
                title: "New product added to cart!",
                position: 'top-end',
                timer: 1500,
                timerProgressBar: true,
                icon: 'success'
              }) 
            }else{
              if(existCartItem?.quantity >= response.stock){
                Swal.fire({
                  title: "Maximum quantity!",
                  text: `You can't have more quantity than product stock`,
                  timer: 3500,
                  timerProgressBar: true,
                  icon: 'error'
                })
              }
            }
          }else{
            Swal.fire({
            title: "Adding product to cart failed!",
            timer: 1500,
            timerProgressBar: true,
            icon: 'error'
          });
          }
        }
        
      }

      getProductById(product.getProduct(Number(id)))
      .catch(err => console.error(err))
}

export function addItem(setItemHook, item){
  if(item.quantity <= item.stock || item.quantity == undefined){
    cart.add(item)
    setItemHook(JSON.parse(localStorage.getItem('cart')))
    return true
  }else{
  	return false
  }
}

export function decreaseItem(setItemHook,item){
  if(item.quantity <= 1){
    removeItem(setItemHook,item.id)
  }else{
    cart.decrease(item)

  }
  setItemHook(JSON.parse(localStorage.getItem('cart')))
}

export function removeItem(setItemHook,id){
  Swal.fire({
    title: "Are you sure?",
    text: "remove this product from cart?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {
    // if user confirmed to delete the product
    if (result.isConfirmed) {
        cart.remove(id)
        // find removed product
        const removedProduct = cart.remove(id).items.find(item => item.id == id)
        // if removed product is not found
        // then show the success popup
        if(removedProduct === undefined) {
	        setItemHook(JSON.parse(localStorage.getItem('cart')))
	        Swal.fire({
	           title: "Success",
	           text: "This product deleted from cart!",
	           icon: "success"
	        })
        // if removed product still found 
        // show the unsuccess pop up
	    }else{
	   	    Swal.fire({
	          title: "Failed",
	          text: "This product failed to delete from cart, please try again!",
	          icon: "error"
	        })
	    }
    }
  })
}
export const ShoppingCart = ShoppingCartContext
export default ShoppingCartContextProvider
