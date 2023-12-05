import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Home from './pages/Home'
import Product, {loader} from './pages/Product'
import LoginPage from './pages/LoginPage'
import ErrorPage from './pages/ErrorPage'
import Transaction from './pages/Transaction'
import TransactionHistory from './pages/transactionHistory'
import ShoppingCartContextProvider from './context/ShoppingCart'



const router = createBrowserRouter([
  {
     path: '/',
     element: <Home/>,
     errorElement: <ErrorPage/>
  },
  {
     path: '/login',
     element: <LoginPage/>
  },
  {
     path: '/product/:productId',
     element: <Product/>,
     loader: loader,
  },
  {
     path: '/transaction/',
     element: <Transaction/>,
  },
  {
     path: '/transaction-history/',
     element: <TransactionHistory/>,
  }

])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ShoppingCartContextProvider>
      <RouterProvider router={router}/>
    </ShoppingCartContextProvider>
  </React.StrictMode>
)
