import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";
import { createMembershipRequest, getLatestDailyUpdate } from "./db";
import { z } from "zod";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),
  content: router({
    latestDailyUpdate: publicProcedure.query(() => getLatestDailyUpdate()),
  }),
  membership: router({
    requestAccess: protectedProcedure.input(z.object({ plan: z.enum(["standard", "vip"]) })).mutation(({ ctx, input }) => createMembershipRequest(ctx.user.id, input.plan)),
  }),
});

export type AppRouter = typeof appRouter;
