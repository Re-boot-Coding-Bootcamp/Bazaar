import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const colors = ["Black", "White", "Gray", "Blue"];
const poloColors = ["Green", "Black", "Light Gray", "Dark Gray", "White"];
const colors2 = ["Green", "Black", "Light Gray", "Dark Gray"];
const colors3 = ["Black", "Light Gray", "Dark Gray"];
const sizes = ["XS", "S", "M", "L", "XL", "2XL", "3XL"];

const colorAndImageUrl: Record<string, string> = {
  Black:
    "https://murad-public-files.s3.amazonaws.com/bazaar/product-images/4-simple-t-shirt-black.png",
  White:
    "https://murad-public-files.s3.amazonaws.com/bazaar/product-images/5-simple-t-shirt-white.png",
  Gray: "https://murad-public-files.s3.amazonaws.com/bazaar/product-images/6-simple-t-shirt-gray.png",
  Blue: "https://murad-public-files.s3.amazonaws.com/bazaar/product-images/7-simple-t-shirt-blue.png",
};

const colorAndImageUrlWaterBottles: Record<string, string> = {
  Black:
    "https://murad-public-files.s3.amazonaws.com/bazaar/product-images/11-water-bottle-black.png",
  White:
    "https://murad-public-files.s3.amazonaws.com/bazaar/product-images/13-water-bottle-white.png",
  Gray: "https://murad-public-files.s3.amazonaws.com/bazaar/product-images/14-water-bottle-gray.png",
  Blue: "https://murad-public-files.s3.amazonaws.com/bazaar/product-images/12-water-bottle-blue.png",
};

const colorAndImageUrlPolos: Record<string, string> = {
  Green:
    "https://murad-public-files.s3.amazonaws.com/bazaar/product-images/15-polo-green.png",
  Black:
    "https://murad-public-files.s3.amazonaws.com/bazaar/product-images/16-polo-black.png",
  "Light Gray":
    "https://murad-public-files.s3.amazonaws.com/bazaar/product-images/17-polo-light-gray.png",
  "Dark Gray":
    "https://murad-public-files.s3.amazonaws.com/bazaar/product-images/18-polo-dark-gray.png",
  White:
    "https://murad-public-files.s3.amazonaws.com/bazaar/product-images/19-polo-white.png",
};

const colorAndImageUrlHoodies: Record<string, string> = {
  Green:
    "https://murad-public-files.s3.amazonaws.com/bazaar/product-images/20-hoodie-green.png",
  Black:
    "https://murad-public-files.s3.amazonaws.com/bazaar/product-images/21-hoodie-black.png",
  "Light Gray":
    "https://murad-public-files.s3.amazonaws.com/bazaar/product-images/22-hoodie-light-gray.png",
  "Dark Gray":
    "https://murad-public-files.s3.amazonaws.com/bazaar/product-images/22-hoodie-charcoal.png",
};

const colorAndImageUrlPuffer: Record<string, string> = {
  Black:
    "https://murad-public-files.s3.amazonaws.com/bazaar/product-images/23-puffer-jacket-black.png",
  "Light Gray":
    "https://murad-public-files.s3.amazonaws.com/bazaar/product-images/25-puffer-jacket-light-gray.png",
  "Dark Gray":
    "https://murad-public-files.s3.amazonaws.com/bazaar/product-images/24-puffer-jacket-anthracite.png",
};

