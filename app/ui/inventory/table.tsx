import Image from 'next/image';
import { UpdateBox, DeleteCategory } from '@/app/ui/categories/buttons';
import CategoryStatus from '@/app/ui/categories/status';
import { formatDateToLocal, formatCurrency , formatCurrencyGT} from '@/app/lib/utils';
import { fetchFilteredProducts } from '@/app/lib/data';

export default async function ProductsTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const products = await fetchFilteredProducts(query, currentPage);

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
                  Cant. purchase
                </th>
                <th scope="col" className="px-3 py-2 font-medium">
                  Cant. sold
                </th>
                <th scope="col" className="px-3 py-2 font-medium">
                  Cant. available
                </th>
                <th scope="col" className="px-3 py-2 font-medium">
                  Total Investment by product GTQ
                </th>
                <th scope="col" className="px-3 py-2 font-medium">
                  Total Ganancia by product GTQ
                </th>
                <th scope="col" className="px-3 py-2 font-medium">
                  Total Sale by product GTQ
                </th>
                <th scope="col" className="px-3 py-2 font-medium">
                  Categories
                </th>
                <th scope="col" className="px-3 py-2 font-medium">
                  Images
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
                    {product.qtypurchase}
                  </td>
                  <td className="whitespace-nowrap  px-3 py-1 hover:border hover:border-blue-300">
                   {product.qtysale}
                  </td>
                  <td className="whitespace-nowrap  px-3 py-1 hover:border hover:border-blue-300">
                   {product.qtypurchase-product.qtysale}
                  </td>
                  <td className="whitespace-nowrap  px-3 py-1 hover:border hover:border-blue-300">
                   {formatCurrencyGT(product.costotal)}
                  </td>
                  <td className="whitespace-nowrap  px-3 py-1 text-green-600  hover:border hover:border-blue-300">
                   {formatCurrencyGT(product.ganancia)}
                  </td>
                  <td className="whitespace-nowrap  px-3 py-1 hover:border hover:border-blue-300">
                   {formatCurrencyGT(product.total)}
                  </td>
                  <td className="whitespace-nowrap  px-3 py-1 hover:border hover:border-blue-300">
                   {product.category}
                  </td>
                  <td className="whitespace-nowrap  px-3 py-1 hover:border hover:border-blue-300">           
                  <Image
                    src= {product.images[0]}
                    alt={`${product.id}'s profile picture`}
                    className="mr-4 rounded-sm"
                    width={40}
                    height={40}
                  />         
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
