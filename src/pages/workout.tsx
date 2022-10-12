import React from 'react';
import { MainLayoutFlex } from '../components/layouts/Main';

const Workout: React.FC = () => {
  return (
    <>
      <MainLayoutFlex>
        <h2 className="text-xl">Exercise</h2>
        <div className="flex items-center justify-center">
          <button className="border-2 px-10 rounded border-black dark:border-white">
            +
          </button>
        </div>
      </MainLayoutFlex>
    </>
  );
};

export default Workout;
