import z from 'zod';

export const addWeightSchema = z.object({
  weightTotal: z
    .number()
    .min(1, 'Min weight is 1 lbs')
    .max(1000, 'Max weight is 1000lbs'),
  body: z.string().max(100, 'Max body length is 100 words')
});

export type AddWeightInput = z.TypeOf<typeof addWeightSchema>;

export const getSingleWeightSchema = z.object({
  weigthId: z.string().uuid()
});
