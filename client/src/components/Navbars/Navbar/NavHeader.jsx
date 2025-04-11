import React from 'react'
import { useUser } from "../../UserContext/UserContext";
const NavHeader = () => {
  const { user } = useUser();
  return (
    <div>
      <h1 className="hidden xs:block xs:text-xs sm:text-lg sm:block lg:hidden xl:block text-black font-semibold truncate">
            <p >Welcome <span className='text-yellow-700 capitalize'>{user ? user.name : null}</span> to The Shopzo ! </p>
          </h1>
    </div>
  )
}

export default NavHeader
