import z from 'zod';

export const addExerciseTrackerSchema = z.object({
  exerciseDayId: z.string(),
  set: z.number().min(1, 'Min set is 1 lbs').max(20, 'Max set is 20lbs'),
  rep: z.number().min(1, 'Min set is 1 lbs').max(200, 'Max set is 200lbs'),
  weight: z.number().min(1, 'Min set is 1 lbs').max(1500, 'Max set is 1500lbs')
});

export type AddExerciseTrackerInput = z.TypeOf<typeof addExerciseTrackerSchema>;

export const getAllExerciseTrackerSchema = z.object({
  exerciseDayId: z.string().uuid()
});

export type GetAllExerciseTrackerInput = z.TypeOf<
  typeof getAllExerciseTrackerSchema
>;

export const removeExerciseTrackerSchema = z.object({
  id: z.string().uuid()
});

export type RemoveExerciseTrackerInput = z.TypeOf<
  typeof removeExerciseTrackerSchema
>;
