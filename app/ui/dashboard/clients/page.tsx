import Pagination from '@/app/ui/clients/pagination';
import Search from '@/app/ui/search';
//import { CreateSale} from '@/app/ui/clients/buttons';
import Table from '@/app/ui/clients/table';
import { rajdhani } from '@/app/ui/fonts';
import { fetchClientPages } from '@/app/lib/data';
import { CardsSkeleton, CostChartSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';

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


  const totalPages = await fetchClientPages(query);

    return (
      <div className="w-full">
        <div className="flex w-full items-center justify-between">
        <h1 className={`${rajdhani.className} text-2xl text-blue-700`}>Clients</h1>
        </div>


        <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search Clients..." />
       {/* <CreateClient/> */}
      </div>
        <Table query={query} currentPage={currentPage} />
        <div className="mt-1 flex w-full justify-center">
        <Pagination totalPages={totalPages} /> 
      </div>
      </div>
    )
  }