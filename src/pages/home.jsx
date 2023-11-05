import React, {useState, useEffect} from 'react'
import Navbar from '../component/navbar'
import Card from '../component/card'
import product from '../utils/data.js'
import Dropdown from '../component/dropdown'

export default function Home(){

    const [categories, setCategories] = useState([])
    const [selectedCategory, setselectedCategory] = useState("select category")

    useEffect(()=> {
      async function fetchData(data){
        setCategories(await data)
      }

      fetchData(product.getAllCategory())
      .catch(error => console.error(error)) 
    },[])


    return(
      <>
        <Navbar />
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <h2 
            className="text-xl font-semibold font-montserrat capitalize text-indigo-900"
            >our products</h2>

            <Dropdown text={selectedCategory}>
              {categories.sort()?.map((item, i) => <span key={i} data-category={item} className="text-gray-700 block px-4 py-2 text-sm cursor-pointer hover:bg-slate-200 capitalize" onClick={(e)=> setselectedCategory(e.target.dataset.category)}>{item.split('-').join(' ')}</span>)}
            </Dropdown>
          </div>
        </div>
      </>
    )
  }
