const cart = {
	items: [],
	totalPrice: 0,
	add: function (productInfo) {

		if (productInfo === undefined) return false

		const cartItem = {
          id: productInfo.id,
          title: productInfo.title,
          img: productInfo.thumbnail,
          price: productInfo.price
        }

        const cartProduct = this.items.find(item => item.id === cartItem.id) ?? false
    
        if(!cartProduct){
        	this.items.push({...cartItem, quantity: 1, totalProductPrice: cartItem.price})
        	this.quantity++
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

		console.log("items:",this.items)
	}
}



export default cart