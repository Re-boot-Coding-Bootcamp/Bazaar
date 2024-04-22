import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const productRouter = createTRPCRouter({
  getTopSeller: publicProcedure.query(({ ctx }) => {
    return ctx.db.topSeller.findMany({
      orderBy: { quantitySold: "desc" },
      take: 4,
    });
  }),
  getProducts: publicProcedure
    .input(
      z.object({
        categoryId: z.string().optional(),
        size: z.string().optional(),
        color: z.string().optional(),
        price: z
          .object({
            min: z.number().optional(),
            max: z.number().optional(),
          })
          .optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const productFilters = {
        ...(input.categoryId && { categoryId: input.categoryId }),
        ...(input.size && { size: input.size }),
        ...(input.color && { color: input.color }),
        ...(input.price && {
          price: {
            gte: input.price.min,
            lte: input.price.max,
          },
        }),
      };

      const applyFilters = Object.keys(productFilters).length > 0;

      const products = await ctx.db.product.findMany({
        where: applyFilters ? productFilters : {},
      });

      return products;
    }),
});
