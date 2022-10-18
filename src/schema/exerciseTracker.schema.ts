import z from 'zod';

export const addExerciseTrackerSchema = z.object({
  exerciseDayid: z.string().uuid(),
  set: z.number().min(1, 'Min set is 1 lbs').max(20, 'Max set is 20lbs'),
  rep: z.number().min(1, 'Min set is 1 lbs').max(200, 'Max set is 200lbs'),
  weight: z.number().min(1, 'Min set is 1 lbs').max(1500, 'Max set is 1500lbs')
});

export type AddExerciseDayInput = z.TypeOf<typeof addExerciseTrackerSchema>;

export const getAllExerciseTrackerSchema = z.object({
  exerciseDayId: z.string().uuid()
});

export type GetAllExerciseDayInput = z.TypeOf<
  typeof getAllExerciseTrackerSchema
>;

export const removeExerciseTrackerSchema = z.object({
  id: z.string().uuid()
});

export type RemoveExerciseDayInput = z.TypeOf<
  typeof removeExerciseTrackerSchema
>;
