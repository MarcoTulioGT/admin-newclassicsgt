import Image from 'next/image';
import { UpdateSale, DeleteSale } from '@/app/ui/sales/buttons';
import { formatDateToLocal, formatCurrency, formatCurrencyGT, formatPercent } from '@/app/lib/utils';
import { fetchFilteredSales } from '@/app/lib/data';

export default async function SalesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const sales = await fetchFilteredSales(query, currentPage);
  return (
    <div className="mt-1 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {sales?.map((sale) => (
              <div
                key={sale.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="text-sm text-gray-500">{sale.noitem}</p>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {sale.noitem}
                    </p>
                    <p>{sale.status}</p>
                  </div>
                  <div className="flex justify-end gap-1">
                    <UpdateSale id={sale.id} />
                    <DeleteSale id={sale.id} />
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
                No Item
                </th>
                <th scope="col" className="px-3 py-2 font-normal">
                  Qty
                </th>
                <th scope="col" className="px-3 py-2 font-normal">
                  Price GTQ
                </th>
                <th scope="col" className="px-3 py-2 font-normal">
                  Discount GTQ
                </th>
                <th scope="col" className="px-3 py-2 font-normal">
                  Total GTQ
                </th> 
                <th scope="col" className="px-4 py-2 font-normal sm:pl-6">
                  Id Shipping
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
              {sales?.map((sale) => (
                <tr
                  key={sale.id}
                  className="w-full border py-3 text-xs last-of-type:border-none [&:first-child>td:first-child]:rounded-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg hover:bg-gray-50">
                  <td className="whitespace-nowrap  px-3 py-1 hover:border hover:border-blue-300">
                   {sale.id}
                  </td>
                  <td className="whitespace-nowrap px-3 py-1 hover:border hover:border-blue-300">
                    {sale.noitem}
                  </td>
                  <td className="whitespace-nowrap  px-3 py-1 hover:border hover:border-blue-300">
                    {sale.qty}
                  </td>
                  <td className="whitespace-nowrap  px-3 py-1 hover:border hover:border-blue-300">
                   {formatCurrencyGT(sale.price)}
                  </td>
                  <td className="whitespace-nowrap  px-3 py-1 hover:border hover:border-blue-300">
                   {formatCurrencyGT(sale.discount)}
                  </td>
                  <td className="whitespace-nowrap  px-3 py-1 text-green-600 hover:border hover:border-blue-300">
                   {formatCurrencyGT(sale.total)}
                  </td>
                  <td className="whitespace-nowrap  px-3 py-1 hover:border hover:border-blue-300">
                   {sale.id_shipping}
                  </td>
                  <td className="whitespace-nowrap  px-3 py-1 hover:border hover:border-blue-300">
                   {sale.status}
                  </td>
                  <td className="whitespace-nowrap  px-3 py-1 hover:border hover:border-blue-300">
                   {formatDateToLocal(sale.create_date)}
                  </td>

                  <td className="whitespace-nowrap py-1 pl-6 pr-3 hover:border hover:border-blue-300">
                    <div className="flex justify-end gap-1">
                     <UpdateSale id={sale.id} />
                      <DeleteSale id={sale.id} />
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
