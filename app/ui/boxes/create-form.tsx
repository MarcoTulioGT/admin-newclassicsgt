'use client';

import { CustomerField } from '@/app/lib/definitions';
import Link from 'next/link';
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
import { Button } from '@/app/ui/button';
import { createBox } from '@/app/lib/actions';
import { useFormState } from 'react-dom';

export default function Form({ }) {
  
  
  
  
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createBox, initialState);
  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">

        {/* Box Cost */}
        <div className="mb-4">
          <label htmlFor="cost" className="mb-2 block text-sm font-medium">
            Choose a cost
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="cost"
                name="cost"
                type="number"
                step="0.01"
                placeholder="Enter USD cost"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="cost-error"
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="cost-error" aria-live="polite" aria-atomic="true">
        {state.errors?.cost &&
          state.errors.cost.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
          </div>
        </div>


            {/* Box DeliveryDate */}
            <div className="mb-4">
          <label htmlFor="cost" className="mb-2 block text-sm font-medium">
            Choose a delivered date
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="delivery_date"
                name="delivery_date"
                type="date"
                placeholder="Enter date"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="delivery_date-error"
              />
              <CalendarDaysIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="delivery_date-error" aria-live="polite" aria-atomic="true">
        {state.errors?.delivery_date &&
          state.errors.delivery_date.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
          </div>
        </div>



       {/* Box Status */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Set the box status
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="filling"
                  name="status"
                  type="radio"
                  value="filling"
                  defaultChecked="filling"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="filling"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  Filling <ArchiveBoxArrowDownIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="paid"
                  name="status"
                  type="radio"
                  value="paid"
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
          href="/ui/dashboard/boxes"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit" >Create Box</Button>
      </div>
    </form>
  );
}
