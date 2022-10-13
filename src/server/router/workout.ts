import { createRouter } from './context';
// import { z } from "zod";
import {
  addWorkoutSchema,
  removeWorkoutSchema,
  updateWorkoutSchema
} from '../../schema/workout.schema';
import * as trpc from '@trpc/server';
import { TRPCError } from '@trpc/server';

export const workoutRouter = createRouter()
  .middleware(async ({ ctx, next }) => {
    // Any queries or mutations after this middleware will
    // raise an error unless there is a current session
    if (!ctx.session) {
      throw new TRPCError({ code: 'UNAUTHORIZED' });
    }
    return next();
  })
  .mutation('addWorkout', {
    input: addWorkoutSchema,
    async resolve({ ctx, input }) {
      // !ctx.session.user -> no need for user
      if (!ctx.session) {
        new trpc.TRPCError({
          code: 'FORBIDDEN',
          message: 'Cannot create a post while logged out'
        });
      }

      // create workout in prisma data base
      const workout = await ctx.prisma.workout.create({
        data: {
          ...input,
          user: {
            connect: {
              id: ctx.session?.user?.id
            }
          }
        }
      });

      return workout;
    }
  })
  .mutation('removeWorkout', {
    input: removeWorkoutSchema,
    async resolve({ ctx, input }) {
      if (!ctx.session) {
        new trpc.TRPCError({
          code: 'FORBIDDEN',
          message: "Please Sign In: can't get any post"
        });
      }

      return ctx.prisma.workout.delete({
        where: {
          id: input.id
        }
      });
    }
  })
  .mutation('updateWorkout', {
    input: updateWorkoutSchema,
    async resolve({ ctx, input }) {
      if (!ctx.session) {
        new trpc.TRPCError({
          code: 'FORBIDDEN',
          message: "Please Sign In: can't get any post"
        });
      }

      return ctx.prisma.workout.update({
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
  .query('getAllWorkouts', {
    async resolve({ ctx }) {
      if (!ctx.session) {
        new trpc.TRPCError({
          code: 'FORBIDDEN',
          message: "Please Sign In: can't get any post"
        });
      }

      return ctx.prisma.workout.findMany({
        orderBy: {
          createdAt: 'desc'
        },
        where: {
          userId: ctx.session?.user?.id
        }
      });
    }
  });
