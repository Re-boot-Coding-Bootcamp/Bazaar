import { api } from "~/trpc/server";
import { Carousel, ProductCard } from "./_components";

export default async function HomePage() {
  const topSellers = await api.product.getTopSellers();

  return (
    <>
      <Carousel
        data={[
          {
            image:
              "https://murad-public-files.s3.amazonaws.com/bazaar/bg-2.png",
            overlayText: (
              <>
                <p className="w-96 text-base md:text-2xl">
                  Summer Collection - Get Ready for the Heat - Up to 40% Off
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
                <p className="w-96 text-base md:text-2xl">
                  {`Don\'t Miss Out - Limited Stock Available - Shop Now and Save
                  30%!`}
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
                <p className="w-96 text-base md:text-2xl">
                  Back in Stock - Your Favorite Styles Are Back - Shop Now and
                  Save!
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
                <p className="w-96 text-base md:text-2xl">
                  New Markdowns - Save Up to 50% on Select Styles!.
                </p>
              </>
            ),
            overlayPosition: "right-bottom",
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
          className="grid max-w-screen-xl grid-cols-1 items-stretch justify-stretch gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          {topSellers.map((item) => (
            <ProductCard
              key={`top-seller-card-${item.id}`}
              imageUrl={item.images[0]?.url}
              productName={item.product.name}
              price={item.price}
              productUrl={`/product/${item.id}`}
            />
          ))}
        </div>
      </div>
    </>
  );
}
