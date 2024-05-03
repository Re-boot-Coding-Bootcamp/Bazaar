import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const searchRouter = createTRPCRouter({
  searchProducts: publicProcedure
    .input(
      z.object({
        searchInput: z.string().min(1, "Search input cannot be empty"),
      }),
    )
    .query(async ({ ctx, input: { searchInput } }) => {
      let searchTerm;
      const additionalKeywords: string[] = [];
      if (searchInput.includes(" ")) {
        const [firstKeyword, ...otherKeywords] = searchInput.split(" ");
        if (firstKeyword) {
          searchTerm = firstKeyword;
        }
        if (otherKeywords.length) {
          additionalKeywords.push(...otherKeywords);
        }
      } else {
        searchTerm = searchInput;
      }

      const initialSearchResults = await ctx.db.productVariant.findMany({
        where: {
          OR: [
            {
              color: {
                contains: searchTerm,
              },
            },
            {
              product: {
                name: {
                  contains: searchTerm,
                },
              },
            },
            {
              product: {
                description: {
                  contains: searchTerm,
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
              description: true,
            },
          },
        },
      });

      if (additionalKeywords.length) {
        let reducedResults = initialSearchResults;
        additionalKeywords.forEach((keyword) => {
          reducedResults = reducedResults.filter((result) => {
            return (
              result.color.toLowerCase().includes(keyword.toLowerCase()) ||
              result.product.name
                .toLowerCase()
                .includes(keyword.toLowerCase()) ||
              result.product.description
                .toLowerCase()
                .includes(keyword.toLowerCase())
            );
          });
        });
        return reducedResults;
      } else {
        return initialSearchResults;
      }
    }),
});
