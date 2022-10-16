import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

import { Line } from 'react-chartjs-2';

export const options = {
  responsive: true,
  plugins: {
    legend: {
      // position: 'top' as const
      display: false
    },
    hover: {
      intersect: false
    },
    elements: {
      line: {
        tension: 0
      },
      point: {
        radius: 0
      }
    },
    title: {
      display: false
      // text: 'Chart.js Line Chart'
    },
    maintainAspectRatio: false,
    tooltips: {
      mode: 'index',
      intersect: false,
      callbacks: {}
    },
    scales: {
      xAxes: [
        {
          display: false //this will remove all the x-axis grid lines
        }
      ]
    }
  }
};

const labels = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
];

export const data = {
  labels,
  datasets: [
    {
      label: 'Users Progress',
      data: [33, 25, 35, 51, 54, 76, 72, 23, 23, 12, 12, 23, 32, 33, 25, 35, 51, 54, 76, 72, 23, 23, 12, 12, 23], 
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      borderWidth: 2,
      pointBorderColor: 'rgba(0, 0, 0, 0)',
      pointBackgroundColor: 'rgba(0, 0, 0, 0)',
      pointHoverBackgroundColor: '#5AC53B',
      pointHoverBorderColor: '#000000',
      pointHoverBorderWidth: 4,
      pointHoverRadius: 6
    }
  ]
};

const LineGraph = () => {
  return <Line options={options} data={data} />;
};

export default LineGraph;
