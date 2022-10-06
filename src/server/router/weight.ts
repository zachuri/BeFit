import { createRouter } from './context';
// import { z } from "zod";
import {
  addWeightSchema,
  removeWeightSchema,
  updateWeightSchema
} from '../../schema/weight.schema';
import * as trpc from '@trpc/server';
import { TRPCError } from '@trpc/server';

export const weightRouter = createRouter()
  .middleware(async ({ ctx, next }) => {
    // Any queries or mutations after this middleware will
    // raise an error unless there is a current session
    if (!ctx.session) {
      throw new TRPCError({ code: 'UNAUTHORIZED' });
    }
    return next();
  })
  .mutation('addWeight', {
    input: addWeightSchema,
    async resolve({ ctx, input }) {
      // !ctx.session.user -> no need for user
      if (!ctx.session) {
        new trpc.TRPCError({
          code: 'FORBIDDEN',
          message: 'Cannot create a post while logged out'
        });
      }

      // create weight in prisma data base
      const weight = await ctx.prisma.weight.create({
        data: {
          ...input,
          user: {
            connect: {
              id: ctx.session?.user?.id
            }
          }
        }
      });

      return weight;
    }
  })
  .mutation('removeWeight', {
    input: removeWeightSchema,
    async resolve({ ctx, input }) {
      if (!ctx.session) {
        new trpc.TRPCError({
          code: 'FORBIDDEN',
          message: "Please Sign In: can't get any post"
        });
      }

      return ctx.prisma.weight.delete({
        where: {
          id: input.id
        }
      });
    }
  })
  .mutation('updateWeight', {
    input: updateWeightSchema,
    async resolve({ ctx, input }) {
      if (!ctx.session) {
        new trpc.TRPCError({
          code: 'FORBIDDEN',
          message: "Please Sign In: can't get any post"
        });
      }

      return ctx.prisma.weight.update({
        where: {
          id: input.id
        },
        data: {
          ...input,
          user: {
            connect: {
              id: ctx.session?.user?.id
            }
          }
        }
      });
    }
  })
  .query('getAllWeights', {
    async resolve({ ctx }) {
      if (!ctx.session) {
        new trpc.TRPCError({
          code: 'FORBIDDEN',
          message: "Please Sign In: can't get any post"
        });
      }

      return ctx.prisma.weight.findMany({
        orderBy: {
          createdAt: "desc",
        },
        where: {
          userId: ctx.session?.user?.id
        }
      });
    }
  });
