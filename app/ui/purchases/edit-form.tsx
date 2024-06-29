'use client';

import { CategoriesFields, CategoryForm } from '@/app/lib/definitions';
import {
  XCircleIcon, CheckCircleIcon, ListBulletIcon, TagIcon, InformationCircleIcon, PhotoIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { updatePurchase } from '@/app/lib/actions';
import { useFormState } from 'react-dom';
import { formatDateToLocal, formatDateGT } from '@/app/lib/utils';


export default function EditPurchaseForm({
    purchase,
    boxes,
}: {
    purchase: CategoryForm;
    boxes: CategoriesField[];
}) {
  
  
  const initialState = { message: null, errors: {} };
  const updatePurchaseWithId = updatePurchase.bind(null, purchase.id);
  const [state, dispatch] = useFormState(updatePurchaseWithId, initialState);
  console.log(purchase)
  
  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">


        {/* Category noitem */}
        <div className="mb-4">
          <label htmlFor="noitem" className="mb-2 block text-sm font-medium">
            Item Number
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="noitem"
                name="noitem"
                type="text"
                defaultValue={purchase.noitem}
                placeholder="Enter order number"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="noitem-error"
              />
              <ListBulletIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="noitem-error" aria-live="polite" aria-atomic="true">
        {state.errors?.noitem &&
          state.errors.noitem.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
          </div>
        </div>


 {/* Category box_id */}
 <div className="mb-4">
          <label htmlFor="box_id" className="mb-2 block text-sm font-medium">
            Choose a box
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="box_id"
                name="box_id"
                type="text"
                defaultValue={purchase.box_id}
                placeholder="Enter box_id"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="box_id-error"
              />
              <TagIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="box_id-error" aria-live="polite" aria-atomic="true">
        {state.errors?.box_id &&
          state.errors.box_id.map((error: string) => (
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
                defaultValue={purchase.name}
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

 {/* Category qty */}
 <div className="mb-4">
          <label htmlFor="qty" className="mb-2 block text-sm font-medium">
          qty
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="qty"
                name="qty"
                type="text"
                defaultValue={purchase.qty}
                placeholder="Enter qty"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="qty-error"
              />
              <InformationCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="qty-error" aria-live="polite" aria-atomic="true">
        {state.errors?.qty &&
          state.errors.qty.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
          </div>
        </div>

         {/* Category investment_dollar */}
 <div className="mb-4">
          <label htmlFor="investment_dollar" className="mb-2 block text-sm font-medium">
          Investment $
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="investment_dollar"
                name="investment_dollar"
                type="text"
                defaultValue={purchase.investment_dollar}
                placeholder="Enter investment_dollar"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="investment_dollar-error"
              />
              <InformationCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="investment_dollar-error" aria-live="polite" aria-atomic="true">
        {state.errors?.investment_dollar &&
          state.errors.investment_dollar.map((error: string) => (
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
                defaultValue={purchase.images}
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




        <div aria-live="polite" aria-atomic="true">
          {state.message ? (
            <p className="mt-2 text-sm text-red-500">{state.message}</p>
          ) : null}
        </div>

        
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/ui/dashboard/purchases"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Edit Purchase</Button>
      </div>
    </form>
  );
}
