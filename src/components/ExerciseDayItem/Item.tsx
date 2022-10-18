import React from 'react';
import { trpc } from '../../utils/trpc';
import ItemTracker from '../../components/ExerciseTrackerItem/Item';

interface Props {
  exerciseId: string;
  id: string;
  date: string;
}

const Item: React.FC<Props> = ({ exerciseId, id, date }) => {
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
    <div className="my-5 rounded border border-white">
      <div className="flex flex-row justify-between">
        {errorRemove && <div>{errorRemove.message}</div>}

        {/* Will Display the current Date / able to remove */}
        <div className="">
          {/* <div className="p-2">Exercise ID: {exerciseId}</div>
          <div className="p-2">ExerciseDay ID: {id}</div> */}
          <div className="text-left p-2">Date: {date}</div>
        </div>
        <div className="flex items-center justify-center">
          <button
            onClick={() => mutateRemove({ id: id })}
            className="rounded p-1 border borer-white"
          >
            remove
          </button>
        </div>
      </div>

      <ItemTracker />
    </div>
  );
};

export default Item;
