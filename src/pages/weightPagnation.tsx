import { Result } from 'postcss';
import React, { useEffect, useState } from 'react';
import { MainLayoutFlex } from '../components/layouts/Main';
import { trpc } from '../utils/trpc';

const WeightPagnation: React.FC = () => {
  const [currentPageNumber, setCurrentPageNumber] = useState(0);
  const [resultsPerPage, setResultsPerPage] = useState(7);

  const { data: queryLength } = trpc.useQuery(['weights.getAllWeightsLength']);

  const totalPage = Math.floor(
    ((queryLength as number) + resultsPerPage - 1) / resultsPerPage
  );

  console.log('Total Page ' + totalPage);

  const { data, isLoading, refetch } = trpc.useQuery([
    'weights.getAllWeightsPagnation',
    { take: resultsPerPage, skip: resultsPerPage * currentPageNumber }
  ]);

  console.log(currentPageNumber);

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
              currentPageNumber - 1 < 0
                ? setCurrentPageNumber(0)
                : setCurrentPageNumber(currentPageNumber - 1);
            }}
          >
            newer
          </button>
          <button
            className="border border-white p-2"
            onClick={() => {
              currentPageNumber + 1 === totalPage
                ? currentPageNumber
                : setCurrentPageNumber(currentPageNumber + 1);
            }}
          >
            older
          </button>
        </div>
      </MainLayoutFlex>
    </div>
  );
};

export default WeightPagnation;
