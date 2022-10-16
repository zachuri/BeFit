import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React from 'react';
import {
  MainLayoutFlex,
  MainLayoutHeightScreen
} from '../../components/layouts/Main';

const Exercises = () => {
  const { status } = useSession();
  const router = useRouter();
  const workoutId = router.query.workoutId as string;

  return (
    <>
      {status === 'unauthenticated' ? (
        <MainLayoutHeightScreen>
          <div className="min-h-screen flex items-center justify-center -mt-10 md:-mt-20">
            <div className="flex flex-col text-center">
              <h1 className="text-4xl">Workouts Page</h1>
              <p className="text-2xl text-gray-700">Please Sign in!</p>
            </div>
          </div>
        </MainLayoutHeightScreen>
      ) : status === 'loading' ? (
        <MainLayoutHeightScreen>
          <div className="flex flex-col text-center">
            <h1 className="text-2xl">Data is loading...</h1>
          </div>
        </MainLayoutHeightScreen>
      ) : (
        <MainLayoutFlex>
          <h1>This is: {workoutId}</h1>
        </MainLayoutFlex>
      )}
    </>
  );
};
export default Exercises;
