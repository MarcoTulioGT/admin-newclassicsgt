import Pagination from '@/app/ui/products/pagination';
import Search from '@/app/ui/search';
import { CreateProduct} from '@/app/ui/products/buttons';
import Table from '@/app/ui/products/table';
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
        <h1 className={`${rajdhani.className} text-2xl text-blue-700`}>Products</h1>
        </div>
        <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search Products..." />
        <CreateProduct />
      </div>
        <Table query={query} currentPage={currentPage} />
        <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} /> 
      </div>
      </div>
    )
  }