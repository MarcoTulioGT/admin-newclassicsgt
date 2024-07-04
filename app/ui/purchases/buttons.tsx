import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deletePurchase } from '@/app/lib/actions';
export function CreatePurchase() {
  return (
    <Link
      href="/ui/dashboard/purchases/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Add Purchase</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateBox({ id }: { id: string }) {
  return (
    <Link
    href={`/ui/dashboard/purchases/${id}/edit`}
      className="rounded-sm  p-2 hover:bg-gray-200"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeletePurchase({ id }: { id: string }) {

  const deletePurchaseWithId = deletePurchase.bind(null, id);
  return (
    <>
      <form  action={deletePurchaseWithId}>
      <button className="rounded-sm  p-2 hover:bg-gray-200">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
      </form>
    </>
  );
}