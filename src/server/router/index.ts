// src/server/router/index.ts
import { createRouter } from './context';
import superjson from 'superjson';

import { exampleRouter } from './example';
import { protectedExampleRouter } from './protected-example-router';
import { weightRouter } from './weight';
import { workoutRouter } from './workout';
import { exerciseRouter } from './exercise';
import { setRouter } from './set';

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('example.', exampleRouter)
  .merge('auth.', protectedExampleRouter)
  .merge('weights.', weightRouter)
  .merge('workouts.', workoutRouter)
  .merge('exercises.', exerciseRouter)
  .merge('sets.', setRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
