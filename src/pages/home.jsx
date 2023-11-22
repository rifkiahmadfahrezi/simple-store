import React, {useState, useEffect} from 'react'
import {useLoaderData, useSearchParams} from 'react-router-dom'
import Navbar from '../component/navbar'
import Card from '../component/card'
import Alert from '../component/Alert'
import product from '../utils/data.js'
import Dropdown from '../component/dropdown'
import Skeleton from '../component/skeleton'
import cart from '../utils/cart.js'

export default function Home(){

    const [categories, setCategories] = useState([])
    const [productsData, setProductsData] = useState([])
    const [error, setError] = useState({isError: false, message: ''})
    const [selectedCategory, setSelectedCategory] = useState("select category")
    const [searchParams] = useSearchParams()
    const keyword = searchParams.get('q').toLowerCase()
    const [alert, setAlert] = useState(false)



    useEffect(()=> {
      getProducts(product.getAllProducts())
      .catch(error => console.error(error)) 

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
      // get id from clicked btn
      const productId = e.target.dataset.productid

      // get Product info by ID
      async function getProductById(data){
        const response = await data
        cart.add(response)

        setAlert(true)
        setTimeout(()=> {
          setAlert(false)
        }, 3500)
      }

      getProductById(product.getProduct(Number(productId)))
      .catch(err => console.error(err))
    }

    return(
      <>
        <Navbar/>
        {alert && <Alert bg="bg-green-500" text="Product added to cart!"/>}

        <div className="container mx-auto mt-5 z-[1] container mx-auto w-[90%] sm:w-full">
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
              productsData.products.filter((item) => {
                if(keyword !== null) {
                  return (item.title.toLowerCase().includes(keyword) || item.brand.toLowerCase().includes(keyword))
                }
                return productsData.products
              })?.map(item => {
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