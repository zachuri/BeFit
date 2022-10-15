import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { trpc } from '../utils/trpc';
import { AddWeightInput } from '../schema/weight.schema';
// import { useQueryClient } from 'react-query';
import { useSession } from 'next-auth/react';
import ItemCard from '../components/WeightItem/ItemCard';
import ItemTable from '../components/WeightItem/ItemTable';
import {
  // MainLayoutFill,
  MainLayoutFlex,
  MainLayoutHeightScreen
} from '../components/layouts/Main';

const Weight: React.FC = () => {
  const { status } = useSession();

  const { handleSubmit, register, reset } = useForm<AddWeightInput>();

  // const { data, isLoading, refetch } = trpc.useQuery(['weights.getAllWeights']);

  // Query for Pagination
  const [currentPageNumber, setCurrentPageNumber] = useState(0);
  const [resultsPerPage] = useState(7);

  const { data, isLoading, refetch } = trpc.useQuery([
    'weights.getAllWeightsPagnation',
    { take: resultsPerPage, skip: resultsPerPage * currentPageNumber }
  ]);

  // Query for getting the total pages
  const { data: queryLength } = trpc.useQuery(['weights.getAllWeightsLength']);

  const totalPage = Math.floor(
    ((queryLength as number) + resultsPerPage - 1) / resultsPerPage
  );

  // functions for pagination (newer/older)
  function newer() {
    currentPageNumber - 1 < 0
      ? setCurrentPageNumber(0)
      : setCurrentPageNumber(currentPageNumber - 1);
  }

  function older() {
    currentPageNumber + 1 === totalPage
      ? currentPageNumber
      : setCurrentPageNumber(currentPageNumber + 1);
  }

  // Query for adding weight
  const {
    mutate,
    error,
    isLoading: isLoadingAddWeights
  } = trpc.useMutation(['weights.addWeight'], {
    onSuccess() {
      // reset the form
      reset();

      // able to refetch query
      // queryClient.refetchQueries('weights.getAllWeights');
      refetch();
    }
  });

  // On Sumbit mutate values of adding weight
  function onSubmit(values: AddWeightInput) {
    mutate(values);
  }

  return (
    <>
      {status === 'unauthenticated' ? (
        <>
          <MainLayoutHeightScreen>
            <div className="min-h-screen flex items-center justify-center -mt-10 md:-mt-20">
              <div className="flex flex-col text-center">
                <h1 className="text-4xl">Weight Page</h1>
                <p className="text-2xl text-gray-700">Please Sign in!</p>
              </div>
            </div>
          </MainLayoutHeightScreen>
        </>
      ) : status === 'loading' && isLoading === true ? (
        <MainLayoutHeightScreen>
          <div className="flex flex-col text-center">
            <h1 className="text-2xl">...Loading</h1>
          </div>
        </MainLayoutHeightScreen>
      ) : (
        <>
          {/* LayoutFlex for Mobile */}
          <MainLayoutFlex>
            {error && <MainLayoutFlex>{error.message}</MainLayoutFlex>}
            <div className="my-5 md:mx-40 p-3 rounded border border-black dark:border-white">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-5">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Add current weight (lbs)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="180.4"
                    required
                    // {...register('weightTotal')}
                    {...register('weightTotal', {
                      setValueAs: v => parseFloat(v)
                    })}
                  />
                </div>
                <div className="mb-5">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Description
                  </label>
                  <textarea
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="I feel great!"
                    required
                    maxLength={35}
                    {...register('body')}
                  />
                </div>
                <div className="flex items-center justify-center">
                  <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Add Weight
                  </button>
                </div>
                {isLoadingAddWeights && (
                  <div className="flex justify-center mt-2 items-center text-xs">
                    Adding your weight...
                  </div>
                )}
              </form>
            </div>

            <div className="mt-10 mb-5 flex gap-2 items-center justify-center md:hidden">
              <button
                className="border border-white p-2"
                onClick={() => newer()}
              >
                newer
              </button>

              <h1>
                {currentPageNumber + 1}
                <span className="text-xs text-gray-600"> ... {totalPage}</span>
              </h1>

              <button
                className="border border-white p-2"
                onClick={() => older()}
              >
                old
              </button>
            </div>

            {/* Mobile Screen */}
            <div className="grid grid-cols md:grid-cols-2 gap-3 w-full">
              {/* hidden on larger screens */}
              <div className="md:hidden">
                {data?.map(weight => {
                  return (
                    <div key={weight.id}>
                      <ItemCard
                        id={weight.id}
                        weight={weight.weightTotal}
                        date={weight.createdAt.toLocaleString()} //toLocaleDateString -> for just the date no time
                        day={weight.createdAt.getUTCDay()}
                        description={weight.body}
                        resultsPerPage={resultsPerPage}
                        currentPageNumber={currentPageNumber}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </MainLayoutFlex>

          {/* LayoutFill for Desktop */}
          <MainLayoutFlex>
            {/* Desktop Screens -> will show a table */}
            <div className="-mt-20">
              {/* visible on md and up */}
              <div
                className="hidden md:block rounded
                    text-black bg-white border border-black  
                    dark:bg-black dark:text-white dark:border-t dark:border-white overflow-auto"
              >
                <table className="table-fixed overflow-auto ">
                  <thead className="text-xs uppercase">
                    <tr>
                      <th className="w-1/2 py-3">Date</th>
                      <th className="w-1/4 py-3">Weight</th>
                      <th className="w-1/2 py-3">Description/Image</th>
                      <th className="w-1/4 py-3">Update</th>
                    </tr>
                  </thead>
                  {data?.map(weight => {
                    return (
                      <ItemTable
                        key={weight.id}
                        id={weight.id}
                        weight={weight.weightTotal}
                        date={weight.createdAt.toLocaleString()} //toLocaleDateString -> for just the date no time
                        day={weight.createdAt.getUTCDay()}
                        description={weight.body}
                        resultsPerPage={resultsPerPage}
                        currentPageNumber={currentPageNumber}
                      />
                    );
                  })}
                </table>
              </div>
              <div className="my-5 flex items-center justify-center gap-2">
                <button
                  className="hidden md:block border border-white p-2"
                  onClick={() => {
                    newer();
                  }}
                >
                  newer
                </button>

                <h1 className="hidden md:block">
                  {currentPageNumber + 1}
                  <span className="text-xs text-gray-600">
                    {' '}
                    ... {totalPage}
                  </span>
                </h1>

                <button
                  className="hidden md:block border border-white p-2"
                  onClick={() => older()}
                >
                  older
                </button>
              </div>
            </div>
          </MainLayoutFlex>
        </>
      )}
    </>
  );
};

export default Weight;
