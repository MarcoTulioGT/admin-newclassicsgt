import Pagination from '@/app/ui/categories/pagination';
import Search from '@/app/ui/search';
import { CreateCategory} from '@/app/ui/categories/buttons';
import Table from '@/app/ui/categories/table';
import { rajdhani } from '@/app/ui/fonts';
import { fetchCategoriesPages } from '@/app/lib/data';
import { CardsSkeleton, CostChartSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import CardWrapper  from '@/app/ui/categories/cards';
import BoxChart from '@/app/ui/categories/box-chart';

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


  const totalPages = await fetchCategoriesPages(query);

    return (
      <div className="w-full">
        <div className="flex w-full items-center justify-between">
        <h1 className={`${rajdhani.className} text-2xl text-blue-700`}>Categories</h1>
        </div>

        <div className="grid pt-2 gap-6 sm:grid-cols-2 lg:grid-cols-4 ">
        <Suspense fallback={<CardsSkeleton />}>
            <CardWrapper />
          </Suspense>
     </div>
     

        <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search Categories..." />
        <CreateCategory />
      </div>
        <Table query={query} currentPage={currentPage} />
        <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} /> 
      </div>
      </div>
    )
  }