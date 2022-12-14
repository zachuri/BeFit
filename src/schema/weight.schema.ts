import z from 'zod';

export const addWeightSchema = z.object({
  weightTotal: z
    .number()
    .min(1, 'Min weight is 1 lbs')
    .max(1000, 'Max weight is 1000lbs'),
  body: z.string().max(40, 'Max body length is 35 characters')
});

export type AddWeightInput = z.TypeOf<typeof addWeightSchema>;

export const removeWeightSchema = z.object({
  id: z.string().uuid()
});

export type RemoveWeightInput = z.TypeOf<typeof removeWeightSchema>;

export const updateWeightSchema = z.object({
  id: z.string().uuid(),
  weightTotal: z
    .number()
    .min(1, 'Min weight is 1 lbs')
    .max(1000, 'Max weight is 1000lbs')
    .optional(),
  body: z.string().max(40, 'Max body length is 100 words')
});

export type UpdateWeightInput = z.TypeOf<typeof updateWeightSchema>;

export const getSingleWeightSchema = z.object({
  weigthId: z.string().uuid()
});

export const pagnationWeightSchema = z.object({
  take: z.number().min(1).max(14),
  skip: z.number() // <-- "cursor" needs to exist, but can be any type
});

export type PagnationWeightInput = z.TypeOf<typeof pagnationWeightSchema>;
