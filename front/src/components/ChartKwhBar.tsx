import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

export default function ChartKwhBar() {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        chartInstanceRef.current = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
            datasets: [
              {
                label: 'Consumo de Energia Elétrica kWh',
                data: [12, 19, 3, 5, 2, 3, 7, 8, 10, 15, 20, 12],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
              },
              {
                label: 'Energia Compensada kWh',
                data: [8, 10, 5, 7, 4, 6, 9, 12, 8, 14, 18, 10],
                backgroundColor: 'rgba(43, 197, 82, 0.2)',
                borderColor: 'rgba(43, 197, 82, 1)',
                borderWidth: 1,
              }
            ],
          },
        });
      }
    }

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, []);

  return <canvas ref={chartRef}/>;
};
