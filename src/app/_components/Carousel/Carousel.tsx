import React, { useEffect, useState } from "react";

interface ImageData {
  name: string;
  url: string;
}

interface CarouselProps {
  images: ImageData[];
  autoSlideInterval?: number;
}

const Carousel = ({
  images,
  autoSlideInterval = 5000,
}: CarouselProps): JSX.Element => {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    if (isPaused) {
      return;
    }

    const interval = setInterval(nextSlide, autoSlideInterval);
    return () => clearInterval(interval);
  }, [index, isPaused, autoSlideInterval]);

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  return (
    <div
      className="relative max-w-screen-lg overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {images.map((image, position) => (
          <div key={position} className="relative w-full flex-shrink-0">
            <img src={image.url} alt={image.name} />
          </div>
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="transform-translate-y-1/2 absolute left-5 top-1/2 cursor-pointer rounded-md bg-white p-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5 8.25 12l7.5-7.5"
          />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="transform-translate-y-1/2 absolute right-5 top-1/2 cursor-pointer rounded-md bg-white p-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m8.25 4.5 7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>
      <div className="absolute bottom-0 left-1/2 flex -translate-x-1/2 transform cursor-pointer space-x-2 pb-2">
        {images.map((image, position) => (
          <span
            key={position}
            className={`block h-2 w-2 rounded-full ${position === index ? `bg-blue-500` : "bg-white"} cursor-pointer`}
            onClick={() => setIndex(position)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export { Carousel };
