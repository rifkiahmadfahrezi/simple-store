import React, {useState, useEffect} from 'react'
import {useLoaderData, useParams} from 'react-router-dom'
import Navbar from '../component/navbar'
import Card from '../component/card'
import ProductDetails from '../component/ProductDetails'
import product from '../utils/data.js'



export default function Product(){
	const { productId } = useParams()
	const { products } = useLoaderData(productId)

	console.log(products)

	return(
		<>
			<Navbar/>
			<ProductDetails>
				<ProductDetails.thumbnail src={products.thumbnail} discount={products.discountPercentage}>
					{products.images.map((item, i) => {
						return (
							<div key={i} className="flex items-center rounded-md h-[100px] cursor-pointer hover:opacity-[.7] border-2 border-indigo-900 p-1">
								<img className="object-cover" width="100" src={item} alt={`image of ${products.category}`}/>
							</div>
						)
					})}
				</ProductDetails.thumbnail>
				<ProductDetails.information title={products.title} price={products.price} brand={products.brand} id={products.id} stock={products.stock} description={products.description}/>
			</ProductDetails>
		</>
	)
}

export async function loader(id){
	const productId = id.params.productId
	const products = await product.getProduct(productId)
	return { products }
}