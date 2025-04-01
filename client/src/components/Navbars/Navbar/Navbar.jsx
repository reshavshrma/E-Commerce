import React from 'react'
import OfferDetail from './OfferDetail'
import DesktopNavbar from './DesktopNavbar'
import NavImg from './NavImg'
import NavHeader from './NavHeader'
const Navbar = () => {
  return (
    <div>
      <OfferDetail/>

      <div className="flex  items-center  xs:-ml-5 space-x-5">
          <NavImg />
          <NavHeader />

      <DesktopNavbar/>
        </div>
      </div>

  )
}

export default Navbar
