import { createRouter } from './context';
// import { z } from "zod";
import {} from '../../schema/workout.schema';
import * as trpc from '@trpc/server';
import { TRPCError } from '@trpc/server';
import {
  addExerciseDaySchema,
  getAllExerciseDayPagination,
  getAllExerciseDaySchema,
  getQueryLength,
  removeExerciseDaySchema
} from '../../schema/exerciseDay.schema';

export const exerciseDayRouter = createRouter()
  .middleware(async ({ ctx, next }) => {
    // Any queries or mutations after this middleware will
    // raise an error unless there is a current session
    if (!ctx.session) {
      throw new TRPCError({ code: 'UNAUTHORIZED' });
    }
    return next();
  })
  .query('getAllExerciseDay', {
    input: getAllExerciseDaySchema,
    async resolve({ ctx, input }) {
      if (!ctx.session) {
        new trpc.TRPCError({
          code: 'FORBIDDEN',
          message: "Please Sign In: can't get any post"
        });
      }

      return ctx.prisma.exerciseDay.findMany({
        orderBy: {
          createdAt: 'desc'
        },
        where: {
          userId: ctx.session?.user?.id,
          exerciseId: input.exerciseId
        }
      });
    }
  })
  .mutation('removeExerciseDay', {
    input: removeExerciseDaySchema,
    async resolve({ ctx, input }) {
      if (!ctx.session) {
        new trpc.TRPCError({
          code: 'FORBIDDEN',
          message: "Please Sign In: can't get any post"
        });
      }

      return ctx.prisma.exerciseDay.delete({
        where: {
          id: input.id
        }
      });
    }
  })
  .mutation('addExerciseDay', {
    input: addExerciseDaySchema,
    async resolve({ ctx, input }) {
      // !ctx.session.user -> no need for user
      if (!ctx.session) {
        new trpc.TRPCError({
          code: 'FORBIDDEN',
          message: 'Cannot create a post while logged out'
        });
      }

      // create workout in prisma data base
      const workout = await ctx.prisma.exerciseDay.create({
        data: {
          user: {
            connect: {
              id: ctx.session?.user?.id
            }
          },
          exercise: {
            connect: {
              id: input.exerciseId
            }
          }
        }
      });

      return workout;
    }
  })
  .query('getAllExerciseDayPagination', {
    input: getAllExerciseDayPagination,

    async resolve({ ctx, input }) {
      if (!ctx.session) {
        new trpc.TRPCError({
          code: 'FORBIDDEN',
          message: "Please Sign In: can't get any post"
        });
      }

      return ctx.prisma.exerciseDay.findMany({
        take: input.take, // Page size
        skip: input.skip,
        where: {
          userId: ctx.session?.user?.id,
          exerciseId: input.id
        },
        orderBy: {
          createdAt: 'desc'
        }
      });
    }
  })
  .query('getQueryLength', {
    input: getQueryLength,
    async resolve({ ctx, input }) {
      if (!ctx.session) {
        new trpc.TRPCError({
          code: 'FORBIDDEN',
          message: "Please Sign In: can't get any post"
        });
      }

      const result = ctx.prisma.exerciseDay.findMany({
        where: {
          userId: ctx.session?.user?.id,
          exerciseId: input.id
        },
        orderBy: {
          createdAt: 'desc'
        }
      });

      return (await result).length;
    }
  });
