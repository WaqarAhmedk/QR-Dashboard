import React from 'react'
import {Bar} from 'react-chartjs-2'
const qrscandata = {
  labels: ['Pakitan', 'USA', 'UK', 'India'],
  datasets: [
    {
      label: 'title',
      data: [11, 22, 13, 1],
      backgroundColor: 'gray',
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
export default function TopCountryOfAdmins() {
  return <Bar data={qrscandata} options={chartOptions} />
}
