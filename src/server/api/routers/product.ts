import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const productRouter = createTRPCRouter({
  getTopSeller: publicProcedure.query(async ({ ctx }) => {
    const allProductVariantsAndQuantitySold = await ctx.db.topSeller.findMany({
      orderBy: { quantitySold: "desc" },
    });
    if (!allProductVariantsAndQuantitySold) {
      throw new TRPCError({
        message: "Top Sellers can't be found",
        code: "INTERNAL_SERVER_ERROR",
      });
    }
    // this is before I did the findMany orderBy wanted to know if the orderBy works the way I think it will
    const sortedProductVariantsDescendingOrder =
      allProductVariantsAndQuantitySold.sort((a, b) => {
        b.quantitySold - a.quantitySold;
      });
    return sortedProductVariantsDescendingOrder.slice(0, 4);
  }),
});
