import { useRouter } from 'next/router';
import React from 'react';
import { MainLayoutFlex } from '../../../../components/layouts/Main';
import ExerciseDayItem from '../../../../components/ExerciseItem/ExerciseDayItem';
import { trpc } from '../../../../utils/trpc';
import { AddExerciseDayInput } from '../../../../schema/exerciseDay.schema';

const Sets = () => {
  const router = useRouter();
  const exerciseId = router.query.exerciseId as string;

  // Queries
  const { data, isLoading, refetch } = trpc.useQuery([
    'exercisesDay.getAllExerciseDay',
    { exerciseId }
  ]);

  const {
    mutate,
    error,
    isLoading: isLoadingAddWorkout
  } = trpc.useMutation(['exercisesDay.addExerciseDay'], {
    onSuccess() {
      // reset the form
      // reset();

      // able to refetch query
      // queryClient.refetchQueries('weights.getAllWeights');
      refetch();
    }
  });

  function onSubmit(values: AddExerciseDayInput) {
    mutate(values);
  }

  return (
    <MainLayoutFlex>
      <div className="my-5 flex flex-col items-center justify-center">
        <h1 className="text-4xl">
          <span className="text-lg text-gray-600">
            {router.query.workoutName + '/ '}
          </span>
          <span className="text-2xl text-gray-600">Exercise/ </span>
          {router.query.exerciseName}
        </h1>
        {/* <h1>This is: {exerciseId}</h1> */}
      </div>
      <div className="flex justify-center">
        <button
          onClick={() => onSubmit({ exerciseId: exerciseId })}
          className="mb-5 border-2 px-10 rounded border-black dark:border-white hover:dark:border-gray-500 hover:border-gray-200 transition"
        >
          +
        </button>
      </div>
      <div className="flex flex-wrap gap-2 justify-center">
        {data?.map(exerciseDay => {
          return (
            <ExerciseDayItem
              key={exerciseDay.id}
              exerciseId={exerciseId}
              id={exerciseDay.id}
              date={exerciseDay.createdAt.toLocaleDateString()}
            />
          );
        })}
      </div>
    </MainLayoutFlex>
  );
};

export default Sets;
