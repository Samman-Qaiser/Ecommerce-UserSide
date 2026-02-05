import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import ProductPage from './Pages/ProductPage'
import CategoryPage from './Pages/CategoryPage'
import ThankYou from './Pages/ThankYou'
import Orders from './Pages/Orders'
import CheckoutPage from './Pages/Checkout'
import ContactUsPage from './Pages/ContactUsPage'
import AllCategories from './Pages/AllCategories'
import Whislist from './Pages/Whislist'
import AboutPage from './Pages/AboutUs'
import Login from './Auth/Login'
import AuthPage from './Auth/Login'

const Approutes = () => {
  return (
<Routes>
  <Route path='' element={<Home />}/>
    <Route path='/product/:id' element={<ProductPage />}/>
    <Route path='/allcategories' element={<AllCategories/>}/>
    <Route path="/category/:slug" element={<CategoryPage />} />
    <Route path='thankyou' element={<ThankYou />}/>
    <Route path='/orders' element={<Orders />}/>
    <Route path='/checkout' element={<CheckoutPage />}/>
    <Route path='/contactus' element={<ContactUsPage />}/>
    <Route path='/whishlist' element={<Whislist />}/>
    <Route path='aboutus' element={<AboutPage />}/>
    <Route path='/login' element={<AuthPage />}/>
</Routes>
  )
}

export default Approutes