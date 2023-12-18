import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Home from './pages/home'
import Product, {loader} from './pages/product'
import LoginPage from './pages/loginPage'
import ErrorPage from './pages/errorPage'
import Transaction from './pages/transaction'
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
