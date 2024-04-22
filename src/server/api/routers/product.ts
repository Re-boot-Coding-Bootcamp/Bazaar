import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const productRouter = createTRPCRouter({
  getTopSeller: publicProcedure.query(async ({ ctx }) => {
    const allProductVariantsAndQuantitySold = await ctx.db.topSeller
      .findMany({
        orderBy: { quantitySold: "desc" },
      })
      .slice(0, 4);
    if (!allProductVariantsAndQuantitySold) {
      throw new TRPCError({
        message: "Top Sellers can't be found",
        code: "INTERNAL_SERVER_ERROR",
      });
    }
    const sortedProductVariantsDescendingOrder =
      allProductVariantsAndQuantitySold.sort((a, b) => {
        b.quantitySold - a.quantitySold;
      });
    return sortedProductVariantsDescendingOrder.slice(0, 4);
  }),
});
