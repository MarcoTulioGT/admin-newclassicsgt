import {
    BanknotesIcon,
    ClockIcon,
    UserGroupIcon,
    InboxIcon,
    ArchiveBoxIcon,
    ArchiveBoxArrowDownIcon
  } from '@heroicons/react/24/outline';
  import { lusitana, rajdhani } from '@/app/ui/fonts';
  import { fetchCardData } from '@/app/lib/data';

  const iconMap = {
    collected: BanknotesIcon,
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
  
         <Card title="Collected" value={totalPaidCost} type="collected" />
        <Card title="Pending" value={totalPendingCost} type="pending" />
        <Card title="Total Boxes" value={numberOfBoxes} type="boxes" />
        <Card
          title="Total BoxesDelivered"
          value={numberOfBoxesDelivered}
          type="boxesdelivered"
        /> 
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
    type: 'boxes' | 'boxesdelivered' | 'pending' | 'collected';
  }) {
    const Icon = iconMap[type];
  
    return (
      <div className="rounded-xl bg-slate-100 p-2 shadow-sm">
        <div className="flex p-4">
          {Icon ? <Icon className="h-5 w-5 text-blue-700" /> : null}
          <h3 className={`${rajdhani.className} ml-2 text-sm font-medium text-blue-900`}>{title}</h3>
        </div>
        <p
          className={`${rajdhani.className}
            truncate rounded-xl bg-white px-4 py-8 text-center text-blue-900 text-2xl`}
        >
          {value}
        </p>
      </div>
    );
  }
  