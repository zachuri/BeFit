import z from 'zod';

export const getAllExerciseSchema = z.object({
  workoutId: z.string().uuid()
});

export type GetAllExerciseInput = z.TypeOf<typeof getAllExerciseSchema>;

export const addExerciseSchema = z.object({
  workoutId: z.string().uuid(),
  title: z.string().max(40, 'Max length of workout name is 20')
});

export type AddExerciseInput = z.TypeOf<typeof addExerciseSchema>;

export const updateExerciseSchema = z.object({
  id: z.string().uuid(),
  title: z.string().max(40, 'Max length of workout name is 20')
});

export type UpdateExerciseInput = z.TypeOf<typeof updateExerciseSchema>;

export const removeExerciseSchema = z.object({
  id: z.string().uuid()
});

export type RemoveExerciseInput = z.TypeOf<typeof removeExerciseSchema>;
