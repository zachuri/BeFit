import z from 'zod';

export const createWeightSchema = z.object({
  weightTotal: z.string().max(700, 'Max title legnth is 700'),
  body: z.string().min(10)
});

export type CreateWeightInput = z.TypeOf<typeof createWeightSchema>;

export const getSingleWeightSchema = z.object({
  weigthId: z.string().uuid()
});
