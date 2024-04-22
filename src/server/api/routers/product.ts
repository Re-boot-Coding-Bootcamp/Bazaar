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
    .query(({ ctx, input: { categoryId, size, color, price } }) => {
      const productFilters = {
        ...(categoryId && { categoryId }),
        ...(size && { size }),
        ...(color && { color }),
        ...(price && {
          price: {
            gte: price.min,
            lte: price.max,
          },
        }),
      };

      return ctx.db.product.findMany({
        where: productFilters,
      });
    }),
});
