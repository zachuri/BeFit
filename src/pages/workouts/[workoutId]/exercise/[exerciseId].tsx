import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { MainLayoutFlex } from '../../../../components/layouts/Main';
import ExerciseDayItem from '../../../../components/ExerciseItem/ExerciseDayItem';
import { trpc } from '../../../../utils/trpc';
import { AddExerciseDayInput } from '../../../../schema/exerciseDay.schema';

const Sets = () => {
  const router = useRouter();
  const exerciseId = router.query.exerciseId as string;

  // Queries

  // Query for Pagination
  const [currentPageNumber, setCurrentPageNumber] = useState(0);
  const [resultsPerPage] = useState(4);

  const { data, isLoading, refetch } = trpc.useQuery([
    'exercisesDay.getAllExerciseDayPagination',
    {
      id: exerciseId,
      take: resultsPerPage,
      skip: resultsPerPage * currentPageNumber
    }
  ]);

  // Query for getting the total pages
  const { data: queryLength, isLoading: queryLengthIsLoading } = trpc.useQuery([
    'exercisesDay.getQueryLength',
    { id: exerciseId }
  ]);

  const totalPage = Math.floor(
    ((queryLength as number) + resultsPerPage - 1) / resultsPerPage
  );

  // functions for pagination (newer/older)
  function newer() {
    currentPageNumber - 1 < 0
      ? setCurrentPageNumber(0)
      : setCurrentPageNumber(currentPageNumber - 1);
  }

  function older() {
    currentPageNumber + 1 === totalPage
      ? currentPageNumber
      : setCurrentPageNumber(currentPageNumber + 1);
  }

  // const { data, isLoading, refetch } = trpc.useQuery([
  //   'exercisesDay.getAllExerciseDay',
  //   { exerciseId }
  // ]);

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
      <div className="my-5 flex flex-col">
        <div className="flex flex-col">
          <div className="flex flex-row gap-2 items-center">
            <button
              className="rounded p-1 border border-white hover:dark:border-gray-600 transition"
              onClick={() => {
            // nextRouter.push({pathname: `/workouts/${id}`, query: {workoutName: title}});
                router.push({pathname: `/workouts/${router.query.workoutId}`, query: {workoutName: router.query.workoutName}});
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
            <h2 className="text-gray-600">
              Workout/
              {' ' + router.query.workoutName}
            </h2>
          </div>

          <h1 className="text-2xl md:text-4xl text-center">
            <span className="text-lg md:text-2xl text-gray-600">
              Exercise/{' '}
            </span>
            {router.query.exerciseName}
          </h1>
        </div>
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
              resultsPerPage={resultsPerPage}
              currentPageNumber={currentPageNumber}
            />
          );
        })}
      </div>

      {/* Pagination Items */}
      <div className="my-5 flex items-center justify-center gap-2">
        <button
          className="rounded border border-black dark:border-white p-2"
          onClick={() => {
            newer();
          }}
        >
          newer
        </button>

        <h1>
          {currentPageNumber + 1}
          <span className="text-xs text-gray-600 dark:text-gray-400">
            {' '}
            {queryLengthIsLoading ? (
              <div>...Loading</div>
            ) : (
              <>... {totalPage === 0 ? 1 : totalPage}</>
            )}
          </span>
        </h1>

        <button
          className="rounded border border-black dark:border-white p-2"
          onClick={() => older()}
        >
          older
        </button>
      </div>
    </MainLayoutFlex>
  );
};

export default Sets;
