import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const searchRouter = createTRPCRouter({
  searchProducts: publicProcedure
    .input(
      z.object({
        searchInput: z.string().min(1, "Search input cannot be empty"),
      }),
    )
    .query(({ ctx, input: { searchInput } }) => {
      return ctx.db.productVariant.findMany({
        where: {
          OR: [
            {
              color: {
                contains: searchInput,
              },
            },
            {
              product: {
                name: {
                  contains: searchInput,
                },
              },
            },
            {
              product: {
                description: {
                  contains: searchInput,
                },
              },
            },
          ],
        },
        select: {
          id: true,
          price: true,
          color: true,
          size: true,
          images: {
            select: {
              url: true,
            },
            take: 1,
          },
          product: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });
    }),
});
