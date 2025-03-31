import React from 'react'
import VendorCard from '../VendorCard.jsx/VendorCard'

const VendorList = () => {
  return (
    <div className='bg-pink-500'>
      <h1 className='text-center text-white'> Our Top Vendors</h1>
      <VendorCard/>
    </div>
  )
}

export default VendorList
