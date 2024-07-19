
import React from 'react';
import { lusitana, rajdhani } from '@/app/ui/fonts';
import { fetchCost } from '@/app/lib/data';
import { useState, useEffect } from 'react';
import { BarGraps } from '@/app/ui/graphs/bar-graph';
import { formatCurrency } from '@/app/lib/utils';
import { CalendarIcon } from '@heroicons/react/24/outline';


export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
  },
};

export default async function BoxChart() {
    const dataCost = await fetchCost();
    const cost =dataCost.map((month) => Number(month.cost)/100);
    const labels = dataCost.map((month) => month.month.trim());


  const data = {
    labels,
    datasets: [
      {
        label: 'Boxes cost/month',
        data: cost,
        borderColor:'rgba(0, 18, 247, 0.91)',
        pointStyle: 'circle',
        pointRadius: 6,
        pointHoverRadius: 15,
        borderWidth: 1,
        backgroundColor: 'rgba(0, 104, 255, 0.7)',
      }
    ],
  };
  return (
       <BarGraps options={options} data={data} />

  )
}
