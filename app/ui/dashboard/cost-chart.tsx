
import React from 'react';
import { lusitana, rajdhani } from '@/app/ui/fonts';
import { fetchRevenue } from '@/app/lib/data';
import { useState, useEffect } from 'react';
import { BarGraps } from '@/app/ui/graphs/bar-graph';
import { formatCurrency } from '@/app/lib/utils';


export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Costo de envío por mes',
    },
  },
};

//const labels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];



export default async function CostChart() {
    const revenue = await fetchRevenue();
    const cost =revenue.map((month) => Number(month.cost)/100);
    const labels = revenue.map((month) => month.month.trim());


  const data = {
    labels,
    datasets: [
      {
        label: 'Costo',
        data: cost,
        backgroundColor: 'rgba(0, 104, 255, 0.7)',
      }
    ],
  };
  return (
    <div className="w-full md:col-span-4">
    <h2 className={`${rajdhani.className} mb-4 text-xl md:text-2xl`}>
      Recent Cost
    </h2>
    <div className="rounded-xl bg-gray-50 p-4">
       <BarGraps options={options} data={data} />
        </div> 
    </div>
  )
}
