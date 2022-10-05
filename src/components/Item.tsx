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
      </div>
    </>
  );
};

export default Item;
