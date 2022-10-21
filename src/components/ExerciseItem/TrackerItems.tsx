import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useState } from 'react';
import { trpc } from '../../utils/trpc';

interface Props {
  exerciseDayId: string;
  id: string;
  set: number;
  rep: number;
  weight: number;
}

const TrackerItems: React.FC<Props> = ({
  exerciseDayId,
  id,
  set,
  rep,
  weight
}) => {
  const [isOpenRemove, setIsOpenRemove] = useState(false);

  const { data, isLoading, refetch } = trpc.useQuery([
    'exercisesTracker.getAllExerciseTracker',
    { exerciseDayId }
  ]);

  const {
    mutate: mutateRemove,
    error: errorRemove,
    isLoading: isLoadinRemove
  } = trpc.useMutation(['exercisesTracker.removeExerciseTracker'], {
    onError() {
      errorRemove;
    },
    onSuccess() {
      refetch();
    }
  });

  function closeModalRemove() {
    setIsOpenRemove(false);
  }

  function openModalRemove() {
    setIsOpenRemove(true);
  }

  return (
    <>
      <tbody>
        <tr className="text-center border-t border-black dark:border-white dark:border-t overflow-auto">
          <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {set}
          </td>
          <td>{rep}</td>
          <td>{weight}</td>
          <td>
            <div className="mx-2 flex flex-row gap-2">
              <button className="text-xs rounded border border-black dark:border-white dark:hover:border-blue-500 hover:border-blue-500 transition">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  />
                </svg>
              </button>
              <button
                onClick={openModalRemove}
                className="text-xs rounded border border-black dark:border-white dark:hover:border-[red] hover:border-[red]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </td>
        </tr>
      </tbody>

      {/* Modal Remove */}
      <Transition appear show={isOpenRemove} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModalRemove}>
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white border-2 border-black  dark:bg-black dark:border-2 dark:border-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 dark:text-white"
                  >
                    Are you sure you want to remove?
                  </Dialog.Title>
                  <div className="flex justify-center item-center mt-2">
                    <button
                      onClick={() => {
                        mutateRemove({ id: id });
                        setIsOpenRemove(false);
                      }}
                      className="border border-black dark:border-white hover:bg-[red] hover:border-white hover:dark:border-[red] p-2 rounded"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModalRemove}
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
};

export default TrackerItems;
