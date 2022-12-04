import React, { useEffect, useState } from 'react';
import { MainLayoutFlex } from '../components/layouts/Main';
import { getMyFitnessPalData } from '../utils/myfitnesspalApi';

const Diet = () => {
  const [total, setTotal] = useState<any>([]);
  const [goal, setGoal] = useState<any>([]);
  const [remaining, setRemaining] = useState<any>([]);

  useEffect(() => {
    getMyFitnessPalData().then(res => {
      setTotal(res.total);
      setGoal(res.dailyGoal);
      setRemaining(res.remaining);
    });
  }, [total, goal, remaining]);

  return (
    <>
      <MainLayoutFlex>
        <h2 className="text-4xl">Diet</h2>
        <h3 className="text-2xl">{total[0]}</h3>
        <p>{total[1]}</p>
        <p>{total[2]}</p>
        <p>{total[3]}</p>
        <p>{total[4]}</p>
        <p>{total[5]}</p>
        <p>{total[6]}</p>
        <h3 className="text-2xl">{goal[0]}</h3>
        <p>{goal[1]}</p>
        <p>{goal[2]}</p>
        <p>{goal[3]}</p>
        <p>{goal[4]}</p>
        <p>{goal[5]}</p>
        <p>{goal[6]}</p>
        <h3 className="text-2xl">{remaining[0]}</h3>
        <p>{remaining[1]}</p>
        <p>{remaining[2]}</p>
        <p>{remaining[3]}</p>
        <p>{remaining[4]}</p>
        <p>{remaining[5]}</p>
        <p>{remaining[6]}</p>
      </MainLayoutFlex>
    </>
  );
};

export default Diet;
