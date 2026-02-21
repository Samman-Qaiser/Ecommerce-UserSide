import React from 'react'
import ProductCard from './ProductCard'

const RelatedProducts = () => {
  return (
    <div className='p-4 border border-t'>
    <h1 className='text-[27px] text-center tracking-[4.8px]'>You May Also Like</h1>
    <div className='grid gap-4 grid-cols-4 sm:grid-cols-2 xs:grid-cols-2'>
        {/* <ProductCard /> */}
    </div>
    </div>
  )
}

export default RelatedProducts