import React from 'react';

interface Props {
  date: string;
  weight: string;
  description: string;
}

const Item: React.FC<Props> = ({ date, weight, description }) => {
  return (
    <>
      <div className="rounded-xl border border-black p-4">
        <div>Date: {date}</div>
        <div>Weight: {weight}</div>
        <div>Description: {description}</div>
      </div>
    </>
  );
};

export default Item;
