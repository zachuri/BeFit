import React, { useEffect, useState } from 'react';
import { MainLayoutFlex } from '../components/layouts/Main';
import { trpc } from '../utils/trpc';

const WeightPagnation: React.FC = () => {
  const [pageIndex, setPageIndex] = useState(0);

  const { data, isLoading, refetch } = trpc.useQuery([
    'weights.getAllWeightsPagnation',
    { take: 7, skip: pageIndex }
  ]);

  useEffect(() => {
    if (data?.length === 0) {
      setPageIndex(pageIndex - 7);
    }
  }, [data, pageIndex]);

  return (
    <div>
      <MainLayoutFlex>
        <h2>Pagnation</h2>
        {data?.map(item => {
          return (
            <>
              <div className="my-10">
                <p>{item.weightTotal}</p>
                <p>{item.createdAt.toLocaleDateString()}</p>
                <p>{item.body}</p>
              </div>
            </>
          );
        })}
        <div className="flex gap-2">
          <button
            className="border border-white p-2"
            onClick={() => {
              if (pageIndex - 7 <= 0) {
                setPageIndex(0);
              }
              setPageIndex(pageIndex - 7);
            }}
          >
            back
          </button>
          <button
            className="border border-white p-2"
            onClick={() => {
              setPageIndex(pageIndex + 7);
            }}
          >
            next
          </button>
        </div>
      </MainLayoutFlex>
    </div>
  );
};

export default WeightPagnation;
