import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const images = [
  "https://media-hosting.imagekit.io/c7e9f3ed1e764bae/three-girl.jpg?Expires=1839072374&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=p-LVAWvhbDSHI85ZOUp-3fbigJzA~3n8LFjgJjj4gISa4zCz69z6a~Y9cx7LNZghcvBrS~OsWAkiGxXgrSBGvR2JySbAxRZOnTMZo5KuI1A9~v52Ws76S~Px~aqjUAIKkKD9ht65TgcOVxgx9uX3hZzAqiCusHmTsD-7XB~bQ5yKPLKUstJToihK4O1KfAEGfuCdYbLxXBLjMqaya9IjlNBhi6IgoW2441EYGhSH~Qe8-dux-GIergxKaJVzrovKAB3V7VeRgYSatAI3fuVRQyn4-1vzdU4B0hpDeqwD4Jv9Qaj9CLp~47QfquYd1QYOIU1eFTCalpHVEIy4G~mxBg__",

  "https://media-hosting.imagekit.io/5c298a81f65844e9/couple-fashion.jpg?Expires=1839072431&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=ZkcXNBk~XjicdM-4jwL61JMFD~wn8T02-S51PHlbBR7Wn-zOd1QvzHb5uSyDBuhquS7F1s7zbX1edJ9~hwv-vC2-Gl-OEhBqAmox8JYoMvyqF5~CZ2iiLjFyrWTsdIqgMKnYCqh8dAFm2RfF~I64piCdoIz2ch-ISFxar5BogBW3QeYqE~nJJadIHqBze1CAdjwQncvKul0dddGjXYbmuoUksCNQ9dZ3hkzQm8mqjRz3SLyQMtljTSBLPplABJ02qDf2IlAIfp3rWTkc-0vvh9DnvRczosaMIfgHLwNDrLaerVGYLdreFAcrAobAVBJCQHH6cPvwEPKTwf8cUaFmpg__",

  "https://media-hosting.imagekit.io/f26a4b7130e748cf/men-design.jpg?Expires=1839072505&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=V8SlkiVdkqmd78aQwYR2qsT2ygHxxwCAdhl3MEdoktTMHxlO1IAS3wmM6iuAwlQgTJCjFnkLzwKHbhUfEy4D-y7E-Zxe3bzvyulwOjqpFNNgGr0Mh6qTPcELPGR1WIcsH~Y1EjjmxFSCYrOe1NnEg6WtOASZ--BECgjDL1NkCoe9utrekC~ACjzn0LkVnGtaakqAUMRJzuazr~jnUjFFUiGQPtgkfrK0y2OwgsvVXYkxM7wIkoWjYmRHdjF0AEy29MnS0n4s7e9TQ6xIjbs9S7ZBEU7BzusMddHti4DbE-HICroprnWwO8-PvMuoLRSGVJzCdErMXTBnSYLZrj6tLQ__",
 
  "https://media-hosting.imagekit.io/473c5d2e48a347cc/girl-croptop.jpg?Expires=1839072636&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=xhKaTq56Ays7DD0dV~hh-hbtTzXXIVKPDw2FJ-b03cenIjMWujEWwVCCRUt3vBhmSGknY1T468ifzH7i3qXXX4JEeiXwQzkHqJSF~M8rWh-6e6295eT~PjObKL3pHdZFm3HK6HPW9WMs5a7fCAPA0LY0OeYl0NiLjkJ5l8ng9zKNuQy3zZo4pkLPitAxX9s2X-bNnrjDFr7px0BvlovJRYHnO9TLzrHLju1Psfs0pqun8IzdcOfPYLCvLUu3RN~H-5J3tjl6xaSaha5TxE4XlH~YBlx9MNepp4S7S6ntLxQH95PYw84Jt8lupsnvEuZ5sTJiUmbFPSVN00SOUZjGKQ__" ,

  "https://media-hosting.imagekit.io/65a46fba7354450f/men-blazer.jpg?Expires=1839072596&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=I0Eh46HRFA7OQ2Tz40IP~JiBfn8LBbQ70qR4bWEJaqlhWjdUbUeJuAqlid38nFxipLv4PuA1o2anvuhlviBX4eh203gZmHzTihOL0PigS8TOUkFFGtp1wNn0AGNvE9IzV1MVKcimR~DsRwmThPjH6En1DjR2b4d4u204UyxAc-zoyoZs5arAKcvrm54T0044cNBBHSb~ZMidO3Nq4Yj7oiKDlVe72lyc1ULmV6N5tOfYzEaJthFErrMBcocz0rb-7XNSBAAXIJj~~vLs6tiLiG8n6NFe-Mcn5YknCxj~sprrgyBy398t~bCOBwNsjjbChKEfQUfJSbV0-QkFqkokFw__",

  "https://media-hosting.imagekit.io/5369443734ce4972/men-blue-shirt.jpg?Expires=1839072613&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=wfW58rGKdNli0ZXHjr8U1aP1oW-6v0T8xTP-9Kpxqo1OV5SMOzdXpYUhp~absYdP1~U1DipLwInKr8YK68zS~tJkF65QM9k9ul32jT8fYzpMeIVWVxd1FRMQ5s8filLTbiuDYWfyS6E1i2X0d2VZmiPAszE7KOqMyo~i~v4kgFpaNKCasQ285DlJIUGYTMvke4SwqbQiqOI1Fa8Z9-UMuXC5OcD0OZIixQd0wz4cA66CPiJFBN-ujpJucaLqjiQz-ig7ZfAn2u05CyvuF8aWIqkXPZwtMXvwqAgfgc-0zlSTlIH-oUTNoRGqXExVleyU3p9M0Zg6J5usBN8KUAqXDw__"

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
    <div className="relative w-full max-w-6xl mx-auto overflow-hidden rounded-2xl shadow-lg">
      <div className="relative w-full h-80 sm:h-[400px] md:h-[550px] lg:h-[650px]">
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
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-600 bg-opacity-50 p-1 rounded-full text-white hover:bg-opacity-75 transition"
      >
        <FaArrowLeft size={16} />
      </button>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-600 bg-opacity-50 p-1 rounded-full text-white hover:bg-opacity-75 transition"
      >
        <FaArrowRight size={16} />
      </button>

      {/* Indicator Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-1 h-1 rounded-full transition ${
              index === currentIndex ? "bg-white" : "bg-gray-700"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Slideshow;
