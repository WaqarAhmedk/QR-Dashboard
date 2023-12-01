import React from 'react'
import {Bar} from 'react-chartjs-2'
const qrscandata = {
  labels: ['Waqar', 'Ahmed', 'Ali', 'Usman'],
  datasets: [
    {
      label: 'Total Scans',
      data: [11, 22, 13, 1],
      backgroundColor: 'blue',
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
export default function TopActiveUsersByScan() {
  return <Bar data={qrscandata} options={chartOptions} />
}
