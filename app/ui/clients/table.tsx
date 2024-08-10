import Image from 'next/image';
import { UpdateClient, DeleteClient, CreateClient } from '@/app/ui/clients/buttons';
import { formatDateToLocal, formatCurrency, formatCurrencyGT, formatPercent } from '@/app/lib/utils';
import { fetchFilteredClient } from '@/app/lib/data';

export default async function ClientsTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const clients = await fetchFilteredClient(query, currentPage);

  return (
    <div className="mt-1 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {clients?.map((client) => (
              <div
                key={client.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="text-sm text-gray-500">{client.name}</p>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {client.address}
                    </p>
                    <p>{client.zone}</p>
                  </div>
                  <div className="flex justify-end gap-1">
                    <UpdateClient id={client.id} />
                    <DeleteClient id={client.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-600 sm:table">
            <thead className="rounded-lg text-left text-xs font-normal">
              <tr>
                <th scope="col" className="px-3 py-2 font-normal">
                  Id
                </th>
                <th scope="col" className="px-4 py-2 font-normal sm:pl-6">
                Name
                </th>
                <th scope="col" className="px-3 py-2 font-normal">
                  Address
                </th>
                <th scope="col" className="px-3 py-2 font-normal">
                 Departamento
                </th>
                <th scope="col" className="px-3 py-2 font-normal">
                 Municipio
                </th>
                <th scope="col" className="px-3 py-2 font-normal">
                 Zone
                </th> 
                <th scope="col" className="px-4 py-2 font-normal sm:pl-6">
                Phone
                </th>              
                <th scope="col" className="px-3 py-2 font-normal">
                  Create Date
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white border">
              {clients?.map((client) => (
                <tr
                  key={client.id}
                  className="w-full border py-3 text-xs last-of-type:border-none [&:first-child>td:first-child]:rounded-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg hover:bg-gray-50">
                  <td className="whitespace-nowrap  px-3 py-1 hover:border hover:border-blue-300">
                   {client.id}
                  </td>
                  <td className="whitespace-nowrap px-3 py-1 hover:border hover:border-blue-300">
                    {client.name}
                  </td>
                  <td className="whitespace-nowrap  px-3 py-1 hover:border hover:border-blue-300">
                    {client.address}
                  </td>
                  <td className="whitespace-nowrap  px-3 py-1 hover:border hover:border-blue-300">
                   {client.depto}
                  </td>
                  <td className="whitespace-nowrap  px-3 py-1 hover:border hover:border-blue-300">
                  {client.city}
                  </td>
                  <td className="whitespace-nowrap  px-3 py-1 hover:border hover:border-blue-300">
                  {client.zone}
                  </td>
                  <td className="whitespace-nowrap  px-3 py-1 hover:border hover:border-blue-300">
                  {client.phone}
                  </td>
                  <td className="whitespace-nowrap  px-3 py-1 hover:border hover:border-blue-300">
                  {formatDateToLocal(client.create_date)}
                  </td>
                  <td className="whitespace-nowrap py-1 pl-6 pr-3 hover:border hover:border-blue-300">
                    <div className="flex justify-end gap-1">
                    <CreateClient id={client.id} />
                     <UpdateClient id={client.id} />
                      <DeleteClient id={client.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
