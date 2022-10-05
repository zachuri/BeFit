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
        <div>Weight: {weight}</div>
        <div className="text-xs">Date: {date}</div>
        <div className="text-xs">Description: {description}</div>
      </div>
    </>
  );
};

export default Item;
