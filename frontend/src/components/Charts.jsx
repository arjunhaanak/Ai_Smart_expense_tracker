import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title, Filler } from 'chart.js';
import { Pie, Line } from 'react-chartjs-2';

ChartJS.register(
  ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title, Filler
);

export const ExpensePieChart = ({ data }) => {
  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        data: Object.values(data),
        backgroundColor: [
          '#6366f1', '#a855f7', '#22d3ee', '#10b981', '#ef4444', '#f59e0b', '#ec4899'
        ],
        borderWidth: 0,
        hoverOffset: 10
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: 'bottom',
        labels: { color: '#94a3b8', font: { family: 'Outfit', size: 12 } }
      }
    },
    maintainAspectRatio: false,
  };

  return <Pie data={chartData} options={options} />;
};

export const TrendLineChart = ({ data }) => {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        fill: true,
        label: 'Daily Spending',
        data: data.values,
        borderColor: '#6366f1',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        tension: 0.4,
        pointBackgroundColor: '#6366f1',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#1e293b',
        titleFont: { family: 'Outfit' },
        bodyFont: { family: 'Outfit' }
      }
    },
    scales: {
      y: {
        grid: { color: 'rgba(255,255,255,0.05)' },
        ticks: { color: '#94a3b8' }
      },
      x: {
        grid: { display: false },
        ticks: { color: '#94a3b8' }
      }
    },
    maintainAspectRatio: false,
  };

  return <Line data={chartData} options={options} />;
};
