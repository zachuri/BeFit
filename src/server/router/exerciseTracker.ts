import { createRouter } from './context';
// import { z } from "zod";
import {} from '../../schema/workout.schema';
import * as trpc from '@trpc/server';
import { TRPCError } from '@trpc/server';
import {
  addExerciseTrackerSchema,
  getAllExerciseTrackerSchema,
  removeExerciseTrackerSchema
} from '../../schema/exerciseTracker.schema';

export const exerciseTrackerRouter = createRouter()
  .middleware(async ({ ctx, next }) => {
    // Any queries or mutations after this middleware will
    // raise an error unless there is a current session
    if (!ctx.session) {
      throw new TRPCError({ code: 'UNAUTHORIZED' });
    }
    return next();
  })
  .query('getAllExerciseTracker', {
    input: getAllExerciseTrackerSchema,
    async resolve({ ctx, input }) {
      if (!ctx.session) {
        new trpc.TRPCError({
          code: 'FORBIDDEN',
          message: "Please Sign In: can't get any post"
        });
      }

      return ctx.prisma.exerciseTracker.findMany({
        orderBy: {
          createdAt: 'asc'
        },
        where: {
          userId: ctx.session?.user?.id,
          exerciseDayId: input.exerciseDayId
        }
      });
    }
  })
  .mutation('removeExerciseTracker', {
    input: removeExerciseTrackerSchema,
    async resolve({ ctx, input }) {
      if (!ctx.session) {
        new trpc.TRPCError({
          code: 'FORBIDDEN',
          message: "Please Sign In: can't get any post"
        });
      }

      return ctx.prisma.exerciseTracker.delete({
        where: {
          id: input.id
        }
      });
    }
  })
  .mutation('addExerciseTracker', {
    input: addExerciseTrackerSchema,
    async resolve({ ctx, input }) {
      // !ctx.session.user -> no need for user
      if (!ctx.session) {
        new trpc.TRPCError({
          code: 'FORBIDDEN',
          message: 'Cannot create a post while logged out'
        });
      }

      // create workout in prisma data base
      const workout = await ctx.prisma.exerciseTracker.create({
        data: {
          // set: input.set,
          rep: input.rep,
          weight: input.weight,
          user: {
            connect: {
              id: ctx.session?.user?.id
            }
          },
          exerciseDay: {
            connect: {
              id: input.exerciseDayId
            }
          }
        }
      });

      return workout;
    }
  });
