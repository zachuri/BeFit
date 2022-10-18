import z from 'zod';

export const getAllSetsSchema = z.object({
  exerciseId: z.string().uuid()
});
