import z from 'zod';

export const getAllSetSchema = z.object({
  workoutId: z.string().uuid(),
  exerciseId: z.string().uuid()
});
