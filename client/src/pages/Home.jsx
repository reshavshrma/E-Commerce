import React from 'react'
import Navbar from '../components/Navbars/Navbar/Navbar';
import WelcomeMsg from '../components/Home/WelcomeMsg/WelcomeMsg';
import SlideShow from '../components/Home/SlideShow/SlideShow';
import SearchBox from '../components/Home/SearchBox/SearchBox';
import Categories from '../components/Home/Categories/Categories';
import ProductList from '../components/Products/ProductList.jsx/ProductList';
import VendorList from '../components/Vendors/VendorList.jsx/VendorList';
import FAQs from '../components/FAQs/FAQs';
import Counter from '../components/Home/Counter/Counter';
import Footer from '../components/Footer/Footer';
const Home = () => {
  return (
    <div>
      <Navbar/>
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
        <Categories/>
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
