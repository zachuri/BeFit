import { createRouter } from './context';
// import { z } from "zod";
import * as trpc from '@trpc/server';
import { TRPCError } from '@trpc/server';

export const setsRouter = createRouter().middleware(async ({ ctx, next }) => {
  // Any queries or mutations after this middleware will
  // raise an error unless there is a current session
  if (!ctx.session) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  return next();
});
