
import React from 'react';
import { lusitana, rajdhani } from '@/app/ui/fonts';
import { fetchCategoriesbyPurchase } from '@/app/lib/data';
import { useState, useEffect } from 'react';
import { DoughnutGraphs } from '@/app/ui/graphs/doughnut-graph';
import { formatCurrency } from '@/app/lib/utils';
import { CalendarIcon } from '@heroicons/react/24/outline';

export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: false,
      },
      title: {
        display: true,
        text: 'Chart.js Doughnut Chart'
      }
    }
  };

export default async function CategoryChart() {
    const countPurchasesByCategory = await fetchCategoriesbyPurchase();
    const name =countPurchasesByCategory.map((d) => Number(d.count));
    const labels = countPurchasesByCategory.map((d) => d.name.trim());
    const bgColor = [];
    for (let i = 0; i < countPurchasesByCategory.length; i++) {
        let r1 = {min: 10, max: 150}
        let r2 = {min: 50, max: 255}
        let d1 = r1.max - r1.min 
        let d2 = r2.max - r2.min         
        const G = Math.round(r1.min + Math.random() * d1)
        const B = Math.round(r2.min + Math.random() * d2)
        bgColor.push('rgba(1, '+G+', '+B+', 0.50)');
    }


  const data = {
    labels,
    datasets: [
      {
        label: 'Purchases',
        data: name,
        pointStyle: 'circle',
        pointRadius: 6,
        pointHoverRadius: 15,
        borderWidth: 1,
        backgroundColor: bgColor,
      }
    ],
    hoverOffset: 40,
  };
  return (
       <DoughnutGraphs data={data} options={options}/>

  )
}
