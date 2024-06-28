'use client';
import { CategoryField, OrdennoField } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
  CalendarDaysIcon,
  TruckIcon,
  BanknotesIcon,
  ArchiveBoxArrowDownIcon,
  CheckCircleIcon,
  XCircleIcon,
  ListBulletIcon,
  TagIcon,
  InformationCircleIcon,
  PhotoIcon
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createCategory, OrdennoField } from '@/app/lib/actions';
import { useFormState } from 'react-dom';

export default function Form({ categories , ordenno}: { categories: CategoryField[] , ordenno: OrdennoField }) { 
  
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createCategory, initialState);


  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
     

                {/* Parentid Name */}
                <div className="mb-4">
          <label htmlFor="parentid" className="mb-2 block text-sm font-medium">
            Choose parent category
          </label>
          <div className="relative">
            <select
              id="parentid"
              name="parentid"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="parentid-error"
            >
              <option value="" disabled>
                Select a categories
              </option>
              {categories.map((category) => (
                <option key={category.id == null ? 0: category.id} value={category.id == null ? 0: category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="parentid-error" aria-live="polite" aria-atomic="true">
        {state.errors?.parentid &&
          state.errors.parentid.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
        </div>

        {/* Category Order */}
        <div className="mb-4">
          <label htmlFor="ordenno" className="mb-2 block text-sm font-medium">
            Choose a order
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="ordenno"
                name="ordenno"
                type="number"         
                defaultValue={ordenno.ordenno}
                step="1"
                placeholder="Enter order number"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="ordenno-error"
              />
              <ListBulletIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="ordenno-error" aria-live="polite" aria-atomic="true">
        {state.errors?.ordenno &&
          state.errors.ordenno.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
          </div>
        </div>

  {/* Category Name */}
  <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Choose a name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter name"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="name-error"
              />
              <TagIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="name-error" aria-live="polite" aria-atomic="true">
        {state.errors?.name &&
          state.errors.name.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
          </div>
        </div>

 {/* Category Description */}
 <div className="mb-4">
          <label htmlFor="description" className="mb-2 block text-sm font-medium">
            Choose a description
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="description"
                name="description"
                type="text"
                placeholder="Enter description"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="description-error"
              />
              <InformationCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="description-error" aria-live="polite" aria-atomic="true">
        {state.errors?.description &&
          state.errors.description.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
          </div>
        </div>


         {/* Category Picture */}
 <div className="mb-4">
          <label htmlFor="picture" className="mb-2 block text-sm font-medium">
            Choose a picture
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="picture"
                name="picture"
                type="text"
                placeholder="Enter picture"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="picture-error"
              />
              <PhotoIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="picture-error" aria-live="polite" aria-atomic="true">
        {state.errors?.picture &&
          state.errors.picture.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
          </div>
        </div>

        {/* Category Status */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Set the category status
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="enabled"
                  name="status"
                  type="radio"
                  value="enabled"
                  defaultChecked="enabled"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="enabled"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-600 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Enabled <CheckCircleIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="disabled"
                  name="status"
                  type="radio"
                  value="disabled"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="disabled"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-slate-700 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Disabled <XCircleIcon className="h-4 w-4" />
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
          href="/ui/dashboard/categories"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit" >Create Category</Button>
      </div>
    </form>
  );
}
