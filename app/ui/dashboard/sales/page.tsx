import Pagination from '@/app/ui/sales/pagination';
import Search from '@/app/ui/search';
import { CreateSale} from '@/app/ui/sales/buttons';
import Table from '@/app/ui/sales/table';
import { rajdhani } from '@/app/ui/fonts';
import { fetchSalesPages } from '@/app/lib/data';
import { CardsSkeleton, CostChartSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import CardWrapper  from '@/app/ui/purchases/cards';

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {

  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;


  const totalPages = await fetchSalesPages(query);

    return (
      <div className="w-full">
        <div className="flex w-full items-center justify-between">
        <h1 className={`${rajdhani.className} text-2xl text-blue-700`}>Sales</h1>
        </div>

      {/*<div className="grid pt-2 gap-6 sm:grid-cols-2 lg:grid-cols-5 ">
        <Suspense fallback={<CardsSkeleton />}>
            <CardWrapper query={query} />
          </Suspense>
    </div>*/}

        <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search sales..." />
        <CreateSale/>
      </div>
        <Table query={query} currentPage={currentPage} />
        <div className="mt-1 flex w-full justify-center">
        <Pagination totalPages={totalPages} /> 
      </div>
      </div>
    )
  }