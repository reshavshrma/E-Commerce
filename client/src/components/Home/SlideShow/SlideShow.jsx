import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const images = [
  "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pexels.com%2Fsearch%2Ffashion%2520model%2F&psig=AOvVaw37XHG2M0CbMSNLQxImFYw5&ust=1743422660946000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCLC7xtbhsYwDFQAAAAAdAAAAABAV",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUmmMweE8cLsxNrudvU8tCjIHalMANqevI8A&s",
  "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pexels.com%2Fsearch%2Ffashion%2520model%2F&psig=AOvVaw37XHG2M0CbMSNLQxImFYw5&ust=1743422660946000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCLC7xtbhsYwDFQAAAAAdAAAAABAV",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUmmMweE8cLsxNrudvU8tCjIHalMANqevI8A&s",
  "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.123rf.com%2Fphoto_44976668_fashion-model-girl-isolated-over-white-background-beauty-stylish-blonde-woman-posing-in-fashionable.html&psig=AOvVaw37XHG2M0CbMSNLQxImFYw5&ust=1743422660946000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCLC7xtbhsYwDFQAAAAAdAAAAABAl",

];

const Slideshow = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000); // Auto slide every 3 seconds

    return () => clearInterval(interval);
  }, [currentIndex]);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto overflow-hidden rounded-2xl shadow-lg">
      <div className="relative w-full h-[350px] md:h-[500px]">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index + 1}`}
            className={`absolute w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-900 bg-opacity-50 p-3 rounded-full text-white hover:bg-opacity-75 transition"
      >
        <FaArrowLeft size={24} />
      </button>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-900 bg-opacity-50 p-3 rounded-full text-white hover:bg-opacity-75 transition"
      >
        <FaArrowRight size={24} />
      </button>

      {/* Indicator Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition ${
              index === currentIndex ? "bg-white" : "bg-gray-400"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Slideshow;
