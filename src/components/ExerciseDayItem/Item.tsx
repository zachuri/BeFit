import React from 'react';

const Item: React.FC = () => {
  return (
    <div className="my-5 rounded border border-white">
      <div className="flex flex-row mx-5 items-center justify-between">
        <div className="p-2">Date</div>
      </div>
      <div className="m-5">
        <table className="table-fixed border border-white">
          <thead>
            <tr>
              <th className="w-20">Set</th>
              <th className="w-20">Reps</th>
              <th className="w-20">Weight</th>
              <th className="w-20"></th>
            </tr>
          </thead>
          <tbody className="text-center">
            <tr className="border-t">
              <td>1</td>
              <td>12</td>
              <td>120</td>
              <td>+ -</td>
            </tr>
            <tr>
              <td>2</td>
              <td>11</td>
              <td>110</td>
              <td>+ -</td>
            </tr>
            <tr>
              <td>3</td>
              <td>10</td>
              <td>120</td>
              <td>+ -</td>
            </tr>
            <tr>
              <td>4</td>
              <td>12</td>
              <td>200</td>
              <td>+ -</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="my-5 flex justify-center">
        <button className="border-2 px-5 rounded border-black dark:border-white hover:dark:border-gray-500 hover:border-gray-200 transition">
          +
        </button>
      </div>
    </div>
  );
};

export default Item;
