import Image from 'next/image';
import { UpdateBox, DeleteBox } from '@/app/ui/boxes/buttons';
import BoxStatus from '@/app/ui/boxes/status';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchFilteredBoxes } from '@/app/lib/data';

export default async function BoxesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const boxes = await fetchFilteredBoxes(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {boxes?.map((box) => (
              <div
                key={box.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="text-sm text-gray-500">{box.box_id}</p>
                  </div>
                  <BoxStatus status={box.status} />
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {formatCurrency(box.cost)}
                    </p>
                    <p>{formatDateToLocal(box.delivery_date)}</p>
                  </div>
                  <div className="flex justify-end gap-1">
                    <UpdateBox id={box.id} />
                    <DeleteBox id={box.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-600 sm:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-2 font-medium sm:pl-6">
                  Box
                </th>
                <th scope="col" className="px-3 py-2 font-medium">
                  Cost
                </th>
                <th scope="col" className="px-3 py-2 font-medium">
                  Status
                </th>
                <th scope="col" className="px-3 py-2 font-medium">
                  Delivered Date
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white border">
              {boxes?.map((box) => (
                <tr
                  key={box.id}
                  className="w-full border py-3 text-xs last-of-type:border-none [&:first-child>td:first-child]:rounded-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg hover:bg-gray-50">
                  <td className="whitespace-nowrap px-3 py-1 hover:border hover:border-blue-300">
                    {box.box_id}
                  </td>
                  <td className="whitespace-nowrap  px-3 py-1 hover:border hover:border-blue-300">
                    {formatCurrency(box.cost)}
                  </td>
                  <td className="whitespace-nowrap  px-3 py-1 hover:border hover:border-blue-300">
                    <BoxStatus status={box.status} />
                  </td>
                  <td className="whitespace-nowrap   px-3 py-1 hover:border hover:border-blue-300">
                    {formatDateToLocal(box.delivery_date)}
                  </td>
                  <td className="whitespace-nowrap py-1 pl-6 pr-3 hover:border hover:border-blue-300">
                    <div className="flex justify-end gap-1">
                     <UpdateBox id={box.id} />
                      <DeleteBox id={box.id} />
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
