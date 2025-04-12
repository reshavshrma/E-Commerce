import React from 'react'
import { useUser } from '../../UserContext/UserContext';
const WelcomeMsg = () => {
    const {user} = useUser();
  return (
   <>
   <h1 className="text-base mt-10 sm:text-2xl p-2   sm:hidden lg:block lg:mt-10 xl:hidden text-center text-gray-800 font-semibold ">
   <p >Welcome <span className='text-yellow-700 capitalize'>{user ? user.name : null}</span> to The Shopzo ! </p>
 </h1>
   </>
  )
}

export default WelcomeMsg
