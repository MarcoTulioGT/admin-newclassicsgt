import Image from 'next/image';
import { UpdateBox, DeleteCategory } from '@/app/ui/categories/buttons';
import CategoryStatus from '@/app/ui/categories/status';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchFilteredProducts } from '@/app/lib/data';

export default async function ProductsTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const products = await fetchFilteredProducts(query, currentPage);
 console.log(products)
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {products?.map((product) => (
              <div
                key={product.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="text-sm text-gray-500">{product.name}</p>
                  </div>
                  <CategoryStatus status={product.status} />
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {formatCurrency(product.noitem)}
                    </p>
                    <p>{product.status}</p>
                  </div>
                  <div className="flex justify-end gap-1">
                    <UpdateBox id={product.id} />
                    <DeleteCategory id={product.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-600 sm:table">
            <thead className="rounded-lg text-left text-xs font-normal">
              <tr>
                <th scope="col" className="px-4 py-2 font-medium sm:pl-6">
                  No Item
                </th>
                <th scope="col" className="px-4 py-2 font-medium sm:pl-6">
                  Name
                </th>
                <th scope="col" className="px-3 py-2 font-medium">
                  Cnt Avail
                </th>
                <th scope="col" className="px-3 py-2 font-medium">
                  Count Sold
                </th>
                <th scope="col" className="px-3 py-2 font-medium">
                  Count Incoming
                </th>
                <th scope="col" className="px-3 py-2 font-medium">
                  Investment $
                </th>
                <th scope="col" className="px-3 py-2 font-medium">
                  Unit Price Purchase
                </th>
                <th scope="col" className="px-3 py-2 font-medium">
                  Sum price purchase Q
                </th>
                <th scope="col" className="px-3 py-2 font-medium">
                  Cost Shipping US
                </th>
                <th scope="col" className="px-3 py-2 font-medium">
                  Cost Shipping GT
                </th>
                <th scope="col" className="px-3 py-2 font-medium">
                  Cost Shipping Unit Total
                </th>
                <th scope="col" className="px-3 py-2 font-medium">
                  Purchase Price
                </th>
                <th scope="col" className="px-3 py-2 font-medium">
                  Profit %
                </th>
                <th scope="col" className="px-3 py-2 font-medium">
                  Sale Price
                </th>
                <th scope="col" className="px-3 py-2 font-medium">
                  Utility
                </th>
                <th scope="col" className="px-3 py-2 font-medium">
                  Box
                </th>
                <th scope="col" className="px-3 py-2 font-medium">
                  Categories
                </th>
                <th scope="col" className="px-3 py-2 font-medium">
                  Images
                </th>
                <th scope="col" className="px-3 py-2 font-medium">
                  Created Date
                </th>
                <th scope="col" className="px-3 py-2 font-medium">
                  Status
                </th>
                <th scope="col" className="px-3 py-2 font-medium">
                  Updated Date
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white border">
              {products?.map((product) => (
                <tr
                  key={product.id}
                  className="w-full border py-3 text-xs last-of-type:border-none [&:first-child>td:first-child]:rounded-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg hover:bg-gray-50">
                  <td className="whitespace-nowrap px-3 py-1 hover:border hover:border-blue-300">
                    {product.noitem}
                  </td>
                  <td className="whitespace-nowrap   px-3 py-1 hover:border hover:border-blue-300">
                    {product.name}
                  </td>
                  <td className="whitespace-nowrap  px-3 py-1 hover:border hover:border-blue-300">
                    {product.count_available}
                  </td>
                  <td className="whitespace-nowrap  px-3 py-1 hover:border hover:border-blue-300">
                   {product.count_sold}
                  </td>
                  <td className="whitespace-nowrap  px-3 py-1 hover:border hover:border-blue-300">
                   {product.count_incoming}
                  </td>
                  <td className="whitespace-nowrap  px-3 py-1 hover:border hover:border-blue-300">
                   {product.investment_dollar}
                  </td>
                  <td className="whitespace-nowrap  px-3 py-1 hover:border hover:border-blue-300">
                   {product.unit_price_purchase}
                  </td>
                  <td className="whitespace-nowrap  px-3 py-1 hover:border hover:border-blue-300">
                   {product.sum_price_purchaseq}
                  </td>
                  <td className="whitespace-nowrap  px-3 py-1 hover:border hover:border-blue-300">
                   {product.cost_shipping_us}
                  </td>
                  <td className="whitespace-nowrap  px-3 py-1 hover:border hover:border-blue-300">
                   {product.cost_shipping_gt}
                  </td>
                  <td className="whitespace-nowrap  px-3 py-1 hover:border hover:border-blue-300">
                   {product.cost_shipping_unit_total}
                  </td>
                  <td className="whitespace-nowrap  px-3 py-1 hover:border hover:border-blue-300">
                   {product.purchase_price}
                  </td>
                  <td className="whitespace-nowrap  px-3 py-1 hover:border hover:border-blue-300">
                   {product.profit_percentage}
                  </td>
                  <td className="whitespace-nowrap  px-3 py-1 hover:border hover:border-blue-300">
                   {product.sale_price}
                  </td>
                  <td className="whitespace-nowrap  px-3 py-1 hover:border hover:border-blue-300">
                   {product.utility}
                  </td>
                  <td className="whitespace-nowrap  px-3 py-1 hover:border hover:border-blue-300">
                   {product.box}
                  </td>
                  <td className="whitespace-nowrap  px-3 py-1 hover:border hover:border-blue-300">
                   {product.categories}
                  </td>
                  <td className="whitespace-nowrap  px-3 py-1 hover:border hover:border-blue-300">           
                  <Image
                    src= {product.picture[0]}
                    alt={`${product.id}'s profile picture`}
                    className="mr-4 rounded-sm"
                    width={40}
                    height={40}
                  />         
                  </td>
                  <td className="whitespace-nowrap  px-3 py-1 hover:border hover:border-blue-300">
                   {formatDateToLocal(product.create_date)}
                  </td>
                  <td className="whitespace-nowrap  px-3 py-1 hover:border hover:border-blue-300">
                    <CategoryStatus status={product.status} />
                  </td>
                  <td className="whitespace-nowrap  px-3 py-1 hover:border hover:border-blue-300">
                   {formatDateToLocal(product.updated_date)}
                  </td>
                  <td className="whitespace-nowrap py-1 pl-6 pr-3 hover:border hover:border-blue-300">
                    <div className="flex justify-end gap-1">
                     <UpdateBox id={product.id} />
                      <DeleteCategory id={product.id} />
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
