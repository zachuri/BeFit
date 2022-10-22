import z from 'zod';

export const addExerciseDaySchema = z.object({
  exerciseId: z.string().uuid()
});

export type AddExerciseDayInput = z.TypeOf<typeof addExerciseDaySchema>;

export const getAllExerciseDaySchema = z.object({
  exerciseId: z.string().uuid()
});

export type GetAllExerciseDayInput = z.TypeOf<typeof getAllExerciseDaySchema>;

export const removeExerciseDaySchema = z.object({
  id: z.string().uuid()
});

export type RemoveExerciseDayInput = z.TypeOf<typeof removeExerciseDaySchema>;

export const getAllExerciseDayPagination = z.object({
  id: z.string().uuid(),
  take: z.number().min(1).max(14),
  skip: z.number() // <-- "cursor" needs to exist, but can be any type
});

export type GetAllExerciseDayPagination = z.TypeOf<
  typeof getAllExerciseDayPagination
>;

export const getQueryLength = z.object({
  id: z.string().uuid()
});

export type GetQueryLength = z.TypeOf<typeof getQueryLength>;
