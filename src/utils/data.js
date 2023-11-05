class Product {
	// product data
	getAllProducts(){
		const data = []
		fetch('https://dummyjson.com/products')
		.then(res => res.json())
		.then(res => {
			data.push(...res)
		})
		.catch(err => console.error(err));
		return data
	}

	getProduct(id = 1 ){
		const data = []
		fetch(`https://dummyjson.com/products/${id}`)
		.then(res => res.json())
		.then(res => {
			data.push(...res)
		})
		.catch(err => console.error(err));
		return data
	}
	searchProduct(keyword){
		const data = []
		fetch(`https://dummyjson.com/products/search?q=${keyword}`)
		.then(res => res.json())
		.then(res => {
			data.push(...res)
		})
		.catch(err => console.error(err));
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

