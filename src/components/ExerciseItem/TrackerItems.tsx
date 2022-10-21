import React from 'react';

interface Props {
  id: string;
  set: number;
  rep: number;
  weight: number;
}

const TrackerItems: React.FC<Props> = ({ id, set, rep, weight }) => {
  return (
    <tbody>
      <tr className="text-center border-t border-black dark:border-white dark:border-t overflow-auto">
        <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
          {set}
        </td>
        <td>{rep}</td>
        <td>{weight}</td>
        <td>
          <div className="mx-2 flex flex-row gap-2">
            <button className="text-xs rounded p-1 border border-black dark:border-white dark:hover:border-blue-500 hover:border-blue-500 transition">
              Edit
            </button>
            <button className="text-xs rounded p-1 border border-black dark:border-white dark:hover:border-[red] hover:border-[red]">
              Remove
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  );
};

export default TrackerItems;
