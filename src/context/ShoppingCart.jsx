import React, { createContext, useState, useEffect } from 'react'
import cart from '../utils/cart.js'
import product from '../utils/data.js'
import { getUser, isUserExist } from '../utils/user.js'
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

// cartItems down here is a state that come from the children component
// or from the component that call these funtion below
// so is not the same as the cartItem at the ShoppingCartContextProvider function

// setItemHook is basicaly a setState hook from the child component
// or from the component that call these funtion below

// autorized will true if user do checkout by clicking the checkout button
export function doCheckOut(setItemHook, cartItems, authorized = false, userId= null){
  if(!authorized && userId === null) return
  // check is user exist in user data
  if(!isUserExist(userId)) return
  //get user data to get user address
  const userData = getUser(Number(userId))
  const userAddress = { 
    fullName: userData.fullName,
    email: userData.email,
    address: userData.address
  }
  // if cart items is empty
  if(cartItems.items.length <= 0) return

  // check is there a transaction before
  const transactionHistory = localStorage.getItem('history') ?? false
  
  // if this is the first checkout
  if(!transactionHistory){
    // set transaction history to localStorage
    localStorage.setItem('history', JSON.stringify([{id: +new Date(),user: userId, items: cartItems.items, totalCheckoutPrice: cartItems.totalPrice, address: userAddress}]))
  }else{
    // if there is a transaction before
    // add transaction history and the new transaction data to local storage
    localStorage.setItem('history', JSON.stringify([...JSON.parse(transactionHistory), {id: +new Date(),user: userId, items: cartItems.items, totalCheckoutPrice: cartItems.totalPrice, address: userAddress}]))
  }

  // set shopping cart to empty
  setItemHook({items: [], totalPrice: 0})
  localStorage.setItem('cart', JSON.stringify({items: [], totalPrice: 0}))

  Swal.fire({
    title: 'Transaction success!',
    icon: 'success',
    timer: 3000,
    timerProgressBar: true,
  })

  setTimeout(()=> {
    window.location.href = window.location.origin
  }, 3000)

}

export function addNewItem(cartItems, setItemHook,id){
  // get Product info by ID
      async function getProductById(data){
        const response = await data ?? false
        if(!response){
          Swal.fire({
            toast: true,
            icon: 'error',
            title: 'Product failed add to cart cart',
            animation: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
          }) 
        }else{
          if(addItem(setItemHook, response)){
            const existCartItem = cartItems.items.find(item => item.id == response.id)

            if(existCartItem?.quantity > 1){
                Swal.fire({
                  toast: true,
                  icon: 'success',
                  title: 'Product added to cart',
                  animation: true,
                  position: 'top-end',
                  showConfirmButton: false,
                  timer: 2000,
                  timerProgressBar: true,
                })  
            }


            if (!existCartItem){
              Swal.fire({
                toast: true,
                icon: 'success',
                title: 'New product added to cart',
                animation: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
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
