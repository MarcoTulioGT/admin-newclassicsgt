
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
    title: {
      display: true,
      text: 'Costo de envío por mes',
    },
  },
};

//const labels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];



export default async function CostChart() {
    const dataCost = await fetchCost();
    const cost =dataCost.map((month) => Number(month.cost)/100);
    const labels = dataCost.map((month) => month.month.trim());


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
    <div className="w-full md:col-span-4 rounded-lg bg-slate-50 p-4">
    <h2 className={`${rajdhani.className} mb-4 text-xl md:text-2xl text-blue-700`}>
      Recent Cost
    </h2>
    <div className="rounded-xl bg-white p-4 text-blue-700">
       <BarGraps options={options} data={data} />
        </div> 
        <div className="flex items-center pb-2 pt-6">
          <CalendarIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Last 12 months</h3>
        </div>
    </div>
  )
}
