'use client';
import { DepartamentField, ProductsField } from '@/app/lib/definitions';
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
  DocumentPlusIcon,
  ReceiptPercentIcon
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createSale } from '@/app/lib/actions';
import { useFormState } from 'react-dom';
import { useState, useEffect } from 'react';
import { formatDateToLocal, formatDateGT, DollarToQt, floatToNumber, formatCurrencyGT} from '@/app/lib/utils';


export default function Form({ departamentos , products}: { departamentos: DepartamentField[] , products: ProductsField[] }) { 

  let deptos = departamentos.map(function(element, index){
    return  element.departamento
   });

  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createSale, initialState);
  const [depto, setDepto] = useState('');
  const [muni, setMuni] = useState('');
  const [zona, setZona] = useState('');
  const [municipios, setMunicipios] = useState([]);
  const [zonas, setZonas] = useState([]);
  const [qtyValue, setQty] = useState(1);
  const [priceValue, setPrice] = useState(0);
  const [discountValue, setDiscount] = useState(0);
  const [product, setProduct] = useState('')

  const handleInputChangeQty = e => {
    setQty(e.target.value)
  }
  const handleInputChangePrice = e => {
    setPrice(e.target.value)
  }
  const handleInputChangeDiscount = e => {
    setDiscount(e.target.value)
  }

  const handleSelectChangeDepto = e => {
    setDepto(e.target.value)
    let municipio = departamentos.filter( element => element.departamento === e.target.value);
    setMunicipios(municipio[0].municipio)
  }

  const handleSelectChangeMuni = e => {
    setMuni(e.target.value)
    let zona = municipios.filter( element => element.Municipio === e.target.value );
    setZonas(zona[0].zonas)
  }

  const handleSelectChangeZone= e => {
    setZona(e.target.value)
  }

  const handleSelectChangeProduct = e => {
    setProduct(e.target.value)
    const findProduct = products.find((element) => {
      return element.noitem === e.target.value
    })
    setPrice(findProduct.price)
  }


  return (
    <div>
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">

          {/* purchase Name */}
         <div className="mb-4">
          <label htmlFor="client" className="mb-2 block text-xs font-medium">
            Client name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="client"
                name="client"
                type="text"
                placeholder="Enter client"
                className="peer block w-full rounded-md border bg-sky-100 hover:bg-yellow-50 border-gray-200 py-2 pl-10 text-xs outline-2 placeholder:text-gray-500"
                aria-describedby="client-error"
              />
              <InformationCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="client-error" aria-live="polite" aria-atomic="true">
        {state.errors?.client &&
          state.errors.client.map((error: string) => (
            <p className="mt-2 text-xs text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
          </div>
        </div>

          {/* purchase Address */}
          <div className="mb-4">
          <label htmlFor="address" className="mb-2 block text-xs font-medium">
            Address
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="address"
                name="address"
                type="text"
                placeholder="Enter address"
                className="peer block w-full rounded-md border bg-sky-100 hover:bg-yellow-50 border-gray-200 py-2 pl-10 text-xs outline-2 placeholder:text-gray-500"
                aria-describedby="address-error"
              />
              <InformationCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="address-error" aria-live="polite" aria-atomic="true">
        {state.errors?.address &&
          state.errors.address.map((error: string) => (
            <p className="mt-2 text-xs text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
          </div>
        </div>




{/* departamento */}
<div className="mb-4">
          <label htmlFor="depto" className="mb-2 block text-xs font-medium">
            Choose departamento
          </label>
          <div className="relative">
            <select
              id="depto"
              name="depto"
              onChange={handleSelectChangeDepto}
              value={depto}
              className="peer block w-full cursor-pointer rounded-md border  bg-sky-100 hover:bg-yellow-50 border-gray-200 py-2 pl-10 text-xs outline-2 placeholder:text-gray-500"            
              >
              <option value="" disabled>
                Select a departamento
              </option>
              {deptos.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
            <ArchiveBoxArrowDownIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>


{/* municipio */}
<div className="mb-4">
          <label htmlFor="municipio" className="mb-2 block text-xs font-medium">
            Choose municipio
          </label>
          <div className="relative">
            <select
              id="municipio"
              name="municipio"
              onChange={handleSelectChangeMuni}
              value={muni}
              className="peer block w-full cursor-pointer rounded-md border  bg-sky-100 hover:bg-yellow-50 border-gray-200 py-2 pl-10 text-xs outline-2 placeholder:text-gray-500"            
              >
              <option value="" disabled>
                Select a municipio
              </option>
              {municipios.map((m) => (
                <option key={m.Municipio} value={m.Municipio}>
                  {m.Municipio}
                </option>
              ))}
            </select>
            <ArchiveBoxArrowDownIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

{/* zona */}
<div className="mb-4">
          <label htmlFor="zona" className="mb-2 block text-xs font-medium">
            Choose zona
          </label>
          <div className="relative">
            <select
              id="zona"
              name="zona"
              onChange={handleSelectChangeZone}
              value={zona}
              className="peer block w-full cursor-pointer rounded-md border  bg-sky-100 hover:bg-yellow-50 border-gray-200 py-2 pl-10 text-xs outline-2 placeholder:text-gray-500"            
              >
              <option value="" disabled>
                Select a zona
              </option>
              {zonas.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
            <ArchiveBoxArrowDownIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>


        {/* phone */}
        <div className="mb-4">
          <label htmlFor="phone" className="mb-2 block text-xs font-medium">
          Phone number
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative ">
              <input
                id="phone"
                name="phone"
                type="text"                
                placeholder="Enter phone number"
                className="peer block w-full rounded-md border bg-sky-100 hover:bg-yellow-50 border-gray-200 py-2 pl-10 text-xs outline-2 placeholder:text-gray-500"
                aria-describedby="phone-error"
              />
              <ListBulletIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="phone-error" aria-live="polite" aria-atomic="true">
        {state.errors?.phone &&
          state.errors.phone.map((error: string) => (
            <p className="mt-2 text-xs text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
          </div>
        </div>


 {/* shipping cost */}
 <div className="mb-4">
          <label htmlFor="shipcost" className="mb-2 block text-xs font-medium">
          Shipping Cost
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="shipcost"
                name="shipcost"
                type="number"
                step="1"
                defaultValue="0"
                placeholder="Enter Shipping cost"
                className="peer block w-full rounded-md border bg-sky-100 hover:bg-yellow-50 border-gray-200 py-2 pl-10 text-xs outline-2 placeholder:text-gray-500"
                aria-describedby="shipcost-error"
              />
              <DocumentPlusIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="shipcost-error" aria-live="polite" aria-atomic="true">
        {state.errors?.shipcost &&
          state.errors.shipcost.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
          </div>
        </div>


<div className="mb-4">
          <label htmlFor="product" className="mb-2 block text-xs font-medium">
            Choose product
          </label>
          <div className="relative">
            <select
              id="product"
              name="product"
              value={product}
              onChange={handleSelectChangeProduct}
              className="peer block w-full cursor-pointer rounded-md border  bg-sky-100 hover:bg-yellow-50 border-gray-200 py-2 pl-10 text-xs outline-2 placeholder:text-gray-500"            
              >
              <option value="" disabled>
                Select a product
              </option>
              {products.map((m) => (

                <option key={m.noitem} value={m.noitem}>                  
                  {m.category} - {m.noitem} - {m.name} - {formatCurrencyGT(m.price)}
                </option>
              ))}
            </select>
            <ArchiveBoxArrowDownIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>



 {/* purchase qty */}
 <div className="mb-4">
          <label htmlFor="qty" className="mb-2 block text-xs font-medium">
          Qty
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative" >
              <input
                id="qty"
                name="qty"
                type="number"
                min="1"
                step="1"
                value={qtyValue}
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
            <p className="mt-2 text-xs text-red-500" key={error}>
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
                value={priceValue/100}
                onChange={handleInputChangePrice}
                placeholder="Enter price"
                className="peer block w-full rounded-md border  bg-gray-300 border-gray-200 py-2 pl-10 text-xs outline-2 placeholder:text-gray-500"
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
                value={discountValue}
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
                value={(Number(priceValue/100)*Number(qtyValue))- Number(discountValue)}
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
            <p className="mt-2 text-xs text-red-500">{state.message}</p>
          ) : null}
        </div>


      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/ui/dashboard/sales"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Add Purchase</Button>
      </div>
    </form>
    <div>      
    </div>
    </div>
  );
}