import {
    BanknotesIcon,
    ClockIcon,
    UserGroupIcon,
    InboxIcon,
    ArchiveBoxIcon,
    ArchiveBoxArrowDownIcon
  } from '@heroicons/react/24/outline';
  import { Suspense } from 'react';
  import { lusitana, rajdhani } from '@/app/ui/fonts';
  import { fetchCardData } from '@/app/lib/data';
  import { CostChartSkeleton } from '@/app/ui/skeletons';
  import BoxChart from '@/app/ui/boxes/box-chart';

  const iconMap = {
    paid: BanknotesIcon,
    boxesdelivered: ArchiveBoxArrowDownIcon,
    pending: ClockIcon,
    boxes: ArchiveBoxIcon,
  };
  
  export default async function CardWrapper() {
    const {
      numberOfBoxes,
      numberOfBoxesDelivered,
      totalPaidCost,
      totalPendingCost,
    } = await fetchCardData();
  
    return (
      <>
        {/* NOTE: comment in this code when you get to this point in the course */}
  
         <Card title="Count boxes by year" value={numberOfBoxes} type="count" />
        <Card title="Paid boxes by year" value={totalPaidCost} type="cost" />
        <Card
          title="Total boxes delivered by year"
          value={numberOfBoxesDelivered}
          type="delivered"
        /> 
        <div className=" outline outline-1 rounded-xl bg-white text-blue-300">
           <BoxChart/>
        </div>
      </>
    );
  }
  
  export function Card({
    title,
    value,
    type,
  }: {
    title: string;
    value: number | string;
    type: 'count' | 'cost' | 'delivered' ;
  }) {
    const Icon = iconMap[type];
  
    return (
      <div className="rounded-xl bg-slate-50 outline outline-1 text-blue-300 p-2 ">
        <div className="flex p-4">
          {Icon ? <Icon className="h-5 w-5 text-blue-700" /> : null}
          <h3 className={`${rajdhani.className} ml-2 text-md font-medium text-blue-900`}>{title}</h3>
        </div>
        <p
          className={`${rajdhani.className}
            truncate rounded-xl bg-white px-4 py-8 text-center font-black text-blue-900 text-3xl `}
        >
          {value}
        </p>
      </div>
    );
  }
  