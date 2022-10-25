import { Dialog, Transition } from '@headlessui/react';
import { Result } from 'postcss';
import React, { Fragment, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { MainLayoutFlex } from '../components/layouts/Main';
import { AddWeightInput } from '../schema/weight.schema';
import { trpc } from '../utils/trpc';

const WeightPagnation: React.FC = () => {
  const { handleSubmit, register, reset } = useForm<AddWeightInput>();
  const [currentPageNumber, setCurrentPageNumber] = useState(0);
  const [resultsPerPage] = useState(7);

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
    setIsOpen(false);
  }

  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  function ModalAdd() {
    return (
      <>
        {/* Modal Add */}
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={closeModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl border-2 bg-white  border-black  dark:bg-black dark:border-2 dark:border-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900 dark:text-white"
                    >
                      Add a weight
                    </Dialog.Title>
                    <div className="mt-2">
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
                      </form>
                    </div>

                    <div className="mt-4">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={closeModal}
                      >
                        Cancel
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </>
    );
  }

  return (
    <div>
      <MainLayoutFlex>
        <h2>Pagnation</h2>
        <div className="my-5 flex justify-center">
          <button
            onClick={openModal}
            className="border px-12 rounded border-black dark:border-white hover:dark:border-gray-500 hover:border-gray-200 transition"
          >
            +
          </button>
        </div>

        <ModalAdd />

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
        <div className="flex gap-2 items-center ">
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
          <h1>
            {currentPageNumber + 1} ...{' '}
            <span className="text-xs text-gray-600">{totalPage}</span>
          </h1>
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
