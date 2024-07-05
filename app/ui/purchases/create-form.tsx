'use client';
import { CategoryField, BoxField } from '@/app/lib/definitions';
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
  PhotoIcon,
  DocumentPlusIcon
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createCategory } from '@/app/lib/actions';
import { useFormState } from 'react-dom';

export default function Form({ categories , boxes}: { purchases: CategoryField[] , boxes: BoxField[] }) { 
  
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createCategory, initialState);

  const handleInputChange = e => {
    console.log(e.target.value)
    const {name,value}= e.target
   /* setValues({
        ...values,
        [name]:value
    })
    if(validateOnChange)
    validate({ [name]: value})*/
}

  return (
    <div>
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">


        {/* purchase noitem */}
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

{/* Box Id */}
<div className="mb-4">
          <label htmlFor="box_id" className="mb-2 block text-sm font-medium">
            Choose box
          </label>
          <div className="relative">
            <select
              id="box"
              name="box_id"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"

            >
              <option value="" disabled>
                Select a box
              </option>
              {boxes.map((box) => (
                <option key={box.id} value={box.box_id}>
                  {box.box_id+"_"+box.status}
                </option>
              ))}
            </select>
            <ArchiveBoxArrowDownIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>





  {/* purchase Name */}
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
              <InformationCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
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
            <TagIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
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

 {/* purchase qty */}
 <div className="mb-4">
          <label htmlFor="qty" className="mb-2 block text-sm font-medium">
          qty
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="qty"
                name="qty"
                type="number"
                step="1"
                value={values.qty}
                onChange={handleInputChange}
                placeholder="Enter qty"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="qty-error"
              />
              <DocumentPlusIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
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

         {/* purchase investment_dollar */}
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

                placeholder="Enter investment_dollar"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="investment_dollar-error"
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
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


         {/* purchase cost. U $ */}
         <div className="mb-4">
          <label htmlFor="cost" className="mb-2 block text-sm font-medium">
          Cost U.$
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="cost"
                name="cost"
                type="text"
                value={state.qty}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="cost-error"
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="cost-error" aria-live="polite" aria-atomic="true">
        {state.errors?.cost&&
          state.errors.cost.map((error: string) => (
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
        <Button type="submit">+ Add</Button>
      </div>
    </form>


    <div>
            <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-xs font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Item number
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Box
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Name
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {categories.map((category, index) => (
                <tr
                  key={index}
                  className="w-full border-b py-3 text-xs last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap px-3 py-3">
                    {index}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {category.name}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {category.id}
                  </td>
 
                </tr>
              ))}
            </tbody>
          </table>
    </div>
    </div>


  );
}