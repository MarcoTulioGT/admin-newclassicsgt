
import React from 'react';
import { lusitana, rajdhani } from '@/app/ui/fonts';
import { fetchCountCategory } from '@/app/lib/data';
import { useState, useEffect } from 'react';
import { LineGraps } from '@/app/ui/graphs/line-graph';
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

export default async function CategoryBoxChart() {
    const dataCount = await fetchCountCategory();
    const count =dataCount.map((month) => Number(month.count));
    const labels = dataCount.map((month) => month.month.trim());


  const data = {
    labels,
    datasets: [
      {
        label: 'Categories by month',
        data: count,
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
       <LineGraps options={options} data={data} />

  )
}
