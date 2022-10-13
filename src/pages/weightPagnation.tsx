import React, { useState } from 'react';
import { MainLayoutFlex } from '../components/layouts/Main';
import { trpc } from '../utils/trpc';

const WeightPagnation: React.FC = () => {
  const [pageIndex, setPageIndex] = useState(0);

  const { data, isLoading, refetch } = trpc.useQuery([
    'weights.getAllWeightsPagnation',
    { take: 7, skip: pageIndex }
  ]);

  console.log(data);

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
        <button
          className="border border-white p-2"
          onClick={() => setPageIndex(pageIndex + 7)}
        >
          next
        </button>
        <button
          className="border border-white p-2"
          onClick={() => setPageIndex(pageIndex - 7)}
        >
          back
        </button>
      </MainLayoutFlex>
    </div>
  );
};

export default WeightPagnation;
