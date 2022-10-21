import React from 'react';

interface Props {
  id: string;
  set: number;
  rep: number;
  weight: number;
}

const TrackerItems: React.FC<Props> = ({ id, set, rep, weight }) => {
  return (
    <div className="my-5" key={id}>
      <p>Set: {set}</p>
      <p>Rep: {rep}</p>
      <p>Weight: {weight}</p>
    </div>
  );
};

export default TrackerItems;
