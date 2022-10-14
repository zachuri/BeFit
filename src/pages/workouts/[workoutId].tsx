import { useRouter } from 'next/router';
import React from 'react';
import { MainLayoutFlex } from '../../components/layouts/Main';

const Exercises = () => {
  const router = useRouter();
  const workoutId = router.query.workoutId as string;

  return (
    <>
      <MainLayoutFlex>THIS IS: {workoutId}</MainLayoutFlex>
    </>
  );
};
export default Exercises;
