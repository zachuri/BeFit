import React from 'react';
import { useForm } from 'react-hook-form';
import { trpc } from '../utils/trpc';
import { AddWeightInput } from '../schema/weight.schema';
// import { useQueryClient } from 'react-query';
import { useSession } from 'next-auth/react';
import Item from '../components/Item';
import {
  MainLayoutFill,
  MainLayoutFlex,
  MainLayoutHeightScreen
} from '../components/layouts/Main';

const Weight: React.FC = () => {
  const { status } = useSession();

  // const queryClient = useQueryClient();

  const { handleSubmit, register, reset } = useForm<AddWeightInput>();

  const { data, isLoading, refetch } = trpc.useQuery(['weights.getAllWeights']);

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
          <MainLayoutFill>
            {error && <MainLayoutFlex>{error.message}</MainLayoutFlex>}
            <div className="my-5 p-3 rounded border border-white">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-6">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Current weight in lbs
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
                    placeholder="Your post title"
                    {...register('body')}
                  />
                </div>
                <div className="flex items-center justify-center">
                  <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
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
            <div className="grid grid-cols md:grid-cols-2 gap-3 mt-2">
              {data?.map(weight => {
                return (
                  <div key={weight.id}>
                    <Item
                      id={weight.id}
                      weight={weight.weightTotal}
                      date={weight.createdAt.toLocaleString()}
                      description={weight.body}
                    />
                  </div>
                );
              })}
            </div>
          </MainLayoutFill>
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

{
  /* <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
    <tr>
      <th scope="col" className="py-3 px-6">
        Date
      </th>
      <th scope="col" className="py-3 px-6">
        Weight
      </th>
      <th scope="col" className="py-3 px-6">
        Description/Image
      </th>
    </tr>
  </thead>

  <tbody>
    {data?.map((weight) => {
      return (
        <tr
          key={weight.id}
          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
        >
          <th
            scope="row"
            className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            {weight.createdAt.toUTCString()}
          </th>
          <td className="py-4 px-6">
            {weight.weightTotal}
          </td>
          <td className="py-4 px-6">{weight.body}</td>
        </tr>
      );
    })}
  </tbody>
</table> */
}
