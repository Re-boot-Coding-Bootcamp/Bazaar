"use client";

import { Carousel, ProductCard } from "./_components";

export default function HomePage() {
  return (
    <>
      <Carousel
        data={[
          {
            image:
              "https://murad-public-files.s3.amazonaws.com/bazaar/bg-2.png",
            overlayText: (
              <>
                <p className="w-96">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptas doloribus quidem ratione aperiam at officiis dolorem,
                  aut veniam sequi.
                </p>
              </>
            ),
            overlayPosition: "left-top",
          },
          {
            image:
              "https://murad-public-files.s3.amazonaws.com/bazaar/bg-3.png",
            overlayText: (
              <>
                <p className="w-96">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptas doloribus quidem ratione aperiam at officiis dolorem,
                  aut veniam sequi.
                </p>
              </>
            ),
            overlayPosition: "right-top",
          },
          {
            image:
              "https://murad-public-files.s3.amazonaws.com/bazaar/bg-4.png",
            overlayText: (
              <>
                <p className="w-96">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptas doloribus quidem ratione aperiam at officiis dolorem,
                  aut veniam sequi.
                </p>
              </>
            ),
            overlayPosition: "left-bottom",
          },
          {
            image:
              "https://murad-public-files.s3.amazonaws.com/bazaar/bg-5.png",
            overlayText: (
              <>
                <p className="w-96">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptas doloribus quidem ratione aperiam at officiis dolorem,
                  aut veniam sequi.
                </p>
              </>
            ),
            overlayPosition: "right-bottom",
          },
          {
            image:
              "https://murad-public-files.s3.amazonaws.com/bazaar/bg-1.png",
            overlayText: (
              <>
                <p className="w-96 md:w-full">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptas doloribus quidem ratione aperiam at officiis dolorem,
                  aut veniam sequi.
                </p>
              </>
            ),
            overlayPosition: "center",
          },
        ]}
      />
      <div
        id="top-sellers-container"
        className="my-8 flex w-full flex-col items-center gap-4 px-4"
      >
        <div className="flex w-full max-w-screen-xl justify-center md:justify-start">
          <h1 className="text-3xl font-bold">Top Sellers</h1>
        </div>

        <div
          id="top-sellers"
          className="grid max-w-screen-xl grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          {[
            "https://murad-public-files.s3.amazonaws.com/bazaar/product-images/1-white-hat.png",
            "https://murad-public-files.s3.amazonaws.com/bazaar/product-images/7-simple-t-shirt-blue.png",
            "https://murad-public-files.s3.amazonaws.com/bazaar/product-images/9-pen.png",
            "https://murad-public-files.s3.amazonaws.com/bazaar/product-images/20-hoodie-green.png",
          ].map((imageUrl, index) => (
            <ProductCard
              key={`top-seller-${index + 1}`}
              imageUrl={imageUrl}
              productName={`Product ${index + 1}`}
              price={24.99}
            />
          ))}
        </div>
      </div>
    </>
  );
}
