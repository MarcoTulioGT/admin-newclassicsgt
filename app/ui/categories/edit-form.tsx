'use client';

import { CategoriesFields, CategoryForm } from '@/app/lib/definitions';
import {
  TruckIcon,
  BanknotesIcon,
  ArchiveBoxArrowDownIcon,
  ListBulletIcon,
  TagIcon,
  InformationCircleIcon,
  PhotoIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { updateCategory } from '@/app/lib/actions';
import { useFormState } from 'react-dom';
import { formatDateToLocal, formatDateGT } from '@/app/lib/utils';


export default function EditCategoryForm({
    category,
    categories,
}: {
    category: CategoryForm;
    categories: CategoriesField[];
}) {
  
  
  const initialState = { message: null, errors: {} };
  const updateCategoryWithId = updateCategory.bind(null, category.id);
  const [state, dispatch] = useFormState(updateCategoryWithId, initialState);

  
  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">


        {/* Category Order */}
        <div className="mb-4">
          <label htmlFor="order" className="mb-2 block text-sm font-medium">
            Choose a order
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="order"
                name="order"
                type="number"
                step="1"
                defaultValue={category.ordenno}
                placeholder="Enter order number"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="order-error"
              />
              <ListBulletIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="order-error" aria-live="polite" aria-atomic="true">
        {state.errors?.order &&
          state.errors.order.map((error: string) => (
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
                defaultValue={category.name}
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
                defaultValue={category.description}
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
                defaultValue={category.picture}
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
          href="/ui/dashboard/categories"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Edit Category</Button>
      </div>
    </form>
  );
}
