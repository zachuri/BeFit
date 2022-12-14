import { Dialog, Transition } from '@headlessui/react';
import { useRouter } from 'next/router';
import React, { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import Item from '../../../components/ExerciseItem/Item';
import { MainLayoutFlex } from '../../../components/layouts/Main';
import LoadingIcon from '../../../components/LoadingIcon';
import SessionAuth from '../../../components/SessionAuth';
import { AddExerciseInput } from '../../../schema/exercise.schema';
import { trpc } from '../../../utils/trpc';

const Exercises = () => {
  const router = useRouter();
  const workoutId = router.query.workoutId as string;

  const { handleSubmit, register, reset } = useForm<AddExerciseInput>();

  const [isOpen, setIsOpen] = useState(false);

  // Queries
  const { data, isLoading, refetch } = trpc.useQuery([
    'exercises.getAllExercises',
    { workoutId }
  ]);

  const {
    mutate,
    error,
    isLoading: isLoadingAddWorkout
  } = trpc.useMutation(['exercises.addExercise'], {
    onSuccess() {
      setIsOpen(false);
      // reset the form
      reset();

      // able to refetch query
      // queryClient.refetchQueries('weights.getAllWeights');
      refetch();
    }
  });

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  function onSubmit(values: AddExerciseInput) {
    mutate(values);
  }

  return (
    <>
      <SessionAuth pageName="Workout Page">
        <>
          <MainLayoutFlex>
            <button
              className="mt-5 rounded p-1 border border-black dark:border-white hover:border-gray-200 hover:dark:border-gray-600 transition"
              onClick={() => {
                router.push(`/workouts`);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
                />
              </svg>
            </button>

            <div className="mb-5 flex flex-col items-center justify-center">
              <h2 className="text-4xl">
                <span className="text-2xl text-gray-600">Workout/ </span>
                {router.query.workoutName}
              </h2>
              {/* <h1>This is: {workoutId}</h1> */}
            </div>

            {/* Loading  */}
            {isLoading && (
              <div>
                <LoadingIcon />
              </div>
            )}
            {isLoadingAddWorkout && (
              <div className="flex justify-center">Adding Workout... </div>
            )}

            <div className="flex items-center justify-center">
              <button
                onClick={openModal}
                className="border-2 px-10 rounded border-black dark:border-white hover:dark:border-gray-500 hover:border-gray-200 transition"
              >
                +
              </button>
            </div>
            <div className="flex flex-col justify-center items-center">
              {data?.map(exercise => {
                return (
                  <div key={exercise.id} className="w-96">
                    <Item
                      workoutName={router.query.workoutName as string}
                      workoutId={workoutId}
                      id={exercise.id}
                      title={exercise.title}
                    />
                  </div>
                );
              })}
            </div>

            {/* Modal Adding Workouts */}
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
                      <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white border border-black  dark:bg-black dark:border dark:border-white p-6 text-left align-middle shadow-xl transition-all">
                        <Dialog.Title
                          as="h3"
                          className="text-lg font-medium leading-6 text-gray-900 dark:text-white"
                        >
                          Exercise
                        </Dialog.Title>
                        <div className="mt-2">
                          <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-6">
                              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                Exercise Name
                              </label>
                              <input
                                {...register('workoutId', { value: workoutId })}
                                type="hidden"
                              />
                              <input
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Barbell Squats"
                                required
                                {...register('title')}
                              />
                            </div>
                            <div className="flex items-center justify-center">
                              <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Add Exercise
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

                        {/* Error  */}
                        {error && <div>{error.message}</div>}
                      </Dialog.Panel>
                    </Transition.Child>
                  </div>
                </div>
              </Dialog>
            </Transition>
          </MainLayoutFlex>
        </>
      </SessionAuth>
    </>
  );
};
export default Exercises;
