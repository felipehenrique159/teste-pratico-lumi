import { useContext, useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import DashConsumed from '../interfaces/DashConsumed';
import { DataContext } from '../contexts/DataDashboardContext';
export default function ChartKwhBar() {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);
  const [dash, setDash] = useState([])
  const { listDashConsumed, reloadDashConsumed } = useContext<any>(DataContext)

  const loadData = async () => {
    const response = await listDashConsumed()
    if (response) {
      setDash(response.data.dash)
    }
  }

  useEffect(() => {
    loadData()
  }, [reloadDashConsumed]);

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
            labels: dash.map((dashConsumed: DashConsumed) => {
              return dashConsumed.month_reference
            }),
            datasets: [
              {
                label: 'Consumo de Energia Elétrica kWh',
                data: dash.map((dashConsumed: DashConsumed) => {
                  return dashConsumed.energy_consumed_kwh
                }),
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
              },
              {
                label: 'Energia Compensada kWh',
                data: dash.map((dashConsumed: DashConsumed) => {
                  return dashConsumed.eletric_compesed_kwh
                }),
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
  }, [dash]);

  return <canvas ref={chartRef}/>;
};
