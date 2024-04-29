import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";

export const searchRouter = createTRPCRouter({
  searchProducts: publicProcedure
    .input(
      z.object({
        searchInput: z.string().min(1, "Search input cannot be empty"),
      }),
    )
    .query(async ({ ctx, input }) => {
      console.log("searchProducts called with input:", input);
      const { searchInput } = input;
      const products = await ctx.db.product.findMany({
        where: {
          OR: [
            {
              name: {
                contains: searchInput,
              },
            },
            {
              description: {
                contains: searchInput,
              },
            },
            {
              variants: {
                some: {
                  color: {
                    contains: searchInput,
                  },
                },
              },
            },
          ],
        },
        include: {
          variants: {
            select: {
              id: true,
              color: true,
              size: true,
              images: {
                select: {
                  url: true,
                },
                take: 1,
              },
            },
          },
        },
      });
      return products;
    }),
});
