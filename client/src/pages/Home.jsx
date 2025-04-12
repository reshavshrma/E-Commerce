import React from 'react'
import Navbar from '../components/Navbars/Navbar/Navbar';
import WelcomeMsg from '../components/Home/WelcomeMsg/WelcomeMsg';
import SlideShow from '../components/Home/SlideShow/SlideShow';
import Footer from '../components/Footer/Footer';
import AllCategories from '../components/Category/AllCategory/AllCategory';
import Counter from '../components/Home/Counter/Counter';
import { FaHotel } from 'react-icons/fa';
import ScrollComponent from '../components/Home/ScrollComponent/ScrollComponent';
import AllVendors from './Vendor/AllVendors';
const Home = () => {
  return (
    <div >
    <div className='-mb-2'>
      <Navbar/>
    </div>
    <div className="bg-[url('/assets/header-img.png')] bg-cover h-72 bg-no-repeat  md:h-[40rem]">
    </div>
      <div className='my-20'>
        <WelcomeMsg/>
      </div>
      <div className='my-20'>
        <SlideShow/>
      </div>
      <div className='my-20'>
        <AllCategories/>
      </div>
      <div className='my-20'>
    <Counter start={0} end={300} duration={2000} value="Hotels Listed" color="red" icon={<FaHotel className="text-red-500 text-2xl md:text-3xl lg:text-5xl" />}/>
      </div>
      <div className='my-20'>
        <ScrollComponent/>
      </div>
      <div className='my-20'>
        <AllVendors/>
      </div>
      <div className='mt-20'>
        <Footer/>
      </div>
    </div>
  )
}

export default Home;
