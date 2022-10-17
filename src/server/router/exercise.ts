import { createRouter } from './context';
// import { z } from "zod";
import {} from '../../schema/workout.schema';
import * as trpc from '@trpc/server';
import { TRPCError } from '@trpc/server';
import {
  addExerciseSchema,
  getAllExerciseSchema,
  removeExerciseSchema,
  updateExerciseSchema
} from '../../schema/exercise.schema';

export const exerciseRouter = createRouter()
  .middleware(async ({ ctx, next }) => {
    // Any queries or mutations after this middleware will
    // raise an error unless there is a current session
    if (!ctx.session) {
      throw new TRPCError({ code: 'UNAUTHORIZED' });
    }
    return next();
  })
  .mutation('addExercise', {
    input: addExerciseSchema,
    async resolve({ ctx, input }) {
      // !ctx.session.user -> no need for user
      if (!ctx.session) {
        new trpc.TRPCError({
          code: 'FORBIDDEN',
          message: 'Cannot create a post while logged out'
        });
      }

      // create workout in prisma data base
      const workout = await ctx.prisma.exercises.create({
        data: {
          title: input.title,
          user: {
            connect: {
              id: ctx.session?.user?.id
            }
          },
          workout: {
            connect: {
              id: input.workoutId
            }
          }
        }
      });

      return workout;
    }
  })
  .mutation('removeExercise', {
    input: removeExerciseSchema,
    async resolve({ ctx, input }) {
      if (!ctx.session) {
        new trpc.TRPCError({
          code: 'FORBIDDEN',
          message: "Please Sign In: can't get any post"
        });
      }

      return ctx.prisma.exercises.delete({
        where: {
          id: input.id
        }
      });
    }
  })
  .mutation('updateExercise', {
    input: updateExerciseSchema,
    async resolve({ ctx, input }) {
      if (!ctx.session) {
        new trpc.TRPCError({
          code: 'FORBIDDEN',
          message: "Please Sign In: can't get any post"
        });
      }

      return ctx.prisma.exercises.update({
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
  .query('getAllExercises', {
    input: getAllExerciseSchema,
    async resolve({ ctx, input }) {
      if (!ctx.session) {
        new trpc.TRPCError({
          code: 'FORBIDDEN',
          message: "Please Sign In: can't get any post"
        });
      }

      return ctx.prisma.exercises.findMany({
        orderBy: {
          createdAt: 'desc'
        },
        where: {
          userId: ctx.session?.user?.id,
          workoutId: input.id
        }
      });
    }
  });
