import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const productRouter = createTRPCRouter({
  getTopSeller: publicProcedure.query(({ ctx }) => {
    return ctx.db.topSeller.findMany({
      orderBy: { quantitySold: "desc" },
      take: 4,
    });
  }),
});
