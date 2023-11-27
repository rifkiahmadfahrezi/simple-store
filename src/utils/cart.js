import product from './data.js'

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
	add: function (productInfo) {
		if (productInfo === undefined) return this.items


		const cartItem = {
          id: productInfo.id,
          title: productInfo.title,
          img: productInfo.thumbnail,
          price: productInfo.price,
          stock: productInfo.stock
        }

        const cartProduct = this.items.find(item => item.id === cartItem.id)
        if(!cartProduct){
        	console.log('ok')
        	this.items.push({...cartItem, quantity: 1, totalProductPrice: cartItem.price})
        	this.totalPrice += cartItem.price
        	console.log(this)
        }else{
        	this.items = this.items.filter(item => {
        		if(item.id != cartItem.id) return item

        		if(item.quantity >= item.stock){
        			item.quantity = item.stock
        		}

        		// get product thumbnail if img is undefined
    			if(item.img == undefined || item.img == null){
    				async function getThumbnail(data){
    					console.log(await data)
						item.img = await data
					}

					getThumbnail(product.getThumbnail(productInfo.id))
					.catch((err) => console.log(err))
    			}

        		item.quantity++
    			item.totalProductPrice = item.price * item.quantity
				this.totalPrice += item.price
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
			this.items = this.items.map(item => {
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
        				console.log(item.quantity)
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
			localStorage.setItem('cart', JSON.stringify({
				items: this.items,
				totalPrice: this.totalPrice
			}))
		}
		return this
    	

	// let isRemoved = false
	// 	// show confirm popup
	// 	Swal.fire({
	// 	  title: "Are you sure?",
	// 	  text: "You won't be able to revert this!",
	// 	  icon: "warning",
	// 	  showCancelButton: true,
	// 	  confirmButtonColor: "#3085d6",
	// 	  cancelButtonColor: "#d33",
	// 	  confirmButtonText: "Yes, delete it!"
	// 	}).then((result) => {
	// 		// if user confirmed to delete the product
	// 	  if (result.isConfirmed) {
	// 	  	this.items = this.items.filter(item => {
	// 			if (item.id == id) {
	// 				item.quantity = 0
	// 				this.totalPrice -= item.totalProductPrice
	// 			}
	// 			return item.id != id
    //     	})

	// 	  	// find removed product
    //     	const removedProduct = this.items.find(item => item.id == id)
    //     	// if removed product is not found
    //     	// then show the success popup
    //     	if(removedProduct === undefined) {
    //     		isRemoved = true

    //     		Swal.fire({
	// 			  title: "Success",
	// 			  text: "This product deleted from cart!",
	// 			  icon: "success"
	// 			})
	// 			// if removed product still found 
	//         	// show the unsuccess pop up
	//         	}else{
	//         		isRemoved = false

	//         		Swal.fire({
	// 				  title: "Failed",
	// 				  text: "This product failed to delete from cart, please try again!",
	// 				  icon: "error"
	// 				})
	//         	}

	//         	localStorage.setItem('cart', JSON.stringify({
	// 				items: this.items,
	// 				totalPrice: this.totalPrice
	// 			}))
	//         console.log(isRemoved)
	//         return isRemoved
	// 	  }
	// 	})

	},
	renewTotalPrice: function(shoppingCart){
		shoppingCart.items.forEach((item) => {
			shoppingCart.totalPrice += item.totaProductPrice
		})

		localStorage.setItem('cart', JSON.stringify({
			items: this.items,
			totalPrice: shoppingCart.totalPrice
		}))

	}
}



export default cart