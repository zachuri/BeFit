import React from 'react';
import { trpc } from '../../utils/trpc';

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
      <div className="flex flex-row">
        <div className="mx-5">
          <div className="p-2">Exercise ID: {exerciseId}</div>
          <div className="p-2">ExerciseDay ID: {id}</div>
          <div className="p-2">Date: {date}</div>
        </div>
        <div className="flex items-center justify-center mx-5">
          <button
            onClick={() => mutateRemove({ id: id })}
            className="rounded p-1 border borer-white"
          >
            remove
          </button>
        </div>
      </div>
      {errorRemove && <div>{errorRemove.message}</div>}
    </div>
  );
};

export default Item;
