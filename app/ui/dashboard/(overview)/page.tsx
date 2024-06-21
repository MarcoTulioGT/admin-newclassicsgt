import CardWrapper from '@/app/ui/dashboard/cards';
import CostChart from '@/app/ui/dashboard/cost-chart';
import LatestBoxes from '@/app/ui/dashboard/latest-boxes';
import { lusitana, rajdhani } from '@/app/ui/fonts';
import { Suspense } from 'react';
import { RevenueChartSkeleton, LatestInvoicesSkeleton, CardsSkeleton } from '@/app/ui/skeletons';


export default async function Page() {
  return (
   <main>
     <h1 className={`${rajdhani.className} mb-4 text-xl md:text-2xl`}>
       Dashboard
     </h1>
     <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
     <Suspense fallback={<CardsSkeleton />}>
         <CardWrapper />
       </Suspense>
     </div>
     <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
     <Suspense fallback={<RevenueChartSkeleton />}>
         <CostChart />
       </Suspense>
     <Suspense fallback={<LatestInvoicesSkeleton />}>
     <LatestBoxes />
     </Suspense>
     </div>
   </main>
 );
}