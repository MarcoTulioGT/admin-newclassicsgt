import { CheckIcon, ClockIcon, TruckIcon,ArchiveBoxArrowDownIcon, BanknotesIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function BoxStatus({ status }: { status: string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-xs',
        {
          'bg-gray-100 text-gray-600': status === 'filling',
          'bg-green-600 text-white': status === 'paid',
          'bg-slate-700 text-white': status === 'delivered',
          'bg-blue-600 text-white': status === 'intransit',
        },
      )}
    >
      {status === 'filling' ? (
        <>
          Filling
          <ArchiveBoxArrowDownIcon className="ml-1 w-4 text-gray-500" />
        </>
      ) : null}
      {status === 'paid' ? (
        <>
          Paid
          <BanknotesIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
          {status === 'delivered' ? (
        <>
          Delivered
          <CheckIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
      {status === 'intransit' ? (
        <>
          Intransit
          <TruckIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
    </span>
  );
}
