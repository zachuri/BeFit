import React from 'react';
import { trpc } from '../../utils/trpc';
import ExerciseItemTracker from './ExerciseTrackerItem';

interface Props {
  exerciseId: string;
  id: string;
  date: string;
}

const ExerciseDayItem: React.FC<Props> = ({ exerciseId, id, date }) => {
  // Queries
  const { refetch } = trpc.useQuery([
    'exercisesDay.getAllExerciseDay',
    { exerciseId }
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

  return (
    <div className="w-full my-5 rounded border border-white">
      <div className="flex flex-row items-center justify-between mt-2">
        {errorRemove && <div>{errorRemove.message}</div>}

        {/* Will Display the current Date / able to remove */}
        <div className="">
          {/* <div className="p-2">Exercise ID: {exerciseId}</div>
          <div className="p-2">ExerciseDay ID: {id}</div> */}
          <div className="text-2xl text-left p-2">Date: {date}</div>
        </div>
        <div className="flex items-center justify-center">
          <button
            onClick={() => mutateRemove({ id: id })}
            className="rounded border border-white mr-4"
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
      </div>

      <ExerciseItemTracker exerciseDayId={id} />
    </div>
  );
};

export default ExerciseDayItem;
