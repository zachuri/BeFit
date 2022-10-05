import React from 'react';

interface Props {
  date: string;
  weight: number;
  description: string;
}

const Item: React.FC<Props> = ({ date, weight, description }) => {
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
          <button className="border border-black dark:border-white hover:border-[#00C804] hover:dark:border-[#00C804] p-1 rounded">
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
