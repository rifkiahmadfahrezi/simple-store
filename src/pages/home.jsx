import React, {useState, useEffect} from 'react'
import {useLoaderData} from 'react-router-dom'
import Navbar from '../component/navbar'
import Card from '../component/card'
import product from '../utils/data.js'
import Dropdown from '../component/dropdown'
import  Skeleton from '../component/skeleton'

export default function Home(){

    const [categories, setCategories] = useState([])
    const [productsData, setProductsData] = useState([])
    const [selectedCategory, setSelectedCategory] = useState("select category")

    useEffect(()=> {
      async function getCategories(data){
        setCategories(await data)
      }
      async function getProducts(data){
        setProductsData(await data)
      }

      // get all product categories
      getCategories(product.getAllCategory())
      .catch(error => console.error(error)) 
      // get all products
      getProducts(product.getAllProducts())
      .catch(error => console.error(error)) 
     
      // console.log(productsData)
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

    return(
      <>
        <Navbar />

        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold font-montserrat capitalize text-indigo-900"
            >our products</h2>

            <Dropdown text={selectedCategory.split('-').join(' ')}>
              {categories.sort()?.map((item, i) => <span key={i} data-category={item} className="text-gray-700 block px-4 py-2 text-sm cursor-pointer hover:bg-slate-200 capitalize" onClick={(e)=> dropdownItemClickHandler(e)}>{item.split('-').join(' ')}</span>)}
            </Dropdown>
          </div>
        </div>

        <div className="grid container mx-auto mt-8 grid-cols-3 gap-4">
          {productsData.products?.length > 0 ?
            productsData.products.map(item => {
              return (
                <Card key={item.id} to={`/product/${item.id}`} style={`cursor-pointer hover:scale-[1.01] shadow-lg transition duration-300`} discount={item.discountPercentage}>
                  <Card.image src={item.thumbnail} alt={item.title} style="h-[250px] object-center"/>
                  <Card.body>
                      <p className="font-semibold mb-1 text-xl text-indigo-900">${item.price}</p>
                      <h4>{item.title}</h4>
                      <h5 className="font-semibold"><i className='text-indigo-900 bx bxs-check-circle'></i>{item.brand}</h5>
                      <span className="mt-1"><i className='bx bxs-star text-yellow-400 text-xl'></i> {item.rating}</span>
                  </Card.body>
                </Card> 
              )
            }) : <Skeleton number="8" style="h-[300px] rounded-md"/>
            
          }
        </div>


      </>
    )
  }


export async function loader(){
  const products = await product.getAllProducts()
  return {products}
}