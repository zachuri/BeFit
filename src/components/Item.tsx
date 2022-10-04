import React from 'react';

interface Props {
  date: string;
  weight: string;
  description: string;
}

const Item: React.FC<Props> = ({ date, weight, description }) => {
  return (
    <>
      <div className="rounded border border-black dark:border-white p-4">
        <div>Date: {date}</div>
        <div>Weight: {weight}</div>
        <div>Description: {description}</div>
      </div>
    </>
  );
};

export default Item;
