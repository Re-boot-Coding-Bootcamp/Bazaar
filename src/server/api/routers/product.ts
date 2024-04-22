import { TRPCError } from "@trpc/server";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const productRouter = createTRPCRouter({
  getTopSeller: publicProcedure.query(async ({ ctx }) => {
    const sortedProductsBasedOnQuantitySold = await ctx.db.topSeller.findMany({
      orderBy: { quantitySold: "desc" },
    });
    if (!sortedProductsBasedOnQuantitySold) {
      throw new TRPCError({
        message: "Top Sellers can't be found",
        code: "INTERNAL_SERVER_ERROR",
      });
    }
    return sortedProductsBasedOnQuantitySold.slice(0, 4);
  }),
});
