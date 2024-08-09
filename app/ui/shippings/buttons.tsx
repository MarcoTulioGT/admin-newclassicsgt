import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteShipping } from '@/app/lib/actions';
export function CreateShipping() {
  return (
    <Link
      href="/ui/dashboard/shippings/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Add Shipping</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateShipping({ id }: { id: string }) {
  return (
    <Link
    href={`/ui/dashboard/shippings/${id}/edit`}
      className="rounded-sm  p-2 hover:bg-gray-200"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteShipping({ id }: { id: string }) {

  const deleteShippingWithId = deleteShipping.bind(null, id);
  return (
    <>
      <form  action={deleteShippingWithId}>
      <button className="rounded-sm  p-2 hover:bg-gray-200">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
      </form>
    </>
  );
}