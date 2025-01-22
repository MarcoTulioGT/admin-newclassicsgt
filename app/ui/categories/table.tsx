import Image from 'next/image';
import { UpdateBox, DeleteCategory } from '@/app/ui/categories/buttons';
import CategoryStatus from '@/app/ui/categories/status';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchFilteredCategories } from '@/app/lib/data';

export default async function BoxesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const categories = await fetchFilteredCategories(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {categories?.map((category) => (
              <div
                key={category.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="text-sm text-gray-500">{category.name}</p>
                  </div>
                  <CategoryStatus status={category.status} />
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {formatCurrency(category.description)}
                    </p>
                    <p>{category.orderno}</p>
                  </div>
                  <div className="flex justify-end gap-1">
                    <UpdateBox id={category.id} />
                    <DeleteCategory id={category.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-600 sm:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-2 font-medium sm:pl-6">
                  Id
                </th>
                <th scope="col" className="px-3 py-2 font-medium">
                  Order
                </th>
                <th scope="col" className="px-3 py-2 font-medium">
                  Category
                </th>
                <th scope="col" className="px-3 py-2 font-medium">
                  Description
                </th>
                <th scope="col" className="px-3 py-2 font-medium">
                  Logo
                </th>
                <th scope="col" className="px-3 py-2 font-medium">
                  Created Date
                </th>
                <th scope="col" className="px-3 py-2 font-medium">
                  Status
                </th>
               { /* <th scope="col" className="px-3 py-2 font-medium">
                  Updated Date
                </th> */}
                <th scope="col" className="px-4 py-2 font-medium sm:pl-6">
                  Parent Id
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white border">
              {categories?.map((category) => (
                <tr
                  key={category.id}
                  className="w-full border py-3 text-xs last-of-type:border-none [&:first-child>td:first-child]:rounded-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg hover:bg-gray-50">
                  <td className="whitespace-nowrap px-3 py-1 hover:border hover:border-blue-300">
                    {category.id}
                  </td>
                  <td className="whitespace-nowrap   px-3 py-1 hover:border hover:border-blue-300">
                    {category.ordenno}
                  </td>
                  <td className="whitespace-nowrap  px-3 py-1 hover:border hover:border-blue-300">
                    {category.name}
                  </td>
                  <td className="whitespace-nowrap  px-3 py-1 hover:border hover:border-blue-300">
                   {category.description}
                  </td>
                  <td className="whitespace-nowrap  px-3 py-1 hover:border hover:border-blue-300">           
                  <Image
                    src= {category.picture}
                    alt={`${category.id}'s profile picture`}
                    className="mr-4 rounded-sm"
                    width={40}
                    height={40}
                  />         
                  </td>
                  <td className="whitespace-nowrap  px-3 py-1 hover:border hover:border-blue-300">
                   {formatDateToLocal(category.create_date)}
                  </td>
                  <td className="whitespace-nowrap  px-3 py-1 hover:border hover:border-blue-300">
                    <CategoryStatus status={category.status} />
                  </td>
                 {/* <td className="whitespace-nowrap  px-3 py-1 hover:border hover:border-blue-300">
                   {formatDateToLocal(category.updated_date)}
                  </td>*/}
                  <td className="whitespace-nowrap px-3 py-1 hover:border hover:border-blue-300">
                    {category.parentid === null ? 0 : category.parentid }
                  </td>
                  <td className="whitespace-nowrap py-1 pl-6 pr-3 hover:border hover:border-blue-300">
                    <div className="flex justify-end gap-1">
                     <UpdateBox id={category.id} />
                      <DeleteCategory id={category.id} />
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
