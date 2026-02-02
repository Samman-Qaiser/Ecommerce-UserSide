import React from 'react'
import HeroSlider from '../components/Home/HeroSlider'
import CategoriesSection from '../components/Home/CategoriesSection'
import BestSellerSection from '../components/Home/BestSellerSection'
import FeaturedCollection from '../components/Home/FeaturedCollection'
import TabbedProducts from '../components/Home/TabedProducts'

const Home = () => {
  return (
    <div>
         <HeroSlider />
         <CategoriesSection />
         <BestSellerSection />
         <FeaturedCollection />
         <TabbedProducts />
         
    </div>
  )
}

export default Home