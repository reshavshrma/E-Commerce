import React from 'react'
import DesktopNavbar from './DesktopNavbar'
import NavImg from './NavImg'
import MobileNavbar from './MobileNavbar'
const Navbar = () => {
  return (
    <div>

      <div className=" flex justify-center items-center px-6 2xl:justify-between  lg:px-8">
        <div className="flex  items-center  xs:-ml-5 space-x-5">
          <NavImg />
        </div>

        <DesktopNavbar />

        <MobileNavbar />
      </div>
        </div>
  )
}

export default Navbar
