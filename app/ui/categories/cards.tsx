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
  import { fetchCardCategory } from '@/app/lib/data';
  import { CostChartSkeleton } from '@/app/ui/skeletons';
  import CategoryChart from '@/app/ui/categories/category-chart';
  import CategoryBoxChart from '@/app/ui/categories/categoryBox-chart';
  const iconMap = {
    paid: BanknotesIcon,
    boxesdelivered: ArchiveBoxArrowDownIcon,
    pending: ClockIcon,
    boxes: ArchiveBoxIcon,
  };
  
  export default async function CardWrapper() {
    const {
      numberOfCategories,
      numberOfRootCategories,
      totalPaidCost,
      totalPendingCost,
    } = await fetchCardCategory();
  
    return (
      <>
        {/* NOTE: comment in this code when you get to this point in the course */}
  
         <Card title="Count categories" value={numberOfCategories} type="count" />
        <Card title="Count root categories" value={numberOfRootCategories} type="countroot" />
        <div className="rounded-xl outline outline-1 outline-blue-300"style={{height: '170px' }}>
           <CategoryBoxChart/>
        </div>
        <div className=" pl-16 "style={{  height: '170px' }}>
           <CategoryChart/>
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
    type: 'count' | 'countroot' | 'delivered' ;
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
  