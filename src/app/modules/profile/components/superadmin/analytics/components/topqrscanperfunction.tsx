import React from 'react'
import {Bar} from 'react-chartjs-2'
const qrscandata = {
  labels: ['Url', 'Profile', 'BusinessCARD', 'Url', 'Profile'],
  datasets: [
    {
      label: 'title',
      data: [2, 3, 1, 20, 12],
      backgroundColor: 'yellow',
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
export default function TopQrsPerFunction() {
  return <Bar data={qrscandata} options={chartOptions} />
}
