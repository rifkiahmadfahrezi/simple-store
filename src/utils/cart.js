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
	getThumbnail: async function(item,data){
		console.log(await data)
		item.img = await data
	},
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

        		// get product thumbnail if img is undefined
    			if(item.img == undefined || item.img == null){
    				this.getThumbnail(item, product.getThumbnail(productInfo.id))
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
	},
	decrease: function(productInfo){

		const cartProduct = this.items.find(item => item.id === productInfo.id)

		if(!cartProduct){
			this.items = this.items.map(item => {
        		if(item.id == productInfo.id){
        			// get product thumbnail if img is undefined
        			if(item.img == undefined || item.img == null){
        				this.getThumbnail(item, product.getThumbnail(productInfo.id))
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
			items: [cartItems, ...this.items],
			totalPrice: this.totalPrice
		}))

	},
	remove: function(id){
		// show confirm popup
		Swal.fire({
		  title: "Are you sure?",
		  text: "You won't be able to revert this!",
		  icon: "warning",
		  showCancelButton: true,
		  confirmButtonColor: "#3085d6",
		  cancelButtonColor: "#d33",
		  confirmButtonText: "Yes, delete it!"
		}).then((result) => {
			// if user confirmed to delete the product
		  if (result.isConfirmed) {
		  	this.items = this.items.filter(item => {
				if (item.id == id) this.totalPrice -= item.totalProductPrice
				return item.id != id
        	})

		  	// find removed product
        	const removedProduct = this.items.find(item => item.id == id)
        	// if removed product is not found
        	// then show the success popup
        	if(removedProduct === undefined) {
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

        	localStorage.setItem('cart', JSON.stringify({
				items: this.items,
				totalPrice: this.totalPrice
			}))

		  }
		})
	

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