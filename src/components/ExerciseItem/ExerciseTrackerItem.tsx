import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AddExerciseTrackerInput } from '../../schema/exerciseTracker.schema';
import { trpc } from '../../utils/trpc';
import TrackerItems from './TrackerItems';

interface Props {
  exerciseDayId: string;
}

const ExerciseTrackerItem: React.FC<Props> = ({ exerciseDayId }) => {
  // Query for adding weight

  const { data, isLoading, refetch } = trpc.useQuery([
    'exercisesTracker.getAllExerciseTracker',
    { exerciseDayId }
  ]);

  const {
    mutate,
    error,
    isLoading: isLoadingAddWeights
  } = trpc.useMutation(['exercisesTracker.addExerciseTracker'], {
    onSuccess() {
      // reset the form
      reset();

      // able to refetch query
      // queryClient.refetchQueries('weights.getAllWeights');
      refetch();
    }
  });

  const { handleSubmit, register, reset } = useForm<AddExerciseTrackerInput>();

  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  // On Sumbit mutate values of adding weight
  function onSubmit(values: AddExerciseTrackerInput) {
    mutate(values);
    setIsOpen(false);
  }

  function Modal() {
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
                      Add Set/Rep/Weight
                    </Dialog.Title>
                    <div className="mt-2">
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-5">
                          <input
                            {...register('exerciseDayId', {
                              value: exerciseDayId as string
                            })}
                            type="hidden"
                          />
                          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            Add current set
                          </label>
                          <input
                            type="number"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="1"
                            max={20}
                            required
                            // {...register('weightTotal')}
                            {...register('set', {
                              setValueAs: v => parseInt(v)
                            })}
                          />
                        </div>
                        <div className="mb-5">
                          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            Add total reps
                          </label>
                          <input
                            type="number"
                            step="1"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="12"
                            max={200}
                            required
                            // {...register('weightTotal')}
                            {...register('rep', {
                              setValueAs: v => parseInt(v)
                            })}
                          />
                        </div>
                        <div className="mb-5">
                          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            Add weight (lbs)
                          </label>
                          <input
                            type="number"
                            step="0.1"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="32.5"
                            max={1500}
                            required
                            // {...register('weightTotal')}
                            {...register('weight', {
                              setValueAs: v => parseFloat(v)
                            })}
                          />
                        </div>
                        <div className="flex items-center justify-center">
                          <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Add
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
    <div className="rounded">
      {/* <h1>Exercise Day Tracker Table</h1> */}
      <div>
        {error && <div>{error.message}</div>}

        {/* Display Table for viewport md > */}
        <div
          className="mx-5 hidden md:block rounded
          text-black bg-white border border-black  
          dark:bg-black dark:text-white dark:border-t dark:border-white overflow-auto"
        >
          <table className="table-fixed overflow-auto">
            <thead className="text-xs uppercase">
              <tr>
                <th className="w-1/3 py-3">Set</th>
                <th className="w-1/4 py-3">Reps</th>
                <th className="w-1/4 py-3">Weight</th>
                <th className="w-1/4 py-3">Update</th>
              </tr>
            </thead>
            {data?.map(items => {
              return (
                <TrackerItems
                  key={items.id}
                  exerciseDayId={exerciseDayId}
                  id={items.id}
                  set={items.set}
                  rep={items.rep}
                  weight={items.weight}
                />
              );
            })}
          </table>
        </div>

        <div className="flex items-center justify-center">
          <button
            onClick={() => openModal()}
            className="my-5 border-2 px-5 rounded border-black dark:border-white hover:dark:border-gray-500 hover:border-gray-200 transition"
          >
            +
          </button>
        </div>

        {/* Modal to add more sets/reps/weight */}
        <Modal />
      </div>
    </div>
  );
};

export default ExerciseTrackerItem;
