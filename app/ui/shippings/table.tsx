import Image from 'next/image';
import { UpdateSale, DeleteSale } from '@/app/ui/shippings/buttons';
import { formatDateToLocal, formatCurrency, formatCurrencyGT, formatPercent } from '@/app/lib/utils';
import { fetchFilteredShippings } from '@/app/lib/data';

export default async function ShippingsTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const shippings = await fetchFilteredShippings(query, currentPage);
  console.log(shippings)
  return (
    <div className="mt-1 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {shippings?.map((shipping) => (
              <div
                key={shipping.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="text-sm text-gray-500">{shipping.status}</p>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {shipping.client_id}
                    </p>
                    <p>{shipping.status}</p>
                  </div>
                  <div className="flex justify-end gap-1">
                    <UpdateSale id={shipping.id} />
                    <DeleteSale id={shipping.id} />
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
                Client Id
                </th>
                <th scope="col" className="px-3 py-2 font-normal">
                Shipping Cost
                </th>
                <th scope="col" className="px-3 py-2 font-normal">
                 Status
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
              {shippings?.map((shipping) => (
                <tr
                  key={shipping.id}
                  className="w-full border py-3 text-xs last-of-type:border-none [&:first-child>td:first-child]:rounded-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg hover:bg-gray-50">
                  <td className="whitespace-nowrap  px-3 py-1 hover:border hover:border-blue-300">
                   {shipping.id}
                  </td>
                  <td className="whitespace-nowrap px-3 py-1 hover:border hover:border-blue-300">
                    {shipping.client_id}
                  </td>
                  <td className="whitespace-nowrap  px-3 py-1 hover:border hover:border-blue-300">
                    {shipping.shipping_cost}
                  </td>
                  <td className="whitespace-nowrap  px-3 py-1 hover:border hover:border-blue-300">
                   {shipping.status}
                  </td>
                  <td className="whitespace-nowrap  px-3 py-1 hover:border hover:border-blue-300">
                  {formatDateToLocal(shipping.create_date)}
                  </td>
                  <td className="whitespace-nowrap py-1 pl-6 pr-3 hover:border hover:border-blue-300">
                    <div className="flex justify-end gap-1">
                     <UpdateSale id={shipping.id} />
                      <DeleteSale id={shipping.id} />
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
