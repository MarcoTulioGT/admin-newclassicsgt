
import React from 'react';
import { lusitana, rajdhani } from '@/app/ui/fonts';
import { fetchBoxPurchase } from '@/app/lib/data';
import { useState, useEffect } from 'react';
import { BarGraps } from '@/app/ui/graphs/bar-graph';
import { formatCurrency, QtToDollar, DollarToQt } from '@/app/lib/utils';
import { CalendarIcon } from '@heroicons/react/24/outline';


export const options = {
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true
    }
  },
  plugins: {
    legend: {
      display: false,
    },
  },
};

export default async function BoxChart() {
    const dataCost = await fetchBoxPurchase();
    const cost =dataCost.map((d) => DollarToQt(Number(d.cost)/100));
    const invest =dataCost.map((d) => DollarToQt(Number(d.invest)/100));
    const utility =dataCost.map((d) => Number(d.utility)/100);
    const labels = dataCost.map((d) => d.month.trim());


  const data = {
    labels,
    datasets: [
      {
        label: 'Boxes cost',
        data: cost,
        pointStyle: 'circle',
        pointRadius: 6,
        pointHoverRadius: 15,
        borderWidth: 1,
        borderColor:'rgba(255, 0, 0, 1)',
        backgroundColor: 'rgba(242, 2, 2, 0.6)',
      },
      {
        label: 'Boxes invest',
        data: invest,
        pointStyle: 'circle',
        pointRadius: 6,
        pointHoverRadius: 15,
        borderWidth: 1,
        borderColor:'rgba(0, 194, 255, 1)',
        backgroundColor: 'rgba(0, 194, 255, 0.6)',
      },
      {
        label: 'Boxes utility',
        data: utility,
        pointStyle: 'circle',
        pointRadius: 6,
        pointHoverRadius: 15,
        borderWidth: 1,
        borderColor:'rgba(28, 205, 0, 1)',
        backgroundColor: 'rgba(12, 223, 0, 0.6)',
      }
    ],
  };
  return (
       <BarGraps options={options} data={data} />

  )
}