export const dataRouter = createTRPCRouter({
  creator: publicProcedure.query(async ({ ctx }) => {
    // 1, create productVariants for each color and size
    // productId: clvblrnru0008m8nus9mah2w6
    // price: 32.99
    // stock: 99
    const variantData = colors.flatMap((color) => {
      return sizes.map((size) => {
        return {
          productId: "clvblrnru0008m8nus9mah2w6",
          price: 32.99,
          stock: 99,
          color,
          size,
        };
      });
    });
    await ctx.db.productVariant.createMany({
      data: variantData,
    });
    // ----------------------------------------
    // 2, create image for each productVariant
    // fetch for all the productVariants, with the productId of "clvblrnru0008m8nus9mah2w6"
    // loop through the productVariants and create an image for each
    // use the colorAndImageUrl mapping to get the image url
    const tShirtVariants = await ctx.db.productVariant.findMany({
      where: { productId: "clvblrnru0008m8nus9mah2w6" },
    });
    const imageData = tShirtVariants.map((variant) => {
      return {
        productVariantId: variant.id,
        url: colorAndImageUrl[variant.color] ?? "",
      };
    });
    await ctx.db.image.createMany({
      data: imageData,
    });

    // create variant for tote bag using product ID clvcrgsgl00009lgjm5kpuysy
    // price $28.99 size OSFA color white stock 99
    const toteVariant = await ctx.db.productVariant.create({
      data: {
        productId: "clvcrgsgl00009lgjm5kpuysy",
        price: 28.99,
        color: "White",
        size: "OSFA",
        stock: 99,
      },
    });

    await ctx.db.image.create({
      data: {
        productVariantId: toteVariant?.id ?? "",
        url: "https://murad-public-files.s3.amazonaws.com/bazaar/product-images/8-cotton-tote-bag.png",
      },
    });

    // create water bottle product variants productId clvcvox7k00019lgj6x35w8y1
    const waterBottleProductVariantsData = colors.map((color) => {
      return {
        productId: "clvcvox7k00019lgj6x35w8y1",
        price: 19.99,
        stock: 99,
        color,
        size: "OSFA",
      };
    });
    await ctx.db.productVariant.createMany({
      data: waterBottleProductVariantsData,
    });
    // grab all variants
    const waterBottleVariants = await ctx.db.productVariant.findMany({
      where: { productId: "clvcvox7k00019lgj6x35w8y1" },
    });
    // add create image for all water bottle variants
    const waterBottleImageData = waterBottleVariants.map((variant) => {
      return {
        productVariantId: variant.id,
        url: colorAndImageUrlWaterBottles[variant.color] ?? "",
      };
    });
    await ctx.db.image.createMany({ data: waterBottleImageData });

    // polo variants productId: clvcvt7d600029lgjhymeqbdy
    const poloProductVariantData = poloColors.flatMap((color) => {
      return sizes.map((size) => {
        return {
          productId: "clvcvt7d600029lgjhymeqbdy",
          price: 42.99,
          stock: 99,
          color,
          size,
        };
      });
    });
    await ctx.db.productVariant.createMany({
      data: poloProductVariantData,
    });

    const poloVariants = await ctx.db.productVariant.findMany({
      where: { productId: "clvcvt7d600029lgjhymeqbdy" },
    });

    const imagePoloData = poloVariants.map((variant) => {
      return {
        productVariantId: variant.id,
        url: colorAndImageUrlPolos[variant.color] ?? "",
      };
    });
    await ctx.db.image.createMany({ data: imagePoloData });

    // hoodies productId: clvcwfhts00039lgjgiqki0hf
    const hoodiesProductVariantData = colors2.flatMap((color) => {
      return sizes.map((size) => {
        return {
          productId: "clvcwfhts00039lgjgiqki0hf",
          price: 52.99,
          stock: 99,
          color,
          size,
        };
      });
    });
    await ctx.db.productVariant.createMany({
      data: hoodiesProductVariantData,
    });

    const hoodieVariants = await ctx.db.productVariant.findMany({
      where: { productId: "clvcwfhts00039lgjgiqki0hf" },
    });

    const hoodieVariantsData = hoodieVariants.map((variant) => {
      return {
        productVariantId: variant.id,
        url: colorAndImageUrlHoodies[variant.color] ?? "",
      };
    });
    await ctx.db.image.createMany({ data: hoodieVariantsData });

    // puffer jacket productId: clvcwrttr00049lgjpeqfevze
    const pufferProductVariantData = colors3.flatMap((color) => {
      return sizes.map((size) => {
        return {
          productId: "clvcwrttr00049lgjpeqfevze",
          price: 62.99,
          stock: 99,
          color,
          size,
        };
      });
    });
    await ctx.db.productVariant.createMany({
      data: pufferProductVariantData,
    });

    const pufferVariants = await ctx.db.productVariant.findMany({
      where: { productId: "clvcwrttr00049lgjpeqfevze" },
    });

    const pufferVariantsData = pufferVariants.map((variant) => {
      return {
        productVariantId: variant.id,
        url: colorAndImageUrlPuffer[variant.color] ?? "",
      };
    });
    await ctx.db.image.createMany({ data: pufferVariantsData });
  }),
});
