import React from 'react'
import Navbar from '../components/Navbars/Navbar/Navbar';
import WelcomeMsg from '../components/Home/WelcomeMsg/WelcomeMsg';
import SlideShow from '../components/Home/SlideShow/SlideShow';
import SearchBox from '../components/Home/SearchBox/SearchBox';
import Footer from '../components/Footer/Footer';
import AllCategories from '../components/Category/AllCategory/AllCategory';
import Counter from '../components/Home/Counter/Counter';
import { FaUsers, FaStore, FaTags, FaBoxOpen, FaClipboardList } from "react-icons/fa";
import ScrollComponent from '../components/Home/ScrollComponent/ScrollComponent';
import AllVendors from './Vendor/AllVendors';
import FAQs from '../components/FAQs/FAQs';
const Home = () => {
  return (
    <div >
    <div className='-mb-2'>
      <Navbar/>
    </div>
    <div className="bg-[url('/assets/header-img.png')] bg-cover h-72 bg-no-repeat sm:h-[30rem]  md:h-[40rem] lg:h-[48rem]">
    </div>
      <div className='my-20'>
        <WelcomeMsg/>
      </div>
      
      <div>
        <SearchBox/>
      </div>
      <div className='my-20'>
        <AllCategories/>
      </div>
      <div className='my-20'>
        <SlideShow/>
      </div>
      <div className='my-20  flex flex-col flex-wrap justify-evenly items-center sm:flex-row gap-6 sm:gap-3 py-10 px-5 sm:px-5'>
    <Counter start={0} end={300} duration={2000} value="Users Registered" color="blue" icon={<FaUsers className="text-blue-500 text-2xl md:text-3xl lg:text-5xl" />}/>
    <Counter start={0} end={100} duration={2000} value="Vendors Listed" color="red" icon={<FaStore className="text-red-500 text-2xl md:text-3xl lg:text-5xl" />}/>
    <Counter start={0} end={50} duration={2000} value="Categories Available" color="teal" icon={<FaTags className="text-teal-500 text-2xl md:text-3xl lg:text-5xl" />}/>
    <Counter start={0} end={600} duration={2000} value="Products Available" color="orange" icon={<FaBoxOpen className="text-orange-500 text-2xl md:text-3xl lg:text-5xl" />}/>
    <Counter start={0} end={100} duration={2000} value="Booking Accomplished" color="green" icon={<FaClipboardList className="text-green-500 text-2xl md:text-3xl lg:text-5xl" />}/>
      </div>
      <div className='my-20'>
        <ScrollComponent/>
      </div>
      <div className='my-20'>
        <FAQs/>
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
