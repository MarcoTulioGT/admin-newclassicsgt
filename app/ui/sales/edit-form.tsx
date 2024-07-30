'use client';

import { SaleForm } from '@/app/lib/definitions';
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
  DocumentPlusIcon,
  ReceiptPercentIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { updateSale } from '@/app/lib/actions';
import { useFormState } from 'react-dom';
import { formatDateToLocal, formatDateGT } from '@/app/lib/utils';
import { useState, useEffect } from 'react';


export default function EditSaleForm({
  sale,
}: {
  sale: SaleForm;
}) {
  
  
  const initialState = { message: null, errors: {} };
  const updateSaleWithId = updateSale.bind(null, sale.id);
  const [state, dispatch] = useFormState(updateSaleWithId, initialState);
  const [qtyValue, setQty] = useState(sale.qty);
  const [priceValue, setPrice] = useState(sale.price/100);
  const [discountValue, setDiscount] = useState(sale.discount/100);

  const handleInputChangeQty = e => {
    setQty(e.target.value)
  }
  const handleInputChangePrice = e => {
    setPrice(e.target.value)
  }
  const handleInputChangeDiscount = e => {
    setDiscount(e.target.value)
  }
  console.log(sale)
  
  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">

 {/* sales qty */}
 <div className="mb-4">
          <label htmlFor="qty" className="mb-2 block text-xs font-medium">
          Qty
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="qty"
                name="qty"
                type="number"
                step="1"
                defaultValue={sale.qty}
                step="1"
                onChange={handleInputChangeQty}
                placeholder="Enter qty"
                className="peer block w-full rounded-md border bg-sky-100 hover:bg-yellow-50 border-gray-200 py-2 pl-10 text-xs outline-2 placeholder:text-gray-500"
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

 {/* sales price */}
 <div className="mb-4">
          <label htmlFor="price" className="mb-2 block text-xs font-medium">
          Choose Price
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="price"
                name="price"
                type="number"
                step="1"
                defaultValue={sale.price/100}
                step="1"
                onChange={handleInputChangePrice}
                placeholder="Enter price"
                className="peer block w-full rounded-md border bg-sky-100 hover:bg-yellow-50 border-gray-200 py-2 pl-10 text-xs outline-2 placeholder:text-gray-500"
                aria-describedby="price-error"
              />
              <DocumentPlusIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="price-error" aria-live="polite" aria-atomic="true">
        {state.errors?.price &&
          state.errors.price.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
          </div>
        </div>


 {/* sales discount */}
 <div className="mb-4">
          <label htmlFor="discount" className="mb-2 block text-xs font-medium">
          Choose Discount
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="discount"
                name="discount"
                type="number"
                step="1"
                defaultValue={sale.discount/100}
                step="1"
                onChange={handleInputChangeDiscount}
                placeholder="Enter discount"
                className="peer block w-full rounded-md border bg-sky-100 hover:bg-yellow-50 border-gray-200 py-2 pl-10 text-xs outline-2 placeholder:text-gray-500"
                aria-describedby="discount-error"
              />
              <DocumentPlusIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="discount-error" aria-live="polite" aria-atomic="true">
        {state.errors?.discount &&
          state.errors.discount.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
          </div>
        </div>


 {/* sales total */}
 <div className="mb-4">
          <label htmlFor="total" className="mb-2 block text-xs font-medium">
          Total
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="total"
                name="total"
                type="number"
                step="1"
                value={(Number(priceValue)*Number(qtyValue))- Number(discountValue)}
                step="1"
                onChange={handleInputChangeQty}
                placeholder="Enter total"
                className="peer block w-full rounded-md border  bg-gray-300 border-gray-200 py-2 pl-10 text-xs outline-2 placeholder:text-gray-500"
                aria-describedby="cost-error"
              />
              <DocumentPlusIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="total-error" aria-live="polite" aria-atomic="true">
        {state.errors?.total &&
          state.errors.total.map((error: string) => (
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
          href="/ui/dashboard/sales"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Edit Sale</Button>
      </div>
    </form>
  );
}
