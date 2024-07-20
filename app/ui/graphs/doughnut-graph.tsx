'use client'

import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Doughnut } from 'react-chartjs-2';

  ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
  );

  export function DoughnutGraphs({
    data,
    options,
  }: {
    data: string;
    options: string;
  }){


    return <Doughnut  data={data} options={options} />
  }