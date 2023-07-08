import { procedure, router } from "../../server/trpc";
import { prisma } from "../../db/client";

export const questionRouter = router({
  getAll: procedure.query(async (opts) => {
    return await prisma.pollQuestion.findMany();
  }),
});

// export type definition of API
export type AppRouter = typeof questionRouter;
