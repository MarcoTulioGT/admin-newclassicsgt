import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteClient } from '@/app/lib/actions';
export function CreateClient() {
  return (
    <Link
      href="/ui/dashboard/clients/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <PlusIcon className="h-5 md:ml-4" />
      <span className="hidden md:block">Add Client</span>
    </Link>
  );
}

export function UpdateClient({ id }: { id: string }) {
  return (
    <Link
    href={`/ui/dashboard/clients/${id}/edit`}
      className="rounded-sm  p-2 hover:bg-gray-200"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteClient({ id }: { id: string }) {

  const deleteClientWithId = deleteClient.bind(null, id);
  return (
    <>
      <form  action={deleteClientWithId}>
      <button className="rounded-sm  p-2 hover:bg-gray-200">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
      </form>
    </>
  );
}