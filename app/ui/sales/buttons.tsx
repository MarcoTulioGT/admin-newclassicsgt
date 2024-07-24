import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteSale } from '@/app/lib/actions';
export function CreateSale() {
  return (
    <Link
      href="/ui/dashboard/sales/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Add Sales</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateSale({ id }: { id: string }) {
  return (
    <Link
    href={`/ui/dashboard/sales/${id}/edit`}
      className="rounded-sm  p-2 hover:bg-gray-200"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteSale({ id }: { id: string }) {

  const deleteSaleWithId = deleteSale.bind(null, id);
  return (
    <>
      <form  action={deleteSaleWithId}>
      <button className="rounded-sm  p-2 hover:bg-gray-200">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
      </form>
    </>
  );
}