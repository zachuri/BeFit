import z from 'zod';

export const addWorkoutSchema = z.object({
  title: z.string().max(20, 'Max length of workout name is 20')
});

export type AddWorkoutInput = z.TypeOf<typeof addWorkoutSchema>;
