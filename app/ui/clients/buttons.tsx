import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteClient } from '@/app/lib/actions';
export function CreateClient({ id }: { id: string }) {
  return (
    <Link
      href={`/ui/dashboard/clients/${id}/create`}
      className="flex h-10 items-center rounded-lg bg-slate-50 px-4 text-sm font-medium text-slate-600 transition-colors hover:border hover:border-gray-300"
    >
      <PlusIcon className="h-5 " />
      <span className="hidden md:block"></span>
    </Link>
  );
}

export function UpdateClient({ id }: { id: string }) {
  return (
    <Link
    href={`/ui/dashboard/clients/${id}/edit`}
      className="rounded-sm  p-2 hover:border hover:border-gray-300"
    >
      <PencilIcon className="w-5 " />
    </Link>
  );
}

export function DeleteClient({ id }: { id: string }) {

  const deleteClientWithId = deleteClient.bind(null, id);
  return (
    <>
      <form  action={deleteClientWithId}>
      <button className="rounded-sm  p-2 hover:border hover:border-gray-300">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
      </form>
    </>
  );
}