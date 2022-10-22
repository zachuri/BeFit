import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useState } from 'react';
import { trpc } from '../../utils/trpc';
import ExerciseItemTracker from './ExerciseTrackerItem';

interface Props {
  exerciseId: string;
  id: string;
  date: string;
  resultsPerPage: number;
  currentPageNumber: number;
}

const ExerciseDayItem: React.FC<Props> = ({
  exerciseId,
  id,
  date,
  resultsPerPage,
  currentPageNumber
}) => {
  // Queries
  // const { refetch } = trpc.useQuery([
  //   'exercisesDay.getAllExerciseDay',
  //   { exerciseId }
  // ]);

  const { refetch } = trpc.useQuery([
    'exercisesDay.getAllExerciseDayPagination',
    {
      id: exerciseId,
      take: resultsPerPage,
      skip: resultsPerPage * currentPageNumber
    }
  ]);

  const {
    mutate: mutateRemove,
    error: errorRemove,
    isLoading: isLoadinRemove
  } = trpc.useMutation(['exercisesDay.removeExerciseDay'], {
    // onSuccess({ id }) {
    // router.push(`/weight/${id}`);
    // router.push(`/weight`);

    onError() {
      errorRemove;
    },

    onSuccess() {
      // reset teh form
      // able to refetch query
      // queryClient.refetchQueries('weights.getAllWeights');
      refetch();
    }
  });

  const [isOpenRemove, setIsOpenRemove] = useState(false);
  const [inputRemove, setInputRemove] = useState('');
  const [errorRemoveInput, setErrorRemoveInput] = useState(false);

  return (
    <div className="mb-5 w-full rounded border border-black dark:border-white">
      <div className="m-5 flex flex-row items-center justify-between">
        {errorRemove && <div>{errorRemove.message}</div>}

        {/* Will Display the current Date / able to remove */}
        <div className="">
          {/* <div className="p-2">Exercise ID: {exerciseId}</div>
          <div className="p-2">ExerciseDay ID: {id}</div> */}
          <p className="text-2xl text-left">Date: {date}</p>
        </div>
        <div className="flex items-center justify-centerh">
          <button
            onClick={() => {
              setIsOpenRemove(true);
            }}
            className="rounded border border-white hover:border-[red] transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      <ExerciseItemTracker exerciseDayId={id} />

      {/*  Modal for Remove */}
      <Transition appear show={isOpenRemove} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => {
            setIsOpenRemove(false);
          }}
        >
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white border border-black  dark:bg-black dark:border dark:border-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 dark:text-white"
                  >
                    Are you sure you want to remove?
                  </Dialog.Title>
                  <h3 className="text-center mt-4 text-xs dark:text-gray-100">
                    Please type{' '}
                    <span className="text-gray-500">&quot;{date}&quot;</span> to{' '}
                    <span className="text-red-500">delete forever</span>
                  </h3>
                  <div className="flex justify-center item-center my-4">
                    <input
                      type="text"
                      placeholder={date}
                      className="rounded p-2 mr-2 border border-black dark:border-white"
                      onChange={e => {
                        setInputRemove(e.target.value);
                      }}
                    />
                    <button
                      onClick={() => {
                        if (inputRemove === date) {
                          mutateRemove({ id: id });
                          setIsOpenRemove(false);
                        }
                        setErrorRemoveInput(true);
                      }}
                      className="border border-black dark:border-white hover:bg-[red] hover:border-white hover:dark:border-[red] p-2 rounded"
                    >
                      Remove
                    </button>
                  </div>
                  <h2 className="text-center text-xs text-red-500">
                    WARNING: All your sets and reps will be wiped
                  </h2>

                  {errorRemoveInput && (
                    <div>
                      Wrong name! Please input
                      <span className="text-gray-500">
                        &quot;{date}&quot;
                      </span>{' '}
                      remove
                    </div>
                  )}

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => {
                        setIsOpenRemove(false);
                        setErrorRemoveInput(false);
                      }}
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
    </div>
  );
};

export default ExerciseDayItem;
