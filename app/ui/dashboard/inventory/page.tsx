import Pagination from '@/app/ui/inventory/pagination';
import Search from '@/app/ui/search';
import { CreateProduct} from '@/app/ui/inventory/buttons';
import Table from '@/app/ui/inventory/table';
import { rajdhani } from '@/app/ui/fonts';
import { fetchProductsPages } from '@/app/lib/data';

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


  const totalPages = await fetchProductsPages(query);

    return (
      <div className="w-full">
        <div className="flex w-full items-center justify-between">
        <h1 className={`${rajdhani.className} text-2xl text-blue-700`}>Products Inventory</h1>
        </div>
        <Table query={query} currentPage={currentPage} />
        <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} /> 
      </div>
      </div>
    )
  }