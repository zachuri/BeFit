// src/server/router/index.ts
import { createRouter } from './context';
import superjson from 'superjson';

import { exampleRouter } from './example';
import { protectedExampleRouter } from './protected-example-router';
import { weightRouter } from './weight';
import { workoutRouter } from './workout';

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('example.', exampleRouter)
  .merge('auth.', protectedExampleRouter)
  .merge('weights.', weightRouter)
  .merge('workouts.', workoutRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
