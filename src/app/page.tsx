"use client";

import { Carousel } from "./_components";

export default function HomePage() {
  return (
    <>
      <Carousel
        height="80vh"
        images={[
          "https://www.stuttcars.com/wp-content/uploads/2020/07/2019-Porsche-911-GT3-RS-003-1600.jpeg",
          "https://s3-prod.autonews.com/s3fs-public/MCLAREN-MAIN_i_9.jpg",
          "https://images2.alphacoders.com/103/1038563.jpg",
          "https://www.supercars.net/blog/wp-content/uploads/2023/02/2015-Lamborghini-Veneno-Roadster844812_-scaled.jpg",
        ]}
      />
    </>
  );
}
