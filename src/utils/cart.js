const cart = {
	items: [],
	totalPrice: 0,
	add: function (productInfo) {

		if (productInfo === undefined) return false

		const cartItem = {
          id: productInfo.id,
          title: productInfo.title,
          img: productInfo.thumbnail,
          price: productInfo.price,
          stock: productInfo.stock
        }

        const cartProduct = this.items.find(item => item.id === cartItem.id) ?? false
    
        if(!cartProduct){
        	this.items.push({...cartItem, quantity: 1, totalProductPrice: cartItem.price})
        	this.totalPrice += cartItem.price
        }else{
        	this.items = this.items.map(item => {
        		if(item.id != cartItem.id) return item
        		item.quantity++
    			item.totalProductPrice = item.price * item.quantity
				this.totalPrice += item.price
				return item
  
        	})
        }
        localStorage.setItem('cart', JSON.stringify(this))
	},
	decrease: function(productInfo){

		const cartProduct = this.items.find(item => item.id === productInfo.id) ?? false


		if(cartProduct !== undefined){
			this.items = this.items.map(item => {
        		if(item.id != productInfo.id) return item

        		item.quantity--
    			item.totalProductPrice = item.price * item.quantity
				this.totalPrice -= item.price
				return item
        	})
		}else{
			console.log('ok')
		}

		localStorage.setItem('cart', JSON.stringify(this))

	},
	remove: function(id){
		this.items = this.items.filter(item => item.id !== id)
		this.items.map(item => {
			if(item.id === id){
				this.totalPrice -= item.totalProductPrice
			}
		})

		localStorage.setItem('cart', JSON.stringify(this))

	}
}



export default cart