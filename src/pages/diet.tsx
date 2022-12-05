import React, { useEffect, useState } from 'react';
import { MainLayoutFlex } from '../components/layouts/Main';
import LoadingIcon from '../components/LoadingIcon';

const Diet = () => {
  const [total, setTotal] = useState<any>([]);
  const [goal, setGoal] = useState<any>([]);
  const [remaining, setRemaining] = useState<any>([]);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [userName, setUserName] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>();

  const dateFull = `
    ${
      currentDate.getMonth() + 1
    }/${currentDate.getDate()}/${currentDate.getFullYear()}`;

  useEffect(() => {
    setIsLoading(true);
    setUserName('punsalangzachary');

    fetch('/api/dietData', {
      method: 'post',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ userName: userName, userDate: currentDate })
    })
      .then(res => res.json())
      .then(userData => {
        setTotal(userData.total);
        setGoal(userData.dailyGoal);
        setRemaining(userData.remaining);
        setIsLoading(false);

        console.log('Total + ' + userData.total);
        console.log('Data + ' + userData.dailyGoal);
        console.log('Remaining + ' + userData.remaining);
      });
  }, [currentDate, userName]);

  return (
    <>
      <MainLayoutFlex>
        <h2 className="text-4xl">Diet</h2>
        <div className="flex flex-col md:grid md:grid-cols-3 md:space-x-2">
          <div className="border border-white mt-2">
            <h3 className="text-2xl">{total[0]}</h3>
            <p>{total[1]}</p>
            <p>{total[2]}</p>
            <p>{total[3]}</p>
            <p>{total[4]}</p>
            <p>{total[5]}</p>
            <p>{total[6]}</p>
          </div>
          <div className="border border-white mt-2">
            <h3 className="text-xl">{goal[0]}</h3>
            <p>{goal[1]}</p>
            <p>{goal[2]}</p>
            <p>{goal[3]}</p>
            <p>{goal[4]}</p>
            <p>{goal[5]}</p>
            <p>{goal[6]}</p>
          </div>
          <div className="border border-white mt-2">
            <h3 className="text-2xl">{remaining[0]}</h3>
            <p>{remaining[1]}</p>
            <p>{remaining[2]}</p>
            <p>{remaining[3]}</p>
            <p>{remaining[4]}</p>
            <p>{remaining[5]}</p>
            <p>{remaining[6]}</p>
          </div>
        </div>
        <div className="mt-5 flex items-center justify-center gap-2">
          <button
            className="border border-white"
            onClick={() => {
              const date = new Date(currentDate);
              date.setDate(currentDate.getDate() - 1);
              setCurrentDate(date);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>

          <h3 className="text-lg">Looking at date: {dateFull}</h3>

          <button
            className="border border-white"
            onClick={() => {
              const date = new Date(currentDate);
              date.setDate(currentDate.getDate() + 1);
              setCurrentDate(date);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>
        {isLoading && (
          <div className="">
            <LoadingIcon />
          </div>
        )}
      </MainLayoutFlex>
    </>
  );
};

export default Diet;
