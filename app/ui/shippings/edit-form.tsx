'use client';

import { ShippingForm } from '@/app/lib/definitions';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
  CalendarDaysIcon,
  TruckIcon,
  BanknotesIcon,
  ArchiveBoxArrowDownIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { updateShipping } from '@/app/lib/actions';
import { useFormState } from 'react-dom';
import { formatDateToLocal, formatDateGT, formatCurrencyGT } from '@/app/lib/utils';


export default function EditShippingForm({
  shipping,
}: {
  shipping: ShippingForm;
}) {
  
  
  const initialState = { message: null, errors: {} };
  const updateShippingWithId = updateShipping.bind(null, shipping.id);
  const [state, dispatch] = useFormState(updateShippingWithId, initialState);

  
  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">

        {/* Shipping Cost */}
        <div className="mb-4">
          <label htmlFor="shipping_cost" className="mb-2 block text-sm font-medium">
            Update shipping shipping_cost
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="shipping_cost"
                name="shipping_cost"
                type="number"
                step="0.01"
                defaultValue={shipping.shipping_cost/100}
                placeholder="Enter USD shipping_cost"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="shipping_cost-error"
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="shipping_cost-error" aria-live="polite" aria-atomic="true">
        {state.errors?.shipping_cost &&
          state.errors.shipping_cost.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
          </div>
        </div>


        {/* Shipping Status */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Set the shipping status
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="backordered"
                  name="status"
                  type="radio"
                  value="backordered"
                  defaultChecked={shipping.status === 'backordered'}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="backordered"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  Backordered <ArchiveBoxArrowDownIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="paid"
                  name="status"
                  type="radio"
                  value="paid"
                  defaultChecked={shipping.status === 'paid'}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="paid"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-600 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Paid <BanknotesIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="intransit"
                  name="status"
                  type="radio"
                  value="intransit"
                  defaultChecked={shipping.status === 'intransit'}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="intransit"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-blue-600 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Intransit <TruckIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="delivered"
                  name="status"
                  type="radio"
                  value="delivered"
                  defaultChecked={shipping.status === 'delivered'}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="delideliveredvery"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-slate-700 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Delivered <CheckIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
            <div id="status-error" aria-live="polite" aria-atomic="true">
        {state.errors?.status &&
          state.errors.status.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
          </div>
        </fieldset>

        <div aria-live="polite" aria-atomic="true">
          {state.message ? (
            <p className="mt-2 text-sm text-red-500">{state.message}</p>
          ) : null}
        </div>

        
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/ui/dashboard/shippings"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Edit shipping</Button>
      </div>
    </form>
  );
}
