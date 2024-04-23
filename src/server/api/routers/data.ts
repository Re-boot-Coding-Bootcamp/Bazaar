import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

// const colors = ["Black", "White", "Gray", "Blue"];
// const sizes = ["XS", "S", "M", "L", "XL", "2XL", "3XL"];
// const colorAndImageUrl: Record<string, string> = {
//   Black:
//     "https://murad-public-files.s3.amazonaws.com/bazaar/product-images/4-simple-t-shirt-black.png",
//   White:
//     "https://murad-public-files.s3.amazonaws.com/bazaar/product-images/5-simple-t-shirt-white.png",
//   Gray: "https://murad-public-files.s3.amazonaws.com/bazaar/product-images/6-simple-t-shirt-gray.png",
//   Blue: "https://murad-public-files.s3.amazonaws.com/bazaar/product-images/7-simple-t-shirt-blue.png",
// };

export const dataRouter = createTRPCRouter({
  creator: publicProcedure.query(async ({ ctx }) => {
    // 1, create productVariants for each color and size
    // productId: clvblrnru0008m8nus9mah2w6
    // price: 32.99
    // stock: 99
    // const variantData = colors.flatMap((color) => {
    //   return sizes.map((size) => {
    //     return {
    //       productId: "clvblrnru0008m8nus9mah2w6",
    //       price: 32.99,
    //       stock: 99,
    //       color,
    //       size,
    //     };
    //   });
    // });
    // return ctx.db.productVariant.createMany({
    //   data: variantData,
    // });
    // ----------------------------------------
    // 2, create image for each productVariant
    // fetch for all the productVariants, with the productId of "clvblrnru0008m8nus9mah2w6"
    // loop through the productVariants and create an image for each
    // use the colorAndImageUrl mapping to get the image url
    // const tShirtVariants = await ctx.db.productVariant.findMany({
    //   where: { productId: "clvblrnru0008m8nus9mah2w6" },
    // });
    // const imageData = tShirtVariants.map((variant) => {
    //   return {
    //     productVariantId: variant.id,
    //     url: colorAndImageUrl[variant.color] ?? "",
    //   };
    // });
    // return ctx.db.image.createMany({
    //   data: imageData,
    // });
  }),
});
