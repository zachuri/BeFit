import z from 'zod';

export const addExerciseDaySchema = z.object({
  exerciseId: z.string().uuid()
});

export type AddExerciseDayInput = z.TypeOf<typeof addExerciseDaySchema>;
