import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import { MainLayoutFlex } from '../../components/layouts/Main';
import LoadingIcon from '../../components/LoadingIcon';
import SessionAuth from '../../components/SessionAuth';
import Item from '../../components/WorkoutItem/Item';
import { AddWorkoutInput } from '../../schema/workout.schema';
import { trpc } from '../../utils/trpc';

const Workouts: React.FC = () => {
  const { data, isLoading, refetch } = trpc.useQuery([
    'workouts.getAllWorkouts'
  ]);

  const {
    mutate,
    error,
    isLoading: isLoadingAddWorkout
  } = trpc.useMutation(['workouts.addWorkout'], {
    onSuccess() {
      setIsOpen(false);
      // reset the form
      reset();

      // able to refetch query
      // queryClient.refetchQueries('weights.getAllWeights');
      refetch();
    }
  });

  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  function onSubmit(values: AddWorkoutInput) {
    mutate(values);
  }

  const { handleSubmit, register, reset } = useForm<AddWorkoutInput>();

  return (
    <>
      <SessionAuth pageName="Workout Page">
        <MainLayoutFlex>
          <h2 className="text-4xl my-5 text-center">Workouts</h2>
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
            {data?.map(workout => {
              return (
                <div key={workout.id} className="w-96">
                  <Item id={workout.id} title={workout.title} />
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
                        Workout
                      </Dialog.Title>
                      <div className="mt-2">
                        <form onSubmit={handleSubmit(onSubmit)}>
                          <div className="mb-6">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                              Workout Name
                            </label>
                            <input
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder="Leg Day"
                              required
                              {...register('title')}
                            />
                          </div>
                          <div className="flex items-center justify-center">
                            <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                              Add Workout
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
      </SessionAuth>
    </>
  );
};

export default Workouts;
