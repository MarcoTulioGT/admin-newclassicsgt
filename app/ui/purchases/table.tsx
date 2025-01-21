import Image from 'next/image';
import { UpdateBox, DeletePurchase } from '@/app/ui/purchases/buttons';
import CategoryStatus from '@/app/ui/categories/status';
import { formatDateToLocal, formatCurrency, formatCurrencyGT, formatPercent } from '@/app/lib/utils';
import { fetchFilteredPurchases } from '@/app/lib/data';

export default async function PurchasesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const purchases = await fetchFilteredPurchases(query, currentPage);
  return (
    <div className="mt-1 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {purchases?.map((purchase) => (
              <div
                key={purchase.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="text-sm text-gray-500">{purchase.name}</p>
                  </div>
                  <CategoryStatus status={purchase.status} />
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {formatCurrency(purchase.noitem)}
                    </p>
                    <p>{purchase.status}</p>
                  </div>
                  <div className="flex justify-end gap-1">
                    <UpdateBox id={purchase.id} />
                    <DeletePurchase id={purchase.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-600 sm:table">
            <thead className="rounded-lg text-left text-xs font-normal">
              <tr>
                <th scope="col" className="px-3 py-2 font-normal">
                  Box
                </th>
                <th scope="col" className="px-4 py-2 font-normal sm:pl-6">
                  No Item
                </th>
                <th scope="col" className="px-4 py-2 font-normal sm:pl-6">
                  Name
                </th>
                <th scope="col" className="px-3 py-2 font-normal">
                  Qty
                </th>
                <th scope="col" className="px-3 py-2 font-normal">
                  Cost U. $
                </th>
                {/*<th scope="col" className="px-3 py-2 font-normal">
                  Investment $
            </th>*/}
                <th scope="col" className="px-3 py-2 font-normal">
                  Costo Total Q
                </th>
                <th scope="col" className="px-3 py-2 font-normal">
                  Cost Shipping US Q
                </th>
                <th scope="col" className="px-3 py-2 font-normal">
                  Cost Shipping GT Q
                </th>
                <th scope="col" className="px-3 py-2 font-normal">
                  Cost Total Shipping Unidad GT Q
                </th>
                <th scope="col" className="px-3 py-2 font-normal">
                Cost Total shipping GT by purchase $
                </th>
                <th scope="col" className="px-3 py-2 font-normal">
                  Cost Sale U. Q
                </th>
                <th scope="col" className="px-3 py-2 font-normal">
                  MU
                </th>
                <th scope="col" className="px-3 py-2 font-normal">
                  Price Sale U. GTQ
                </th>
                <th scope="col" className="px-3 py-2 font-normal">
                  Utility
                </th>
                <th scope="col" className="px-3 py-2 font-normal">
                  Total Utility by Purchase
                </th>

                <th scope="col" className="px-3 py-2 font-normal">
                  Images
                </th>
               {/* <th scope="col" className="px-4 py-2 font-normal sm:pl-6">
                  Id
          </th>
                <th scope="col" className="px-3 py-2 font-normal">
                  Created Date
                </th>
                <th scope="col" className="px-3 py-2 font-normal">
                  Updated Date
                </th>*/}
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white border">
              {purchases?.map((purchase) => (
                <tr
                  key={purchase.id}
                  className="w-full border py-3 text-xs last-of-type:border-none [&:first-child>td:first-child]:rounded-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg hover:bg-gray-50">
                  <td className="whitespace-nowrap  px-3 py-1 hover:border hover:border-blue-300">
                   {purchase.box_id}
                  </td>
                  <td className="whitespace-nowrap px-3 py-1 hover:border hover:border-blue-300">
                    {purchase.noitem}
                  </td>
                  <td className="whitespace-nowrap   px-3 py-1 hover:border hover:border-blue-300">
                    {purchase.name}
                  </td>
                  <td className="whitespace-nowrap  px-3 py-1 hover:border hover:border-blue-300">
                    {purchase.qty}
                  </td>
                  <td className="whitespace-nowrap  px-3 py-1 hover:border hover:border-blue-300">
                   {formatCurrency(purchase.cost)}
                  </td>
                 {/* <td className="whitespace-nowrap  px-3 py-1 hover:border hover:border-blue-300">
                   {formatCurrency(purchase.investment_dollar)}
              </td>*/}
                  <td className="whitespace-nowrap  px-3 py-1 hover:border hover:border-blue-300">
                   {formatCurrencyGT(purchase.costotal)}
                  </td>
                  <td className="whitespace-nowrap  px-3 py-1 hover:border hover:border-blue-300">
                   {formatCurrencyGT(purchase.costshipus)}
                  </td>
                  <td className="whitespace-nowrap  px-3 py-1 hover:border hover:border-blue-300">
                   {formatCurrencyGT(purchase.costshippinggt)}
                  </td>
                  <td className="whitespace-nowrap  px-3 py-1 hover:border hover:border-blue-300">
                   {formatCurrencyGT(purchase.costtotalshippingu)}
                  </td>
                  <td className="whitespace-nowrap  px-3 py-1 hover:border hover:border-blue-300">
                   {formatCurrency(purchase.costtotalbypurchase)}
                  </td>
                  <td className="whitespace-nowrap  px-3 py-1 text-green-600 hover:border hover:border-blue-300">
                   {formatCurrencyGT(purchase.costsaleuq)}
                  </td>
                  <td className="whitespace-nowrap  px-3 py-1 hover:border hover:border-blue-300">
                   {formatPercent(purchase.mu)}
                  </td>
                  <td className="whitespace-nowrap  px-3 py-1 font-medium text-blue-600 hover:border hover:border-blue-300">
                   {formatCurrencyGT(purchase.pricesaleuq)}
                  </td>
                  <td className="whitespace-nowrap  px-3 py-1 hover:border hover:border-blue-300">
                   {formatCurrencyGT(purchase.utility)}
                  </td>
                  <td className="whitespace-nowrap  px-3 py-1 hover:border hover:border-blue-300">
                   {formatCurrencyGT(purchase.totalutilitybyp)}
                  </td>
                  <td className="whitespace-nowrap  px-3 py-1 hover:border hover:border-blue-300">           
                  <Image
                    src= {purchase.images[0]}
                    alt={`${purchase.id}'s profile picture`}
                    className="mr-4 rounded-sm"
                    width={40}
                    height={40}
                  />         
                  </td>
                  {/*<td className="whitespace-nowrap px-3 py-1 hover:border hover:border-blue-300">
                    {purchase.id}
            </td>
                  <td className="whitespace-nowrap  px-3 py-1 hover:border hover:border-blue-300">
                   {formatDateToLocal(purchase.create_date)}
                  </td>
                  <td className="whitespace-nowrap  px-3 py-1 hover:border hover:border-blue-300">
                   {formatDateToLocal(purchase.updated_date)}
                  </td>*/}
                  <td className="whitespace-nowrap py-1 pl-6 pr-3 hover:border hover:border-blue-300">
                    <div className="flex justify-end gap-1">
                     <UpdateBox id={purchase.id} />
                      <DeletePurchase id={purchase.id} />
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
