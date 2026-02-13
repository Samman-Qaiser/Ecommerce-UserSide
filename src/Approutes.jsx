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
import PrivacyPolicy from './Pages/PrivacyPolicy'
import TermsCondition from './Pages/TermsCondition'
import ReturnPolicy from './Pages/ReturnPolicy'
import ShippingPolicy from './Pages/ShippingPolicy'

const Approutes = () => {
  return (
<Routes>
  <Route path='' element={<Home />}/>
    <Route path='/product/:id' element={<ProductPage />}/>
    <Route path='/allcategories' element={<AllCategories/>}/>
    <Route path="/category/:slug" element={<CategoryPage />} />
<Route path='/order-confirmation/:orderNumber' element={<ThankYou />}/>
    <Route path='/orders' element={<Orders />}/>
    <Route path='/checkout' element={<CheckoutPage />}/>
    <Route path='/contactus' element={<ContactUsPage />}/>
    <Route path='/wishlist' element={<Whislist />}/>
    <Route path='aboutus' element={<AboutPage />}/>
    <Route path='/login' element={<AuthPage />}/>
    <Route path='/privacypolicy' element={<PrivacyPolicy />}/>
    <Route path='/termscondition' element={<TermsCondition />}/>
    <Route path='/returnpolicy' element={<ReturnPolicy />}/>
    <Route path='/shippingpolicy' element={<ShippingPolicy />}/>
</Routes>
  )
}

export default Approutes