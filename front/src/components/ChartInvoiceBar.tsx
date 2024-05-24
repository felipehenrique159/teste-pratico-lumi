import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import { toast } from 'react-toastify';
import api from '../services/api';
import DashInvoice from '../interfaces/DashInvoice';

export default function ChartInvoiceBar() {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);
  const [dash, setDash] = useState([])

  useEffect(() => {
    listDash()
  }, []);

  const listDash = async () => {
    try {
      const response = await api.get('list-dash-energy-economy');
      setDash(response.data.dash)
    } catch (error) {
      toast.error("Erro ao listar dash");
      console.error('Erro ao listar dash:', error);
    }
  };

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
            labels: dash.map((dashInvoice: DashInvoice) => {
              return dashInvoice.month_reference
            }),
            datasets: [
              {
                label: 'Valor Total sem GD R$',
                data: dash.map((dashInvoice: DashInvoice) => {
                  return dashInvoice.total_value_without_gb
                }),
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
              },
              {
                label: 'Economia GD R$',
                data: dash.map((dashInvoice: DashInvoice) => {
                  return dashInvoice.compensated_energy_gd
                }),
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
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
