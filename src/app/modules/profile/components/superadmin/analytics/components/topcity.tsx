import React from 'react'
import {Bar} from 'react-chartjs-2'
const qrscandata = {
  labels: ['Islamabad', 'Lahore', 'Rawalpindi', 'Karachi'],
  datasets: [
    {
      label: 'title',
      data: [11, 22, 13, 1],
      backgroundColor: 'pink',
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
export default function TopCityOfAdminsn() {
  return <Bar data={qrscandata} options={chartOptions} />
}
