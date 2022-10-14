import React, { useEffect, useState } from 'react';
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

  // Use this query for pagination
  const [pageIndex, setPageIndex] = useState(0);
  const [disablePage, setDisablePage] = useState(false);

  const { data, isLoading, refetch } = trpc.useQuery([
    'weights.getAllWeightsPagnation',
    { take: 7, skip: pageIndex }
  ]);

  useEffect(() => {
    if (data?.length === 0) {
      setPageIndex(pageIndex - 7);
      setDisablePage(true);
    }
  }, [data, pageIndex]);

  const {
    mutate,
    error,
    isLoading: isLoadingAddWeights
  } = trpc.useMutation(['weights.addWeight'], {
    // onSuccess({ id }) {
    // router.push(`/weight/${id}`);
    // router.push(`/weight`);
    onSuccess() {
      // reset teh form
      reset();

      // able to refetch query
      // queryClient.refetchQueries('weights.getAllWeights');
      refetch();
    }
  });

  function onSubmit(values: AddWeightInput) {
    mutate(values);
  }

  if (status === 'loading' || isLoading === true) {
    return (
      <MainLayoutHeightScreen>
        <div className="flex flex-col text-center">
          <h1 className="text-2xl">...Loading</h1>
        </div>
      </MainLayoutHeightScreen>
    );
  }

  return (
    <>
      {status === 'authenticated' ? (
        <>
          {/* LayoutFlex for Mobile */}
          <MainLayoutFlex>
            {error && <MainLayoutFlex>{error.message}</MainLayoutFlex>}
            <div className="my-10 md:mx-40 p-3 rounded border border-black dark:border-white">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-6">
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
                <div className="mb-6">
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

            {/* Mobile Screen */}
            <div className="grid grid-cols md:grid-cols-2 gap-3 mt-2 w-full">
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
                        pageIndex={pageIndex}
                      />
                    </div>
                  );
                })}

                <div className="flex gap-2 items-center justify-center">
                  <button
                    className="border border-white p-2"
                    onClick={() => {
                      if (pageIndex - 7 < 0) {
                        setPageIndex(0);
                      } else {
                        setPageIndex(pageIndex - 7);
                        setDisablePage(false);
                      }
                    }}
                  >
                    new
                  </button>
                  <button
                    className="border border-white p-2"
                    onClick={() => setPageIndex(pageIndex + 7)}
                    disabled={disablePage}
                  >
                    old
                  </button>
                </div>
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
                        pageIndex={pageIndex}
                      />
                    );
                  })}
                </table>
              </div>
              <div className="mt-5 flex items-center justify-center gap-2">
                <button
                  className="hidden md:block border border-white p-2"
                  onClick={() => {
                    if (pageIndex - 7 < 0) {
                      setPageIndex(0);
                    } else {
                      setPageIndex(pageIndex - 7);
                      setDisablePage(false);
                    }
                  }}
                >
                  new
                </button>
                <button
                  className="hidden md:block border border-white p-2"
                  onClick={() => {
                    setPageIndex(pageIndex + 7);
                  }}
                  disabled={disablePage}
                >
                  old
                </button>
              </div>
            </div>
          </MainLayoutFlex>
        </>
      ) : (
        <>
          <MainLayoutHeightScreen>
            <div className="min-h-screen flex items-center justify-center -mt-10 md:-mt-20">
              <div className="flex flex-col text-center">
                <h1 className="text-4xl">Weight Tracker</h1>
                <p className="text-2xl text-gray-700">Please Sign in!</p>
              </div>
            </div>
          </MainLayoutHeightScreen>
        </>
      )}
    </>
  );
};

export default Weight;
