class Product {
	// product data
	async getAllProducts(){
		const response = await fetch('https://dummyjson.com/products')
		const data = await response.json()
		return data
	}

	getProduct(id = 1 ){
		const response = fetch(`https://dummyjson.com/products/${id}`)
		const data = response.json()
		return data
	}
	searchProduct(keyword){
		const response = fetch(`https://dummyjson.com/products/search?q=${keyword}`)
		const data = response.json()
		return data
	}

// product category
	async getAllCategory(){
		const response = await fetch(`https://dummyjson.com/products/categories`)
		const data =  await response.json()
		// console.log('ok',data)
		return data
	}
	async getProductByCategory(category){
		const response = await fetch(`https://dummyjson.com/products/category/${category}`)
		const data =  await response.json()
		return data
	}
}
const product = new Product()
export default product

