import React from 'react'
import {Bar} from 'react-chartjs-2'
const qrscandata = {
  labels: [
    'Url',
    'Profile',
    'BusinessCARD',
    'Url',
    'Profile',
    'BusinessCARD',
    'Url',
    'Profile',
    'BusinessCARD',
    'Url',
    'Profile',
    'BusinessCARD',
    'Url',
    'Profile',
    'BusinessCARD',
    'Url',
    'Profile',
    'BusinessCARD',
  ],
  datasets: [
    {
      label: 'QRs',
      data: [1, 2, 3, 1, 20, 3, 1, 2, 3, 1, 2, 3, 1, 20, 3, 1, 2, 3],
      backgroundColor: 'red',
    },
  ],
}
const chartOptions = {
  scales: {
    y: {
      min: 0,

      stepSize: 10,
    },
  },
}
export default function QrsPerFunction() {
  return <Bar data={qrscandata} options={chartOptions} />
}
