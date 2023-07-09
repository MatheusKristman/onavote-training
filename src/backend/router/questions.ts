import { procedure, router } from "../../server/trpc";
import { prisma } from "../../db/client";
import { z } from "zod";

export const questionRouter = router({
  getAll: procedure.query(async (opts) => {
    return await prisma.pollQuestion.findMany();
  }),
  getById: procedure.input(z.object({ id: z.string() })).query(async (opts) => {
    return await prisma.pollQuestion.findFirst({
      where: {
        id: opts.input.id,
      },
    });
  }),
  create: procedure
    .input(z.object({ question: z.string().min(5).max(600), ownerToken: z.string() }))
    .mutation(async (opts) => {
      return await prisma.pollQuestion.create({
        data: {
          question: opts.input.question,
          options: [],
          ownerToken: opts.input.ownerToken,
        },
      });
    }),
});

// export type definition of API
export type AppRouter = typeof questionRouter;
