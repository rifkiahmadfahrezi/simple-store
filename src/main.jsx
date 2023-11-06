import React from 'react'
import ReactDOM from 'react-dom/client'
import index from './index.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Home from './pages/Home'
import Product, {loader} from './pages/Product'
import ErrorPage from './pages/ErrorPage'



const router = createBrowserRouter([
  {
     path: '/',
     element: <Home/>,
     errorElement: <ErrorPage/>,
     
  },
  {
     path: '/login',
     element: <h1>Login</h1>
  },
  {
     path: '/register',
     element: <h1>Register</h1>
  },
  {
     path: '/product/:productId',
     element: <Product/>,
     loader: loader,
     errorElement: <ErrorPage/>,
  }

])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
)
