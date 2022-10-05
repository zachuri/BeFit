import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import { UpdateWeightInput } from '../schema/weight.schema';
import { trpc } from '../utils/trpc';

interface Props {
  id: string;
  date: string;
  weight: number;
  description: string;
}

const Item: React.FC<Props> = ({ id, date, weight, description }) => {
  const { refetch } = trpc.useQuery(['weights.getAllWeights']);

  const { mutate: mutateRemove, error: errorRemove } = trpc.useMutation(
    ['weights.removeWeight'],
    {
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
    }
  );

  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const { handleSubmit, register, reset } = useForm<UpdateWeightInput>();

  const { mutate: mutateUpdate, error: errorUpdate } = trpc.useMutation(
    ['weights.updateWeight'],
    {
      // onSuccess({ id }) {
      // router.push(`/weight/${id}`);
      // router.push(`/weight`);
      onError() {
        errorUpdate;
      },

      onSuccess() {
        // reset teh form
        reset();

        // able to refetch query
        // queryClient.refetchQueries('weights.getAllWeights');
        refetch();
      }
    }
  );

  function onSubmit(values: UpdateWeightInput) {
    mutateUpdate(values);
  }

  return (
    <>
      <div className="rounded border border-black dark:border-white p-4">
        <div>
          Weight: {weight} <span className="text-xs">lbs</span>
        </div>
        <div className="text-xs">Description: {description}</div>
        <div className="text-xs">
          {/* Only get the date */}
          Date: {date.split(' ').slice(0, 4).join(' ')}
        </div>
        <div className="text-xs">
          Time: {date.split(' ').slice(-2).join(' ')}
        </div>
        <div className="mt-2 flex flex-row-reverse gap-2">
          <button
            onClick={() => mutateRemove({ id: id })}
            className="border border-black dark:border-white hover:border-[#00C804] hover:dark:border-[#00C804] p-1 rounded"
          >
            Remove
          </button>
          <button
            onClick={openModal}
            className="border border-black dark:border-white hover:border-[#00C804] hover:dark:border-[#00C804] p-1 rounded"
          >
            Edit
          </button>

          {/* modal transition */}
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
                        Please input new weight or descripton!
                      </Dialog.Title>
                      <div className="mt-2">
                        <form onSubmit={handleSubmit(onSubmit)}>
                          <div className="mb-6">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                              Current weight in lbs
                            </label>
                            {/* hidden input for getting the user id */}
                            <input
                              {...register('id', { value: id })}
                              type="hidden"
                            />
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
                              Update Weight
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
        </div>
      </div>
    </>
  );
};

export default Item;
