import React, {useState, useEffect, useContext} from 'react'
import {useLoaderData, useSearchParams} from 'react-router-dom'
import Navbar from '../component/navbar'
import Card from '../component/card'
import Footer from '../component/footer'
import product from '../utils/data.js'
import Dropdown from '../component/dropdown'
import Skeleton from '../component/skeleton'
import Pagination from '../component/pagination'
import cart from '../utils/cart.js'
import { getDiscountedPrice } from '../utils/tools.js'
import { ShoppingCart, addNewItem, decreaseItem,removeItem } from  '../context/ShoppingCart'

export default function Home(){

    const [  categories, setCategories ] = useState([])
    const [ productsData, setProductsData ] = useState([])
    const [ error, setError ] = useState({isError: false, message: '', img: null})
    const [ selectedCategory, setSelectedCategory ] = useState(null)
    const [ isCategoryExist, setIsCategoryExist ] = useState(false)
    const [ showData, setShowData ] = useState({perPage: 20, currentPage: 1})
    const [ productsTotalLength, setProductsTotalLength ] = useState(0)

    const [searchParams, setSearchParams] = useSearchParams({q:''})
    const keywordParams = searchParams.get('q') || null
    const currentPageParams = searchParams.get('page') || 1
    const categoryParams = searchParams.get('category') || 'all'

    const { cartItems, setCartItems } = useContext(ShoppingCart)

    async function getProducts(data){
      const response = await data
      setProductsData(response.products)
    }

    useEffect(()=>{
      const categoryExist = categories.find(category => category === categoryParams) ?? false
      !categoryExist ? setIsCategoryExist(false) : setIsCategoryExist(true)
    },[categories])


    useEffect(()=> {
      if (isCategoryExist){
        if(categoryParams !== 'all'){
          setSelectedCategory(categoryParams)
          getProductByCategory(categoryParams)
        }
      }else{
        // const skip = (Number(showData.perPage) * Number(currentPageParams)) - Number(showData.perPage)
        // getProducts(product.getAllProducts(Number(showData.perPage)), skip)
        // .catch(error => {
        //   console.error(error)

        //   Swal.fire({
        //     title: 'Someting went wrong :(',
        //     text: 'Fail to get products data from server, please wait!',
        //     timer: 2500,
        //     timerProgressBar: true,
        //   })

        //   setTimeout(()=> location.reload(), 2500)
        // })
      }
    }, [isCategoryExist])

    useEffect(()=> {
      async function getCategories(data){
        const response = await data
        setCategories(['all', ...response])
      }

      async function getProductsLength(data){
        const response = await data
        setProductsTotalLength(response.products.length)
      }

      // get all product categories
      getCategories(product.getAllCategory())
      .catch(error => {
        console.error(error)
        Swal.fire({
          title: 'Someting went wrong :(',
          text: 'Fail to get product categories data from server, please wait!',
          timer: 2500,
          timerProgressBar: true,
        })

        setTimeout(()=> location.reload(), 2500)
      }) 


      getProductsLength(product.getAllProducts(100))
        .catch(error => {
          console.error(error)

          Swal.fire({
            title: 'Someting went wrong :(',
            text: 'Fail to get products length data from server, please wait!',
            timer: 2500,
            timerProgressBar: true,
          })

          setTimeout(()=> location.reload(), 2500)
        })

      // if(categoryParams === 'all') {
      //   const skip = (Number(showData.perPage) * Number(currentPageParams)) - Number(showData.perPage)
      //   console.log('sip')
      //   getProducts(product.getAllProducts(Number(showData.perPage)), skip)
      //   .catch(error => {
      //     console.error(error)

      //     Swal.fire({
      //       title: 'Someting went wrong :(',
      //       text: 'Fail to get products data from server, please wait!',
      //       timer: 2500,
      //       timerProgressBar: true,
      //     })

      //     setTimeout(()=> location.reload(), 2500)
      //   })
        
      // }
    },[])

    useEffect(()=> {
      const pages = (productsTotalLength / showData.perPage)
      console.log(productsTotalLength)
      // if page params in url is not exceed the max page
      if(Number(currentPageParams) >= 1 && Number(currentPageParams) <= pages){
        setShowData({perPage: 20, currentPage: Number(currentPageParams)})
      }else{
        if(categoryParams === 'all') return
        if(productsData.length >= showData.perPage){
          setShowData({perPage: 20, currentPage: 1})
          setError({
            isError: true,
            message: `Sorry :), can't display product at page number ${currentPageParams}, there is only ${pages} ${pages > 1 ? 'pages' : 'page'}`,
          })
        }
      }
    }, [productsTotalLength])

    useEffect(()=> {
      const skip = (Number(showData.perPage) * Number(currentPageParams)) - Number(showData.perPage)

      if(categoryParams !== 'all'){
        getProducts(product.getProductByCategory(categoryParams,showData.perPage, skip))
        .catch(error => {
          console.error(error)

          Swal.fire({
            title: 'Someting went wrong :(',
            text: 'Fail to get products data from server, please wait!',
            timer: 2500,
            timerProgressBar: true,
          })

          setTimeout(()=> location.reload(), 2500)
        })

      }else{
        getProducts(product.getAllProducts(showData.perPage, skip))
        .catch(error => {
          console.error(error)

          Swal.fire({
            title: 'Someting went wrong :(',
            text: 'Fail to get products data from server, please wait!',
            timer: 2500,
            timerProgressBar: true,
          })

          setTimeout(()=> location.reload(), 2500)
        })
      }

    }, [showData])


    function getProductByCategory(category){

      setProductsData([]) //  for making skeleton loading
      getProducts(product.getProductByCategory(category))
      .catch((error) => {
        console.error(error)
        Swal.fire({
          title: 'Someting went wrong :(',
          text: 'Fail to get products data from server, please wait!',
          timer: 2500,
          timerProgressBar: true,
        })

        setTimeout(()=> location.reload(), 2500)
      })
       // setProductsTotalLength(productsData.length)
    }

    function dropdownItemClickHandler(e){
      const category = e.target.dataset.category

      const categoryExist = categories.find(ctgry => ctgry === category) ?? false
      !categoryExist ? setIsCategoryExist(false) : setIsCategoryExist(true)

      setSearchParams(prev => {
        prev.set('category', category)
        prev.set('page', 1) // reset current page to 1
        return prev
      },{ replace: true})

      setSelectedCategory(category)

      if ( category !== 'all' ){
         getProductByCategory(category)
      }else{
        const skip = (Number(showData.perPage) * Number(currentPageParams)) - Number(showData.perPage)
        setProductsData([]) //  for making skeleton loading
        getProducts(product.getAllProducts(showData.perPage, skip))
        .catch((error) => {
          console.error(error)
          Swal.fire({
            title: 'Someting went wrong :(',
            text: 'Fail to get products data from server, please wait!',
            timer: 2500,
            timerProgressBar: true,
          })

          setTimeout(()=> location.reload(), 2500)
        })

        setProductsTotalLength(100)
      } 
    }

    function addToCart(e){
      e.preventDefault()
      // get id from clicked btn
      const productId = e.target.dataset.productid
      addNewItem(cartItems, setCartItems,productId)
    } 


    function resetProductData(e){
      e.preventDefault()          
      searchParams.delete('q')
      // searchParams.delete('category')
      setError({isError: false,message: '', img: null})
      setSearchParams(searchParams);

    }

    function displayProductCards(){
      // if user type at the searchbox
      // set the productsData to all products 
      // if(keywordParams !== null){
      //   getProducts(product.searchProduct(keywordParams))
      //   .catch((error) => {
      //     console.error(error)
      //     Swal.fire({
      //       title: 'Someting went wrong :(',
      //       text: 'Fail to get products data from server, please wait!',
      //       timer: 2500,
      //       timerProgressBar: true,
      //     })
      //    })
      // }

      const cards = productsData.map((item, index, arr) => {
          return (
            <Card 
              key={item.id} 
              to={`/product/${item.id}`} 
              style={`cursor-pointer h-[500px] hover:shadow-2xl shadow-lg transition duration-300 flex flex-col justify-between`} discount={item.discountPercentage}>
              <div>
                <Card.image src={item.thumbnail} alt={item.title} style="h-[250px] object-center"/>
                <Card.body>
                    <p 
                      className="font-semibold mb-1">
                      <span className="text-2xl text-indigo-900 mr-1">
                      ${getDiscountedPrice(item.discountPercentage,item.price)}</span>
                      <span className="line-through text-md text-indigo-300">${item.price}</span>
                    </p>
                    <h4>{item.title}</h4>
                    <h5 className="font-semibold"><i className='text-indigo-900 bx bxs-check-circle'></i>{item.brand}</h5>
                    <span className="mt-1"><i className='bx bxs-star text-yellow-400 text-xl'></i> {item.rating}</span>
                </Card.body>
              </div>
              <Card.footer >
                  <button type="button" onClick={e => addToCart(e)} className="py-2 w-full rounded-md bg-indigo-900 cursor-pointer font-montserrat text-white hover:bg-indigo-700" data-productid={item.id}>
                   <i className="bx bx-cart"></i> Add to cart
                  </button>
              </Card.footer>
            </Card> 
          )
        })

        const isProductFound = productsData.find(item => item.title.toLowerCase().includes(keywordParams?.toLowerCase()) || item.brand.toLowerCase().includes(keywordParams?.toLowerCase())) ?? false


        if(!isProductFound && cards.length <= 0){
          setError({
            isError: true,
            message: `Product '${keywordParams}' is not found, please input keywordParams correctly`,
            img: 'product-not-found.svg'
          })
        }

        return cards
    }

    function numberPageClickHandler(e){
      window.scrollTo(0,0)
      const activePage = e.target.dataset.activepage
      setSearchParams(prev => {
        prev.set('page', activePage)
        return prev
      },{ replace: true})

      setProductsData([])
      setShowData({perPage: 20, currentPage: activePage})

    }

    function nextPageClickHandler(){
      window.scrollTo(0,0)
      const nextPage = Number(currentPageParams) + 1
      setSearchParams(prev => {
        prev.set('page', nextPage)
        return prev
      },{ replace: true})
      setProductsData([])
      setShowData({perPage: 20, currentPage: nextPage})
    }
    function prevPageClickHandler(){
      window.scrollTo(0,0)
      const prevPage = Number(currentPageParams) - 1
      setSearchParams(prev => {
        prev.set('page', prevPage)
        return prev
      },{ replace: true})
      setProductsData([])
      setShowData({perPage: 20, currentPage: prevPage})

    }

    return(
      <>
        <Navbar setErrorState={setError}/>

        <div className="container mx-auto mt-5 z-[1] container mx-auto w-[90%] sm:w-full">
          <div className="flex items-center gap-2 justify-between">
            <h2 
              className="font-semibold font-montserrat capitalize text-indigo-900"
            >
              our {(selectedCategory !== null && selectedCategory !== 'all') 
              ? <span className="font-bold">{selectedCategory.split('-').join(' ') }</span>
              : ''} products
            </h2>

            {(keywordParams !== null)
              ? <button 
                  onClick={(e)=> resetProductData(e)}
                  className="py-1 px-2 text-sm font-montserrat capitalize bg-indigo-50 rounded-md flex items-center">
                  show all products <i className='ml-2 bx bx-refresh'></i>
                </button>
              : null
            }

            <Dropdown 
                text="Select category">
              {categories?.length > 1 &&
                categories?.sort().map((item, i) => {
                  return (
                    <span 
                      key={i} 
                      data-category={item} 
                      className="text-gray-700 block px-4 py-2 text-sm cursor-pointer hover:bg-slate-200 capitalize" 
                      onClick={(e)=> dropdownItemClickHandler(e)}>
                        {item.split('-').join(' ')}
                      </span>
                  )
                })
              }
            </Dropdown>
          </div>
        </div>

        {categoryParams !== null && !isCategoryExist
            ? <p className="text-lg my-5 text-center font-montserrat text-indigo-900">{`Category '${categoryParams}' is not exist, please select the correct category!`}</p> 
            : null
        }

        {!error.isError ?
        <div className="grid min-h-screen container mx-auto w-[90%] sm:w-full mt-8 grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">


            {productsData?.length > 0 
               ? displayProductCards()
               : <Skeleton number="8" style="h-[300px] rounded-md"/>
            }


        </div>

          : <div className="container min-h-screen mx-auto text-center  w-[90%] sm:w-full mt-8">
            {(error.img !== undefined) ? 
              <img width="350px" className="mx-auto object-contain mb-4" src={`/img/${error.img}`} alt="image error"/> 
              : null}
            <p className="text-[20px] font-montserrat text-indigo-900">{error.message}</p>
          </div>
        }

        <Pagination 
          activePage={currentPageParams}
          dataLength={categoryParams === 'all' ? productsTotalLength : productsData.length} 
          numberPageClickHandler={numberPageClickHandler} 
          nextPageClickHandler={nextPageClickHandler} 
          prevPageClickHandler={prevPageClickHandler} />

        <Footer/>


      </>
    )
  }


export async function loader(){
  const products = await product.getAllProducts()
  return {products}
}