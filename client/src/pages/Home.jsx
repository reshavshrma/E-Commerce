import React from 'react'
import Navbar from '../components/Navbars/Navbar/Navbar';
import WelcomeMsg from '../components/Home/WelcomeMsg/WelcomeMsg';
import SlideShow from '../components/Home/SlideShow/SlideShow';
import SearchBox from '../components/Home/SearchBox/SearchBox';
import ProductList from '../components/Products/ProductList.jsx/ProductList';
import VendorList from '../components/Vendors/VendorList.jsx/VendorList';
import FAQs from '../components/FAQs/FAQs';
import Counter from '../components/Home/Counter/Counter';
import Footer from '../components/Footer/Footer';
import AllCategories from '../components/Category/AllCategory/AllCategory';
const Home = () => {
  return (
    <div >
    <div className="bg-[url('/assets/header-img.png')] bg-cover h-72 bg-no-repeat sm:bg-cover md:h-[40rem]">
      <Navbar/>
    </div>
      <div className='my-20'>
        <WelcomeMsg/>
      </div>
      <div className='my-20'>
        <SlideShow/>
      </div>
      <div className='my-20'>
        <SearchBox/>
      </div>
      <div className='my-20'>
        <AllCategories/>
      </div>
      <div className='my-20'>
        <ProductList/>
      </div>
      <div className='my-20'>
        <VendorList/>
      </div>
      <div className='my-20'>
        <FAQs/>
      </div>
      <div className='my-20'>
        <Counter/>
      </div>
      <div className='my-20'>
        <Footer/>
      </div>
    </div>
  )
}

export default Home;
