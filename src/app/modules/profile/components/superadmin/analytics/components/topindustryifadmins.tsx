import React from 'react'
import {Bar} from 'react-chartjs-2'
const qrscandata = {
  labels: ['IT', 'CONSTRUCTION', 'STUDENT', 'MEDICAL'],
  datasets: [
    {
      label: 'INDUSTRY',
      data: [11, 22, 13, 1],
      backgroundColor: 'brown',
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
export default function TopIndustryAdmins() {
  return <Bar data={qrscandata} options={chartOptions} />
}
