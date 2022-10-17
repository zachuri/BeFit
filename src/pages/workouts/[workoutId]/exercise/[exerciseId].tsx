import { useRouter } from 'next/router';
import React from 'react';
import { MainLayoutFlex } from '../../../../components/layouts/Main';

const Sets = () => {
  const router = useRouter();
  const exerciseId = router.query.exerciseId as string;

  return (
    <MainLayoutFlex>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl">Exercise: {router.query.exerciseName}</h1>
        <h1>This is: {exerciseId}</h1>
        <button className="border-2 px-10 rounded border-black dark:border-white hover:dark:border-gray-500 hover:border-gray-200 transition">
          +
        </button>
      </div>
    </MainLayoutFlex>
  );
};

export default Sets;
