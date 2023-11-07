import React, {useState, useEffect} from 'react'
import {useLoaderData, useParams, useRouteError} from 'react-router-dom'
import Navbar from '../component/navbar'
import Card from '../component/card'
import ProductDetails from '../component/ProductDetails'
import product from '../utils/data.js'



export default function Product(){
	const { productId } = useParams()
	const { products } = useLoaderData(productId)
	const [ thumbnail, setThumbnail ] = useState(products.thumbnail)

	function changeThumbnail(e){
		const clickedImg = e.target.getAttribute('src')
		setThumbnail(clickedImg)
	}

	return(
		<>
			<Navbar/>
			{(products.id !== undefined) ? 
				<ProductDetails>
					<ProductDetails.thumbnail src={thumbnail} discount={products.discountPercentage}>
						{products?.images.map((item, i) => {
							return (
								<div key={i} 
									onClick={(e) => changeThumbnail(e)} 
									className="flex items-center rounded-md h-fit cursor-pointer hover:opacity-[.7] border-2 border-indigo-900">
									<img className="object-cover p-1" width="100%" src={item} alt={`image of ${products.category}`}/>
								</div>
							)
						})}
					</ProductDetails.thumbnail>
					<ProductDetails.information title={products.title} price={products.price} brand={products.brand} id={products.id} stock={products.stock} description={products.description}/>
				</ProductDetails>
				: 
			    <div className="container mx-auto min-h-screen w-screen flex justify-center items-center">
			      <div>
				      <h1 className="text-[40px] font-bold text-indigo-900 mb-3">Product not found:(</h1>
				      <p className="text-[30px]">Product with ID <span className="py-1 px-3 bg-indigo-100 rounded-sm">{productId}</span> not found</p>
				      <a href="/" className="hover:underline text-indigo-900 text-lg font-semibold capitalize">back to home</a>
			      </div>
			    </div>
	  
			}
		</>
	)
}



export async function loader(id){
	const productId = id.params.productId
	const products = await product.getProduct(productId)
	return { products }
}