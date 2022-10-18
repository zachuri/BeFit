import z from 'zod';

export const getAllSetSchema = z.object({
  exerciseId: z.string().uuid()
});
