// File: frontend/src/components/WasteChart.jsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// We must register the components we want to use with Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function WasteChart({ chartData }) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // We don't need a legend for a single dataset
      },
      title: {
        display: true,
        text: 'Monthly Waste Collection (Kg)',
        font: {
          size: 16,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return value + ' Kg';
          },
        },
      },
    },
  };

  const data = {
    labels: chartData.map(d => d.month),
    datasets: [
      {
        label: 'Waste (Kg)',
        data: chartData.map(d => d.totalWeight),
        backgroundColor: 'rgba(13, 110, 253, 0.6)', // Blue bars
        borderColor: 'rgba(13, 110, 253, 1)',
        borderWidth: 1,
      },
    ],
  };

  return <Bar options={options} data={data} />;
}

export default WasteChart;