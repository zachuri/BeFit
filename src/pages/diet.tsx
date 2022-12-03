import React, { useEffect } from 'react';
import { MainLayoutFlex } from '../components/layouts/Main';
import { MyFitnessPalApi } from '../utils/myfitnesspalApi';

const Diet = () => {
  useEffect(() => {
    MyFitnessPalApi();
  });

  return (
    <MainLayoutFlex>
      <h2 className="text-4xl">Diet</h2>
    </MainLayoutFlex>
  );
};

export default Diet;
