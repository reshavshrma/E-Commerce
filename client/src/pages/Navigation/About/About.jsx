import React from "react";
import Navbar from "../../../components/Navbars/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";
import AboutHeader from "../../../components/Navigation/About/AboutHeader";
import AboutSection from "../../../components/Navigation/About/AboutSection";
import WhyChooseUs from "../../../components/Navigation/About/WhyChooseUs";
import Testimonial from "../../../components/Navigation/About/Testimonial";
import CallToAction from "../../../components/Navigation/About/CallToAction";

const About = () => {
  return (
    <>
      {/* Navbar */}
      <div className="bg-gradient-to-r from-slate-600 to-slate-800">
        <Navbar />
      </div>

      {/* About Content */}
      <section className="bg-gradient-to-b from-gray-100 to-gray-50 text-gray-900 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <AboutHeader />

          <AboutSection
            title="Who We Are"
            text="UrbanHaven is a lifestyle-driven hospitality brand that blends comfort, design, and convenience. We are redefining travel stays by offering a handpicked selection of unique accommodations in prime locations — whether you're seeking urban sophistication or countryside charm."
            imageUrl="https://media.istockphoto.com/id/1409386345/photo/hotel-lobby.webp?b=1&s=170667a&w=0&k=20&c=yHqlweSt4z3eI3eSHTPrqj6R3rRnM8BeJovKD0v8Hdk="
          />

          <AboutSection
            title="Our Vision"
            text="To be the go-to platform where travelers find more than a room — they find a personal experience. From seamless booking to unmatched customer service, our aim is to make every stay unforgettable."
            imageUrl="https://media.istockphoto.com/id/1282532707/photo/a-magnificent-hotel-room-in-a-luxury-hotel.webp?b=1&s=170667a&w=0&k=20&c=ZlnEPQyN9n0aGpKjEkOH2XKmJ20g_d-5vwL_Mop9EFQ="
            reverse
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-16">
            <div className="order-2 md:order-1">
              <WhyChooseUs />
            </div>
            <div className="overflow-hidden rounded-2xl shadow-lg order-1 md:order-2">
              <img
                src="https://images.unsplash.com/photo-1576675783365-00f22c5a277e"
                alt="Why Choose Us"
                className="w-full h-80 object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          <Testimonial />
          <CallToAction />
        </div>
      </section>

      <Footer />
    </>
  );
};

export default About;
