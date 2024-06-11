import Table from '@/app/ui/boxes/table';
import { rajdhani } from '@/app/ui/fonts';

export default function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {

  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

    return (
      <div className="w-full">
        <div className="flex w-full items-center justify-between">
        <h1 className={`${rajdhani.className} text-2xl`}>Boxes</h1>
        </div>

        <Table query={query} currentPage={currentPage} />
      </div>
    )
  }