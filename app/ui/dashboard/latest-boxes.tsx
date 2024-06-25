import { ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Image from 'next/image';
import { lusitana, rajdhani } from '@/app/ui/fonts';
import { LatestBox } from '@/app/lib/definitions';
import { fetchLatestBoxes } from '@/app/lib/data';
export default async function LatestBoxes() {
  const lastestBoxes  = await fetchLatestBoxes();
  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`${rajdhani.className} mb-4 text-xl md:text-2xl text-blue-700`}>
        Latest Boxes
      </h2>
      <div className="flex grow flex-col justify-between rounded-lg bg-slate-50 p-4">
        {/* NOTE: comment in this code when you get to this point in the course */}

        <div className="bg-white px-6">
          {lastestBoxes.map((box, i) => {
            return (
              <div
                key={box.id}
                className={clsx(
                  'flex flex-row items-center justify-between py-4',
                  {
                    'border-t': i !== 0,
                  },
                )}
              >
                <div className="flex items-center">
                  <Image
                    src="/caja.jpg"
                    alt={`${box.box_id}'s profile picture`}
                    className="mr-4 rounded-full"
                    width={32}
                    height={32}
                  />
                  <div className="min-w-0">
                    <p className={`${rajdhani.className} "truncate text-sm font-semibold md:text-base text-blue-700`}>
                      {box.box_id}
                    </p>
                    <p className="hidden text-sm text-gray-500 sm:block">
                      {box.status}
                    </p>
                  </div>
                </div>
                <p
                  className={`${rajdhani.className} truncate text-sm font-medium md:text-base`}
                >
                  {box.cost}
                </p>
              </div>
            );
          })}
        </div> 
        <div className="flex items-center pb-2 pt-6">
          <ArrowPathIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Updated just now</h3>
        </div>
      </div>
    </div>
  );
}
