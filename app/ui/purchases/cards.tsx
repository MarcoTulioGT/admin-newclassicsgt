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
  import { fetchCardPurchase } from '@/app/lib/data';
  import { CostChartSkeleton } from '@/app/ui/skeletons';
  import CategoryUtility from '@/app/ui/purchases/categoryUtility-chart';
  import CategoryBoxChart from '@/app/ui/categories/categoryBox-chart';
  import {formatCurrency, formatCurrencyGT} from '@/app/lib/utils';
  import BoxChart from '@/app/ui/purchases/box-chart';

  const iconMap = {
    paid: BanknotesIcon,
    boxesdelivered: ArchiveBoxArrowDownIcon,
    pending: ClockIcon,
    boxes: ArchiveBoxIcon,
  };
  
  export default async function CardWrapper({
    query
  }: {
    query: string;
  }) {

  console.log(query)


    const {
        suminvestment,
        sumutility,
        qty,
        totalPendingCost,
      } = await fetchCardPurchase(query);
  

    return (
      <>
        {/* NOTE: comment in this code when you get to this point in the course */}
  
         <Card title="Count Investment" value={formatCurrencyGT(suminvestment)} type="countInvs" />
        <Card title="Count Utility" value={formatCurrencyGT(sumutility)} type="countUtility" />
        <Card title="Qty" value={qty} type="qty" />
        <div className="rounded-xl outline outline-1 outline-blue-300 h-44">
           <BoxChart/>
        </div>
        <div className=" rounded-xl pl-16 bg-blue-50 h-44">
           <CategoryUtility/>
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
    type: 'countInvs' | 'countUtility' | 'qty' ;
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
  