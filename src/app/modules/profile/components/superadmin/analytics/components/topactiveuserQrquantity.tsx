import React from 'react'
import {Bar} from 'react-chartjs-2'
const qrscandata = {
  labels: ['Waqar', 'Ahmed', 'Ali', 'Usman'],
  datasets: [
    {
      label: 'QR Quantity',
      data: [11, 22, 13, 1],
      backgroundColor: 'green',
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
export default function ActiveUserQrQunatity() {
  return <Bar data={qrscandata} options={chartOptions} />
}
