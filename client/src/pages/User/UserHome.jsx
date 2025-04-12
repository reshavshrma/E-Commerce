import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../../components/Navbars/Navbar/Navbar'


const UserHome = () => {
  return (
    <div>
    <Navbar/>
      <div className="w-full mt-10" data-aos="fade-up">
                <Outlet />
              </div>
    </div>
  )
}

export default UserHome
