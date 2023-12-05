import product from './data.js'
import { getDiscountedPrice } from './tools.js'


function getCartItems() {
	return JSON.parse(localStorage.getItem('cart')) !== null 
			? JSON.parse(localStorage.getItem('cart')).items 
			: []
}
function getCartTotalPrice() {
	return JSON.parse(localStorage.getItem('cart')) !== null 
			? JSON.parse(localStorage.getItem('cart')).totalPrice 
			: 0
}

const cart = {
	items: getCartItems(),
	totalPrice: getCartTotalPrice(),
	// productInfo is an object contain with product information like id,title,thumbnail ...etc
	// addQuantity is a number of quantity that user input at the cart modal
	add: function (productInfo, addQuantity = 0) {
		if (productInfo === undefined) return this.items

		const cartItem = {
          id: productInfo.id,
          title: productInfo.title,
          img: productInfo.thumbnail,
          discountPercentage: productInfo.discountPercentage ?? 0,
          actualPrice: productInfo.price,
          price: getDiscountedPrice(productInfo.discountPercentage, productInfo.price) ?? productInfo.price, // after discounted
          stock: productInfo.stock
        }

        const cartProduct = this.items.find(item => item.id === cartItem.id)
        if(!cartProduct){
        	this.items.push({...cartItem, quantity: 1, totalProductPrice: cartItem.price})
        	this.totalPrice += cartItem.price
        }else{
        	this.items = this.items.filter((item, index, arr) => {
        		if(item.id != cartItem.id) return item


        		// get product thumbnail if img is undefined
    			if(item.img == undefined || item.img == null){
    				async function getThumbnail(data){
    					console.log(await data)
						item.img = await data
					}

					getThumbnail(product.getThumbnail(productInfo.id))
					.catch((err) => console.log(err))
    			}
    			
    			if(addQuantity > 0){
    				item.quantity = addQuantity
    			}else{
        			item.quantity++
    			}

        		if(item.quantity >= item.stock){
        			item.quantity = item.stock
        		}else{
					this.totalPrice += item.price
        		}
    			item.totalProductPrice = item.price * item.quantity
        		this.totalPrice = this.renewTotalPrice(this)
				return item
  
        	})

        }
        // remove cart item with no id 
    	this.items = this.items.filter(item => item.id !== undefined)
        localStorage.setItem('cart', JSON.stringify({
			items: this.items,
			totalPrice: this.totalPrice
		}))

		return this
	},
	decrease: function(productInfo){
		const cartProduct = this.items.find(item => item.id === productInfo.id)

		if(cartProduct){
			this.items = this.items.map((item) => {
        		if(item.id == productInfo.id){
        			// get product thumbnail if img is undefined
        			if(item.img == undefined || item.img == null){
        				async function getThumbnail(data){
							item.img = await data
						}

						getThumbnail(product.getThumbnail(productInfo.id))
						.catch((err) => console.log(err))
        			}

        			if(item.quantity <= 1){
        				Swal.fire({
						  title: "Are you sure?",
						  text: "You won't be able to revert this!",
						  icon: "warning",
						  showCancelButton: true,
						  confirmButtonColor: "#3085d6",
						  cancelButtonColor: "#d33",
						  confirmButtonText: "Yes, delete it!"
						}).then((result) => {
						  if (result.isConfirmed) {
						    Swal.fire({
						      title: "Deleted!",
						      text: "Product deleted from cart!",
						      icon: "success"
						    });
						  	this.remove(item.id)
        					return item.id != productInfo.id
						  }
						})
        			}else{
        				item.quantity--
        				item.totalProductPrice = item.price * item.quantity
        				this.totalPrice -= item.price
        				return item
        			}
        		}
        		return item
        	})
		}
		// remove cart item with no id 
    	this.items = this.items.filter(item => item.id !== undefined)

		localStorage.setItem('cart', JSON.stringify({
			items: this.items,
			totalPrice: this.totalPrice
		}))
	},
	remove: function(id){
		this.items = this.items.filter(item => {
			if (item.id == id) {
				item.quantity = 0
				this.totalPrice -= item.totalProductPrice
			}
			return item.id != id
    	})

		const removedProduct = this.items.find(item => item.id == id)

		if (removedProduct === undefined) {
			this.totalPrice = 0
			localStorage.setItem('cart', JSON.stringify({
				items: this.items,
				totalPrice: this.renewTotalPrice(this)
			}))
		}
		return this
	},
	renewTotalPrice: function(shoppingCart){
		shoppingCart.totalPrice = 0
		shoppingCart.items.forEach((item) => {
			shoppingCart.totalPrice += item.totalProductPrice
		})

		this.totalPrice = shoppingCart.totalPrice

		localStorage.setItem('cart', JSON.stringify({
			items: this.items,
			totalPrice: shoppingCart.totalPrice
		}))

		return shoppingCart.totalPrice

	}
}



export default cart