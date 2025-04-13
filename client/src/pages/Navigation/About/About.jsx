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
      <div className="border-1 border-gray-300">
        <Navbar />
      </div>

      {/* About Content */}
      <section className="bg-gradient-to-b from-gray-100 to-gray-50 text-gray-900 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <AboutHeader />

          <AboutSection
  title="Who We Are"
  text="At The Shopzo, we're building a bridge between offline vendors and the digital world. Our platform empowers local sellers to showcase their products online by category, making it easy for users to discover, explore, and reserve items—while supporting in-person purchases from trusted nearby stores."
  imageUrl="https://media-hosting.imagekit.io/5c298a81f65844e9/couple-fashion.jpg?Expires=1839072431&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=ZkcXNBk~XjicdM-4jwL61JMFD~wn8T02-S51PHlbBR7Wn-zOd1QvzHb5uSyDBuhquS7F1s7zbX1edJ9~hwv-vC2-Gl-OEhBqAmox8JYoMvyqF5~CZ2iiLjFyrWTsdIqgMKnYCqh8dAFm2RfF~I64piCdoIz2ch-ISFxar5BogBW3QeYqE~nJJadIHqBze1CAdjwQncvKul0dddGjXYbmuoUksCNQ9dZ3hkzQm8mqjRz3SLyQMtljTSBLPplABJ02qDf2IlAIfp3rWTkc-0vvh9DnvRczosaMIfgHLwNDrLaerVGYLdreFAcrAobAVBJCQHH6cPvwEPKTwf8cUaFmpg__"
/>

<AboutSection
  title="Our Mission"
  text="Our mission is to bring visibility to authentic, offline businesses and create a seamless browsing experience for customers. We envision a world where technology uplifts traditional commerce, making local shopping efficient, personalized, and community-driven."
  imageUrl="https://media-hosting.imagekit.io/c7e9f3ed1e764bae/three-girl.jpg?Expires=1839072374&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=p-LVAWvhbDSHI85ZOUp-3fbigJzA~3n8LFjgJjj4gISa4zCz69z6a~Y9cx7LNZghcvBrS~OsWAkiGxXgrSBGvR2JySbAxRZOnTMZo5KuI1A9~v52Ws76S~Px~aqjUAIKkKD9ht65TgcOVxgx9uX3hZzAqiCusHmTsD-7XB~bQ5yKPLKUstJToihK4O1KfAEGfuCdYbLxXBLjMqaya9IjlNBhi6IgoW2441EYGhSH~Qe8-dux-GIergxKaJVzrovKAB3V7VeRgYSatAI3fuVRQyn4-1vzdU4B0hpDeqwD4Jv9Qaj9CLp~47QfquYd1QYOIU1eFTCalpHVEIy4G~mxBg__"
  reverse
/>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-16">
            <div className="order-2 md:order-1">
              <WhyChooseUs />
            </div>
            <div className="overflow-hidden rounded-2xl shadow-lg order-1 md:order-2">
              <img
                src="https://media-hosting.imagekit.io/473c5d2e48a347cc/girl-croptop.jpg?Expires=1839072636&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=xhKaTq56Ays7DD0dV~hh-hbtTzXXIVKPDw2FJ-b03cenIjMWujEWwVCCRUt3vBhmSGknY1T468ifzH7i3qXXX4JEeiXwQzkHqJSF~M8rWh-6e6295eT~PjObKL3pHdZFm3HK6HPW9WMs5a7fCAPA0LY0OeYl0NiLjkJ5l8ng9zKNuQy3zZo4pkLPitAxX9s2X-bNnrjDFr7px0BvlovJRYHnO9TLzrHLju1Psfs0pqun8IzdcOfPYLCvLUu3RN~H-5J3tjl6xaSaha5TxE4XlH~YBlx9MNepp4S7S6ntLxQH95PYw84Jt8lupsnvEuZ5sTJiUmbFPSVN00SOUZjGKQ__"
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
