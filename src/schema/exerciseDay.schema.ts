import z from 'zod';

export const addExerciseDaySchema = z.object({
  exerciseId: z.string().uuid()
});

export type AddExerciseDayInput = z.TypeOf<typeof addExerciseDaySchema>;

export const getAllExerciseDaySchema = z.object({
  exerciseId: z.string().uuid()
});

export type GetAllExerciseDayInput = z.TypeOf<typeof getAllExerciseDaySchema>;
