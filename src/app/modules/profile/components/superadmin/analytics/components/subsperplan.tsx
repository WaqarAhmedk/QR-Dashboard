import React from 'react'
import {Bar} from 'react-chartjs-2'
const subplandata = {
  labels: ['Professional', 'Premium', 'Starter'],
  datasets: [
    {
      label: 'Subscriptions',
      data: [12, 40, 10],
      backgroundColor: 'cyan',
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

export default function SubPerPlan() {
  return <Bar data={subplandata} options={chartOptions} />
}
