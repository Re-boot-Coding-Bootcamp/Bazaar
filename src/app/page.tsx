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
            "https://static.nike.com/a/images/f_auto,cs_srgb/w_1536,c_limit/g1ljiszo4qhthfpluzbt/nike-joyride.jpg",
            "https://www.rollingstone.com/wp-content/uploads/2020/09/Screen-Shot-2020-09-12-at-3.20.08-PM-e1599938476848.png",
            "https://reviewed-com-res.cloudinary.com/image/fetch/s--iL3VTYYE--/b_white,c_fill,cs_srgb,f_auto,fl_progressive.strip_profile,g_auto,h_729,q_auto,w_972/https://reviewed-production.s3.amazonaws.com/1686778972972/nike-sneakers-hero.jpg",
            "https://cloudfront-us-east-1.images.arcpublishing.com/coindesk/XUM5G4JKNBCLRAB262V7UZ5T7A.jpg",
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
