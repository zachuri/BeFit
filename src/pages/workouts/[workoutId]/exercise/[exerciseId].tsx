import { useRouter } from 'next/router';
import React from 'react';
import { MainLayoutFlex } from '../../../../components/layouts/Main';

const Sets = () => {
  const router = useRouter();
  const exerciseId = router.query.exerciseId as string;

  return (
    <MainLayoutFlex>
      <h1>Exercise</h1>
      <h1>This is: {exerciseId}</h1>
    </MainLayoutFlex>
  );
};

export default Sets;
