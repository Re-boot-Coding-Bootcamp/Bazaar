"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import React, { type ReactNode, useEffect, useState } from "react";

interface CarouselData {
  image: string;
  overlayText: ReactNode;
  overlayPosition:
    | "left-top"
    | "left-bottom"
    | "right-top"
    | "right-bottom"
    | "center-top"
    | "center-bottom"
    | "center";
}

interface CarouselProps {
  data: CarouselData[];
  autoSlideInterval?: number;
}

const Carousel = ({
  data,
  autoSlideInterval = 5,
}: CarouselProps): JSX.Element => {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % data.length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + data.length) % data.length);
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
        id="text-overlay-container"
        className={`absolute inset-0 z-10 flex w-full items-end justify-center bg-black bg-opacity-40 ${data[index]?.overlayPosition.endsWith("top") ? "md:items-start" : data[index]?.overlayPosition.endsWith("bottom") ? "md:items-end" : "items-center"}`}
      >
        {" "}
        <div
          id="text-content-container"
          className={`flex w-full max-w-screen-xl justify-center ${data[index]?.overlayPosition.startsWith("left") ? "md:justify-start" : data[index]?.overlayPosition.startsWith("right") ? "md:justify-end" : "justify-center"}`}
        >
          {" "}
          <div className="my-8 w-fit rounded-xl bg-black bg-opacity-60 p-4 text-3xl text-white">
            {" "}
            {data[index]?.overlayText}{" "}
          </div>{" "}
        </div>{" "}
      </div>

      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {data.map((item, position) => (
          <div
            key={position}
            className={`relative flex h-[450px] w-full flex-shrink-0 items-center justify-center md:h-[800px]`}
          >
            <Image
              src={item.image}
              alt={`Slide ${index}`}
              className="aspect-square object-cover object-center"
              fill={true}
            />
          </div>
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="transform-translate-y-1/2 absolute left-5 top-1/2 z-20 cursor-pointer rounded-md bg-white p-2"
      >
        <ChevronLeftIcon className="h-5 w-5" />
      </button>

      <button
        onClick={nextSlide}
        className="transform-translate-y-1/2 absolute right-5 top-1/2 z-20 cursor-pointer rounded-md bg-white p-2"
      >
        <ChevronRightIcon className="h-5 w-5" />
      </button>
      <div className="absolute bottom-0 left-1/2 z-20 flex -translate-x-1/2 transform cursor-pointer space-x-2 pb-2">
        {data.map((_, position) => (
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
