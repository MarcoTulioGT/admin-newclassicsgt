import Pagination from '@/app/ui/boxes/pagination';
import Search from '@/app/ui/search';
import { CreateBox } from '@/app/ui/boxes/buttons';
import Table from '@/app/ui/boxes/table';
import { rajdhani } from '@/app/ui/fonts';
import { fetchBoxesPages } from '@/app/lib/data';

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


  const totalPages = await fetchBoxesPages(query);

    return (
      <div className="w-full">
        <div className="flex w-full items-center justify-between">
        <h1 className={`${rajdhani.className} text-2xl`}>Boxes</h1>
        </div>
        <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search Boxes..." />
        <CreateBox />
      </div>
        <Table query={query} currentPage={currentPage} />
        <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} /> 
      </div>
      </div>
    )
  }