// import Head from "next/head";
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { trpc } from '../utils/trpc';
import { CreateWeightInput } from '../schema/weight.schema';
// import { useEffect, useState } from "react";
// import { useSetState } from "@mantine/hooks";
// import { Weight } from "@prisma/client";
import { useQueryClient } from 'react-query';
import { useSession } from 'next-auth/react';
import Item from '../components/Item';

const Weight = () => {
  const { data: session } = useSession();

  const queryClient = useQueryClient();

  const { handleSubmit, register, reset } = useForm<CreateWeightInput>();

  // const [weights, setWeights] = useState<Weight[]>();

  const { data, isLoading } = trpc.useQuery(['weights.getAllWeights']);

  const router = useRouter();

  const { mutate, error } = trpc.useMutation(['weights.create-weight'], {
    onSuccess({ id }) {
      // router.push(`/weight/${id}`);
      router.push(`/weight`);
      reset();

      // able to refetch query
      queryClient.refetchQueries('weights.getAllWeights');
    }
  });

  function onSubmit(values: CreateWeightInput) {
    mutate(values);
  }

  return (
    <>
      <main className="container mx-auto flex flex-col items-center justify-center pt-20">
        {!session ? (
          <>
            <h1 className="text-5xl md:text-[5rem] leading-normal font-extrabold text-gray-700">
              Weight Tracker
            </h1>
            <p className="text-2xl text-gray-700">Please Sign in!</p>
          </>
        ) : (
          <>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Current weight in lbs
                </label>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="180lbs"
                  required
                  {...register('weightTotal')}
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
              <button className="mb-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Add Weight
              </button>
            </form>

            {/* <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
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
            </table> */}
            <div className="grid grid-cols text-xs md:text-base md:grid-cols-2 gap-3 mt-2">
              {data?.map(weight => {
                return (
                  <div key={weight.id}>
                    <Item
                      weight={weight.weightTotal}
                      date={weight.createdAt.toUTCString()}
                      description={weight.body}
                    />
                  </div>
                );
              })}
            </div>
          </>
        )}
      </main>
    </>
  );
};

export default Weight;
