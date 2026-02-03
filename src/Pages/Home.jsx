import React from 'react'
import HeroSlider from '../components/Home/HeroSlider'
import CategoriesSection from '../components/Home/CategoriesSection'
import BestSellerSection from '../components/Home/BestSellerSection'
import FeaturedCollection from '../components/Home/FeaturedCollection'
import TabbedProducts from '../components/Home/TabedProducts'
import SingleExplore from '../components/Home/SingleExplore'
import ImageTextSection from '../components/Home/ImageTextSection'

const Home = () => {
  return (
    <div>
         <HeroSlider />
         <CategoriesSection />
         <BestSellerSection />
         <FeaturedCollection />
         <SingleExplore />
     
         <TabbedProducts />
         <ImageTextSection />
         
    </div>
  )
}

export default Home