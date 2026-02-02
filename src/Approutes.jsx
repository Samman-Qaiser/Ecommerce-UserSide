import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import ProductPage from './Pages/ProductPage'
import CategoryPage from './Pages/CategoryPage'
import ThankYou from './Pages/ThankYou'
import Orders from './Pages/Orders'
import CheckoutPage from './Pages/Checkout'
import ContactUsPage from './Pages/ContactUsPage'

const Approutes = () => {
  return (
<Routes>
  <Route path='' element={<Home />}/>
    <Route path='/product/:id' element={<ProductPage />}/>
    <Route path='/category' element={<CategoryPage />}/>
    <Route path='thankyou' element={<ThankYou />}/>
    <Route path='/orders' element={<Orders />}/>
    <Route path='/checkout' element={<CheckoutPage />}/>
    <Route path='/contactus' element={<ContactUsPage />}/>
</Routes>
  )
}

export default Approutes