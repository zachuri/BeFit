import React from 'react';
import { RemoveWeightInput } from '../schema/weight.schema';
import { trpc } from '../utils/trpc';

interface Props {
  id: RemoveWeightInput;
  date: string;
  weight: number;
  description: string;
}

const Item: React.FC<Props> = ({ id, date, weight, description }) => {
  const { refetch } = trpc.useQuery(['weights.getAllWeights']);

  const { mutate, error } = trpc.useMutation(['weights.removeWeight'], {
    // onSuccess({ id }) {
    // router.push(`/weight/${id}`);
    // router.push(`/weight`);

    onError() {
      error;
    },

    onSuccess() {
      // reset teh form
      // able to refetch query
      // queryClient.refetchQueries('weights.getAllWeights');
      refetch();
    }
  });

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
            onClick={() => mutate(id)}
            className="border border-black dark:border-white hover:border-[#00C804] hover:dark:border-[#00C804] p-1 rounded"
          >
            Remove
          </button>
          <button className="border border-black dark:border-white hover:border-[#00C804] hover:dark:border-[#00C804] p-1 rounded">
            Edit
          </button>
        </div>
      </div>
    </>
  );
};

export default Item;
