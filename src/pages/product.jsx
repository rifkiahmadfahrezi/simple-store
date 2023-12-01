import React, {useState, useEffect, useContext} from 'react'
import {useLoaderData, useParams, useRouteError} from 'react-router-dom'
import Navbar from '../component/navbar'
import Card from '../component/card'
import Footer from '../component/footer'
import ProductDetails from '../component/ProductDetails'
import product from '../utils/data.js'
import cart from '../utils/cart.js'
import { ShoppingCart, addItem, decreaseItem,removeItem } from  '../context/ShoppingCart'



export default function Product(){
	const { productId } = useParams()
	const { products } = useLoaderData(productId)
	const [ thumbnail, setThumbnail ] = useState(products.thumbnail)
	const { cartItems, setCartItems } = useContext(ShoppingCart)


    function addToCart(e){
      e.preventDefault()
      // get id from clicked btn`
      const productId = e.target.dataset.productid

      // get Product info by ID
      async function getProductById(data){
        const response = await data ?? false
        if(!response){
          Swal.fire({
            title: "Adding product to cart failed!",
            timer: 1500,
            timerProgressBar: true,
            icon: 'error'
          });
        }else{
          if(addItem(setCartItems, response)){
            const existCartItem = cartItems.items.find(item => item.id == response.id)

            if (!existCartItem){
              Swal.fire({
                title: "Product added to cart!",
                timer: 1500,
                timerProgressBar: true,
                icon: 'success'
              }) 
            }else{
              if(existCartItem?.quantity >= response.stock){
                Swal.fire({
                  title: "Maximum quantity!",
                  text: `You can't have more quantity than product stock`,
                  timer: 3500,
                  timerProgressBar: true,
                  icon: 'error'
                })
              }
            }
          }else{
            Swal.fire({
            title: "Adding product to cart failed!",
            timer: 1500,
            timerProgressBar: true,
            icon: 'error'
          });
          }
        }
        
      }

      getProductById(product.getProduct(Number(productId)))
      .catch(err => console.error(err))
    }


	function changeThumbnail(e){
		const clickedImg = e.target.getAttribute('src')
		setThumbnail(clickedImg)
	}
	return(
		<>
			<Navbar/>
			<div className="container mx-auto w-[90%] sm:w-full mt-5 cursor-pointer hover:bg-white">
				<button type="button" onClick={()=> window.history.back()} ><i className='text-lg bx bx-arrow-back'></i></button>
			</div>
			<div className="min-h-screen">
				{(products.id !== undefined) ? 
					<ProductDetails>
						<ProductDetails.thumbnail src={thumbnail} discount={products.discountPercentage}>
							{products?.images.map((item, i) => {
								return (
									<div key={i} 
										onClick={(e) => changeThumbnail(e)} 
										className={`flex items-center border-2 border-indigo-900 cursor-pointer  hover:opacity-[.7] max-w-[100px] h-[100px] rounded-md ${item == thumbnail ? 'ring ring-indigo-300' : null}`}>
										<div>
											<img className={`${item == thumbnail ? 'opacity-[8]' : null}object-cover p-1`} width="100%" height="100%" src={item} alt={`image of ${products.category}`}/>
										</div>
									</div>
								)
							})}
						</ProductDetails.thumbnail>
						<ProductDetails.information 
							title={products.title} 
							price={products.price} 
							brand={products.brand} 
							id={products.id} 
							stock={products.stock} 
							description={products.description}
							addToCartHandler={addToCart}/>
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
			</div>

			<Footer/>
		</>
	)
}



export async function loader(id){
	const productId = id.params.productId
	const products = await product.getProduct(productId)
	return { products }
}