class Product {
	// product data
	async getAllProducts(limit = 20,skip = 0){
		const response = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`)
		const data = await response.json()
		return data
	}

	async getProduct(id = 1 ){
		const response = await fetch(`https://dummyjson.com/products/${Number(id)}`)
		const data = await response.json()
		return data
	}
	async searchProduct(keyword){
		const response = await fetch(`https://dummyjson.com/products/search?q=${keyword}`)
		const data = await response.json()
		return data
	}

// product category
	async getAllCategory(){
		const response = await fetch(`https://dummyjson.com/products/categories`)
		const data =  await response.json()
		// console.log('ok',data)
		return data
	}	
	async getProductByCategory(category, limit = 20, skip = 0){
		const response = await fetch(`https://dummyjson.com/products/category/${category}?limit=${limit}&skip=${skip}`)
		const data =  await response.json()
		return data
	}

	async getThumbnail(id){
		const response = await fetch(`https://dummyjson.com/products/${Number(id)}`)
		const data = await response.json()
		return data.thumbnail
	}
}
const product = new Product()
export default product

