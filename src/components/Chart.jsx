import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const LetterOccurrencesChart = ({ map }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);  // Add ref to store chart instance

  useEffect(() => {
    if (!map || Object.keys(map).length === 0) return;

    // Destroy existing chart instance if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const data = {
      labels: Object.keys(map),
      datasets: [
        {
          label: 'Occurrences',
          data: Object.values(map),
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        },
      ],
    };

    const options = {
      responsive: true,
      plugins: {
        legend: { display: true },
      },
      scales: {
        x: { beginAtZero: true },
        y: { beginAtZero: true },
      },
    };

    const ctx = chartRef.current.getContext('2d');
    // Store new chart instance in ref
    chartInstance.current = new Chart(ctx, { type: 'bar', data, options });

    return () => {
      // Cleanup using stored instance
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [map]);

  return <canvas ref={chartRef}></canvas>;
};

export default LetterOccurrencesChart;
