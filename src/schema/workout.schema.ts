import z from 'zod';

export const addWorkoutSchema = z.object({
  title: z.string().max(20, 'Max length of workout name is 20')
});

export type AddWorkoutInput = z.TypeOf<typeof addWorkoutSchema>;

export const updateWorkoutSchema = z.object({
  id: z.string().uuid(),
  title: z.string().max(20, 'Max length of workout name is 20')
});

export type UpdateWorkoutInput = z.TypeOf<typeof updateWorkoutSchema>;

export const removeWorkoutSchema = z.object({
  id: z.string().uuid()
});

export type RemoveWorkoutInput = z.TypeOf<typeof removeWorkoutSchema>;
