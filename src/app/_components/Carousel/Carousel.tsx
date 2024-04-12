"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
// import Image from "next/image";
import React, { useEffect, useState } from "react";

interface CarouselProps {
  images: string[];
  autoSlideInterval?: number;
  height?: string;
}

const Carousel = ({
  images,
  autoSlideInterval = 5,
  height = "500px",
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

    const interval = setInterval(nextSlide, autoSlideInterval * 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, isPaused, autoSlideInterval]);

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  return (
    <div
      className="relative w-full overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {images.map((image, position) => (
          <div
            key={position}
            className="relative flex w-full flex-shrink-0 items-center justify-center"
            style={{ height: height }}
          >
            <img
              src={image}
              alt={`Slide ${index}`}
              className="object-cover object-center"
              // fill={true}
            />
          </div>
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="transform-translate-y-1/2 absolute left-5 top-1/2 cursor-pointer rounded-md bg-white p-2"
      >
        <ChevronLeftIcon className="h-5 w-5" />
      </button>

      <button
        onClick={nextSlide}
        className="transform-translate-y-1/2 absolute right-5 top-1/2 cursor-pointer rounded-md bg-white p-2"
      >
        <ChevronRightIcon className="h-5 w-5" />
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
