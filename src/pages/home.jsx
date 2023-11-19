import React, {useState, useEffect} from 'react'
import {useLoaderData, useSearchParams} from 'react-router-dom'
import Navbar from '../component/navbar'
import Card from '../component/card'
import product from '../utils/data.js'
import Dropdown from '../component/dropdown'
import Skeleton from '../component/skeleton'

export default function Home(){

    const [categories, setCategories] = useState([])
    const [productsData, setProductsData] = useState([])
    const [error, setError] = useState({isError: false, message: ''})
    const [selectedCategory, setSelectedCategory] = useState("select category")
    const [cart, setCart] = useState(localStorage.getItem('cart'))
    const [searchParams] = useSearchParams()
    const keyword = searchParams.get('q')



    useEffect(()=> {
      if(keyword === null) {
        // get all products if keyword in url is empty
        getProducts(product.getAllProducts())
        .catch(error => console.error(error)) 
      }else{
        async function searchProduct(data){
          const response = await data
          if(response.total <= 0){
            // get all products if searched product not found
            setError({isError: true, message: `Sorry ${keyword} product is not found, please try again`})
          }

          setProductsData(await data)
        }
        // get product by keyword if keyword in url is not empty
        searchProduct(product.searchProduct(keyword))
        .catch(err => console.error(err))
      }

      async function getCategories(data){
        setCategories(await data)
      }
      async function getProducts(data){
        setProductsData(await data)
      }

      // get all product categories
      getCategories(product.getAllCategory())
      .catch(error => console.error(error)) 
      
    },[])

    async function getProductByCategory(category){
      setProductsData([])
      setProductsData(await product.getProductByCategory(category))
    }

    function dropdownItemClickHandler(e){
      const category = e.target.dataset.category
      setSelectedCategory(category)
      getProductByCategory(category)
    }

    function addToCart(e){
      e.preventDefault()
      const productId = e.target.dataset.productid

      async function getProductsById(data){
        const response = await data


        const cartItem = {
          id: +new Date(),
          productId: response.id,
          title: response.title,
          brand: response.brand,
          thumbnail: response.thumbnail,
          price: response.price
        }

        setCart(cartItem)
        console.log(cart)

      }

      getProductsById(product.getProduct(productId))
      .catch(err=> console.error(err))
    }

    return(
      <>
        <Navbar/>

        <div className="container mx-auto mt-5 container mx-auto w-[90%] sm:w-full">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold font-montserrat capitalize text-indigo-900"
            >our products</h2>

            <Dropdown text={selectedCategory.split('-').join(' ')}>
              {categories.sort()?.map((item, i) => <span key={i} data-category={item} className="text-gray-700 block px-4 py-2 text-sm cursor-pointer hover:bg-slate-200 capitalize" onClick={(e)=> dropdownItemClickHandler(e)}>{item.split('-').join(' ')}</span>)}
            </Dropdown>
          </div>
        </div>

        {!error.isError ?
        <div className="grid container mx-auto w-[90%] sm:w-full mt-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">

            {productsData.products?.length > 0 ?
              productsData.products.map(item => {
                return (
                  <Card key={item.id} to={`/product/${item.id}`} style={`cursor-pointer hover:shadow-2xl shadow-md transition duration-300`} discount={item.discountPercentage}>
                    <Card.image src={item.thumbnail} alt={item.title} style="h-[250px] object-center"/>
                    <Card.body>
                        <p className="font-semibold mb-1 text-xl text-indigo-900">${item.price}</p>
                        <h4>{item.title}</h4>
                        <h5 className="font-semibold"><i className='text-indigo-900 bx bxs-check-circle'></i>{item.brand}</h5>
                        <span className="mt-1"><i className='bx bxs-star text-yellow-400 text-xl'></i> {item.rating}</span>
                    </Card.body>
                    <Card.footer >
                        <button type="button" onClick={e => addToCart(e)} className="py-2 w-full rounded-md bg-indigo-900 cursor-pointer font-montserrat text-white hover:bg-indigo-700" data-productid={item.id}>
                         <i className="bx bx-cart"></i> Add to cart
                        </button>
                    </Card.footer>
                  </Card> 
                )
              }) : <Skeleton number="8" style="h-[300px] rounded-md"/>
              
            }

        </div>
          : <div className="container mx-auto w-[90%] sm:w-full mt-8"><p>{error.message}</p></div>
        }


      </>
    )
  }


export async function loader(){
  const products = await product.getAllProducts()
  return {products}
}