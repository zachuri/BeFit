import { Dialog, Transition } from '@headlessui/react';
import { useRouter } from 'next/router';
import React, { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import { UpdateWorkoutInput } from '../../schema/workout.schema';
import { trpc } from '../../utils/trpc';

interface Props {
  id: string;
  title: string;
}

const Item: React.FC<Props> = ({ id, title }) => {
  const [inputRemove, setInputRemove] = useState('');
  const [errorRemoveInput, setErrorRemoveInput] = useState(false);

  const nextRouter = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenRemove, setIsOpenRemove] = useState(false);

  const { handleSubmit, register, reset } = useForm<UpdateWorkoutInput>();

  const { refetch } = trpc.useQuery(['workouts.getAllWorkouts']);

  const {
    mutate: mutateRemove,
    error: errorRemove,
    isLoading: isLoadingRemove
  } = trpc.useMutation(['workouts.removeWorkout'], {
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

  const {
    mutate: mutateUpdate,
    error: errorUpdate,
    isLoading: isLoadingUpdate
  } = trpc.useMutation(['workouts.updateWorkout'], {
    // onSuccess({ id }) {
    // router.push(`/weight/${id}`);
    // router.push(`/weight`);
    onError() {
      errorUpdate;
      // Open modal again on error
      setIsOpen(true);
    },

    onSuccess() {
      // reset teh form
      reset();

      // able to refetch query
      // queryClient.refetchQueries('weights.getAllWeights');
      refetch();
    }
  });

  function onSubmit(values: UpdateWorkoutInput) {
    mutateUpdate(values);
    setIsOpen(false);
  }
  return (
    <>
      {isLoadingUpdate && <div>Updating...</div>}
      {isLoadingRemove && <div>Removing...</div>}
      <div className="grid grid-cols-4 rounded text-center justify-between border border-black dark:border-white my-5">
        <button
          onClick={() => {
            nextRouter.push(`/workouts/${id}`);
          }}
          className="my-2 p-4 col-span-2"
        >
          <p className=" hover:dark:text-gray-600 hover:text-gray-500 ">
            {title}
          </p>
        </button>
        <button
          onClick={() => setIsOpen(true)}
          className="text-xs border-l border-black dark:border-white hover:dark:text-gray-600 hover:text-gray-500 transition"
        >
          Edit
        </button>
        <button
          onClick={() => setIsOpenRemove(true)}
          className="text-xs border-l border-black dark:border-white hover:dark:text-gray-600 hover:text-gray-500 transition"
        >
          Remove
        </button>

        {/*  Modal for Remove */}
        <Transition appear show={isOpenRemove} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            onClose={() => {
              setIsOpen(false);
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
                    <h3 className="mt-4 text-sm text-gray-100">
                      Please type{' '}
                      <span className="text-gray-500">&quot;{title}&quot;</span>{' '}
                      to <span className="text-red-500">REMOVE FOREVER</span>
                    </h3>
                    <div className="flex justify-center item-center my-4">
                      <input
                        type="text"
                        placeholder={title}
                        className="rounded p-2 mr-2"
                        onChange={e => {
                          setInputRemove(e.target.value);
                        }}
                      />
                      <button
                        onClick={() => {
                          if (inputRemove === title) {
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
                    <h2 className="text-xs text-red-500">
                      All your sets and reps will be wiped
                    </h2>

                    {errorRemoveInput && (
                      <div>
                        Wrong name! Please input
                        <span className="text-gray-500">
                          &quot;{title}&quot;
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

        {/* Modal Update */}
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            onClose={() => {
              setIsOpen(false);
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
                    {errorUpdate && <div>{errorUpdate.message}</div>}
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900 dark:text-white"
                    >
                      Edit
                    </Dialog.Title>
                    <div className="mt-2">
                      <div className="mt-2">
                        <form onSubmit={handleSubmit(onSubmit)}>
                          <div className="mb-6">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                              Please input new workout name
                            </label>

                            {/* hidden input for getting the user id */}
                            <input
                              {...register('id', { value: id })}
                              type="hidden"
                            />
                            <input
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder="Leg Day"
                              required
                              {...register('title')}
                            />
                          </div>
                          <div className="flex items-center justify-center">
                            <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                              Update Workout
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>

                    <div className="mt-4">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={() => {
                          setIsOpen(false);
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
    </>
  );
};

export default Item;
