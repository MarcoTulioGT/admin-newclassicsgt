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
  DocumentPlusIcon,
  ReceiptPercentIcon
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createPurchase } from '@/app/lib/actions';
import { useFormState } from 'react-dom';
import { useState, useEffect } from 'react';
import { formatDateToLocal, formatDateGT, DollarToQt, floatToNumber} from '@/app/lib/utils';


export default function Form({ categories , boxes}: { purchases: CategoryField[] , boxes: BoxField[] }) { 
  
  const initialState = { message: null, errors: {} };
  const [qtyValue, setQty] = useState(1);
  const [invValue, setInv] = useState(1);
  const [costshipusValue, setCostshipus] = useState(1);
  const [costshipgtValue, setCostshipgt] = useState(DollarToQt(1));
  const [muValue, setMU] = useState(25);
  const [state, dispatch] = useFormState(createPurchase, initialState);
  const [countImages, setCountImages] = useState(3)

  const handleInputChangeQty = e => {
      setQty(e.target.value)
    }

    const handleInputChangeInv = e => {
      setInv(e.target.value)
      }

    const handleInputChangeCostshipUS = e => {
    setCostshipus(e.target.value)
    }
    
    const handleInputChangeCostShippingGT = e => {
      setCostshipgt(e.target.value)
    }


    const handleInputChangeMU = e => {
       setMU(e.target.value)
    }

    const inputImage = () => {
      let content = [];
      for (let i = 0; i < countImages.length; i++) {
        console.log(i)
          content.push(<input key={i} type="url" value="image" />);
      }
      return content;
    }

  return (
    <div>
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">


        {/* purchase noitem */}
        <div className="mb-4">
          <label htmlFor="noitem" className="mb-2 block text-xs font-medium">
            Item Number
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative ">
              <input
                id="noitem"
                name="noitem"
                type="text"                
                placeholder="Enter order number"
                className="peer block w-full rounded-md border bg-sky-100 hover:bg-yellow-50 border-gray-200 py-2 pl-10 text-xs outline-2 placeholder:text-gray-500"
                aria-describedby="noitem-error"
              />
              <ListBulletIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="noitem-error" aria-live="polite" aria-atomic="true">
        {state.errors?.noitem &&
          state.errors.noitem.map((error: string) => (
            <p className="mt-2 text-xs text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
          </div>
        </div>

{/* Box Id */}
<div className="mb-4">
          <label htmlFor="box_id" className="mb-2 block text-xs font-medium">
            Choose box
          </label>
          <div className="relative">
            <select
              id="box"
              name="box_id"
              className="peer block w-full cursor-pointer rounded-md border  bg-sky-100 hover:bg-yellow-50 border-gray-200 py-2 pl-10 text-xs outline-2 placeholder:text-gray-500"            
              >
              <option value="" disabled>
                Select a box
              </option>
              {boxes.map((box) => (
                <option key={box.id} value={box.id}>
                  {box.box_id+"_"+box.status+"_"+box.id}
                </option>
              ))}
            </select>
            <ArchiveBoxArrowDownIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>





  {/* purchase Name */}
  <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-xs font-medium">
            Choose a name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter name"
                className="peer block w-full rounded-md border bg-sky-100 hover:bg-yellow-50 border-gray-200 py-2 pl-10 text-xs outline-2 placeholder:text-gray-500"
                aria-describedby="name-error"
              />
              <InformationCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="name-error" aria-live="polite" aria-atomic="true">
        {state.errors?.name &&
          state.errors.name.map((error: string) => (
            <p className="mt-2 text-xs text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
          </div>
        </div>

                {/* Category Name */}
                <div className="mb-4">
          <label htmlFor="category" className="mb-2 block text-xs font-medium">
            Choose parent category
          </label>
          <div className="relative">
            <select
              id="category"
              name="category"
              className="peer block w-full cursor-pointer rounded-md border  bg-sky-100 hover:bg-yellow-50 border-gray-200 py-2 pl-10 text-xs outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="category-error"
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
          <div id="category-error" aria-live="polite" aria-atomic="true">
        {state.errors?.category &&
          state.errors.category.map((error: string) => (
            <p className="mt-2 text-xs text-red-500" key={error}>
              {error}
            </p>
          ))}
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
                value={qtyValue}
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
            <p className="mt-2 text-xs text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
          </div>
        </div>

         {/* purchase investment_dollar */}
 <div className="mb-4">
          <label htmlFor="investment_dollar" className="mb-2 block text-xs font-medium">
          Investment $
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="investment_dollar"
                name="investment_dollar"
                type="text"
                min="1"
                value={invValue}
                onChange={handleInputChangeInv}
                placeholder="Enter investment_dollar"
                className="peer block w-full rounded-md border bg-sky-100 hover:bg-yellow-50 border-gray-200 py-2 pl-10 text-xs outline-2 placeholder:text-gray-500"
                aria-describedby="investment_dollar-error"
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="investment_dollar-error" aria-live="polite" aria-atomic="true">
        {state.errors?.investment_dollar &&
          state.errors.investment_dollar.map((error: string) => (
            <p className="mt-2 text-xs text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
          </div>
        </div>


         {/* cost. U $ */}
         <div className="mb-4">
          <label htmlFor="cost" className="mb-2 block text-xs font-medium">
          Cost U.$
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="cost"
                name="cost"
                type="text"
                value={(invValue/qtyValue).toFixed(2) == 'Infinity' ? 0: (invValue/qtyValue).toFixed(2) }
                className="peer block w-full rounded-md border  bg-gray-300 border-gray-200 py-2 pl-10 text-xs outline-2 placeholder:text-gray-500"
                aria-describedby="cost-error"
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="cost-error" aria-live="polite" aria-atomic="true">
        {state.errors?.cost&&
          state.errors.cost.map((error: string) => (
            <p className="mt-2 text-xs text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
          </div>
        </div>



  {/* purchase Cost. Total Q*/}
  <div className="mb-4">
          <label htmlFor="costotal" className="mb-2 block text-xs font-medium">
          Cost. Total Q.
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="costotal"
                name="costotal"
                type="text"
                value={DollarToQt(invValue)}
                className="peer block w-full rounded-md border  bg-gray-300 border-gray-200 py-2 pl-10 text-xs outline-2 placeholder:text-gray-500"
                aria-describedby="costotal-error"
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="costotal-error" aria-live="polite" aria-atomic="true">
        {state.errors?.costotal&&
          state.errors.costotal.map((error: string) => (
            <p className="mt-2 text-xs text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
          </div>
        </div>

{/* Cost shipping US $ */}
 <div className="mb-4">
          <label htmlFor="costshipUS" className="mb-2 block text-xs font-medium">
          Cost shipping US Q
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="costshipUS"
                name="costshipUS"
                type="text"
                min="1"
                value={costshipusValue}
                onChange={handleInputChangeCostshipUS}
                placeholder="Enter costshipUS"
                className="peer block w-full rounded-md border bg-sky-100 hover:bg-yellow-50 border-gray-200 py-2 pl-10 text-xs outline-2 placeholder:text-gray-500"
                aria-describedby="costshipUS-error"
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="costshipUS-error" aria-live="polite" aria-atomic="true">
        {state.errors?.costshipUS &&
          state.errors.costshipUS.map((error: string) => (
            <p className="mt-2 text-xs text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
          </div>
        </div>



        {/* Costo envio GT  */}
        <div className="mb-4">
          <label htmlFor="costShippingGT" className="mb-2 block text-xs font-medium">
            Choose cost shipping Q GT.
          </label>
          <div className="relative">
            <select
              id="costShippingGT"
              name="costShippingGT"
              onChange={handleInputChangeCostShippingGT}
              className="peer block w-full cursor-pointer rounded-md border  bg-gray-300 border-gray-200 py-2 pl-10 text-xs outline-2 placeholder:text-gray-500"
              >
              <option value="" disabled>   Select a shipping cost </option>
              <option key="0" value={DollarToQt(1/2)}>$.0.50 -  Q.{DollarToQt(1/2)}</option>
              <option key="1" value={DollarToQt(1)}>$.1.00  -  Q.{DollarToQt(1)}</option>
              <option key="2" value={DollarToQt(2)}>$.2.00  -  Q.{DollarToQt(2)}</option>
              <option key="3" value={DollarToQt(3)}>$.3.00  -  Q.{DollarToQt(3)}</option>
              <option key="4" value={DollarToQt(4)}>$.4.00  -  Q.{DollarToQt(4)}</option>
              <option key="5" value={DollarToQt(5)}>$.5.00  -  Q.{DollarToQt(5)}</option>
              <option key="5" value={DollarToQt(6)}>$.6.00  -  Q.{DollarToQt(6)}</option>
              <option key="5" value={DollarToQt(7)}>$.7.00  -  Q.{DollarToQt(7)}</option>
              <option key="5" value={DollarToQt(8)}>$.8.00  -  Q.{DollarToQt(8)}</option>
              <option key="5" value={DollarToQt(9)}>$.9.00  -  Q.{DollarToQt(9)}</option>
              <option key="5" value={DollarToQt(10)}>$.10.00  -  Q.{DollarToQt(10)}</option>
              <option key="5" value={DollarToQt(11)}>$.11.00  -  Q.{DollarToQt(11)}</option>
              <option key="5" value={DollarToQt(12)}>$.12.00  -  Q.{DollarToQt(12)}</option>
              <option key="5" value={DollarToQt(13)}>$.13.00  -  Q.{DollarToQt(13)}</option>
              <option key="5" value={DollarToQt(14)}>$.14.00  -  Q.{DollarToQt(14)}</option>
              <option key="5" value={DollarToQt(15)}>$.15.00  -  Q.{DollarToQt(15)}</option>
              <option key="5" value={DollarToQt(16)}>$.16.00  -  Q.{DollarToQt(16)}</option>
              <option key="5" value={DollarToQt(17)}>$.17.00  -  Q.{DollarToQt(17)}</option>
              <option key="5" value={DollarToQt(18)}>$.18.00  -  Q.{DollarToQt(18)}</option>
              <option key="5" value={DollarToQt(20)}>$.20.00  -  Q.{DollarToQt(20)}</option>
              <option key="5" value={DollarToQt(25)}>$.25.00  -  Q.{DollarToQt(25)}</option>
              <option key="5" value={DollarToQt(28)}>$.28.00  -  Q.{DollarToQt(28)}</option>
              <option key="5" value={DollarToQt(29)}>$.29.00  -  Q.{DollarToQt(29)}</option>
              <option key="5" value={DollarToQt(30)}>$.30.00  -  Q.{DollarToQt(30)}</option>
              <option key="5" value={DollarToQt(41)}>$.41.00  -  Q.{DollarToQt(41)}</option>
            </select>
            <ArchiveBoxArrowDownIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>


         {/* Cost Total shipping C/U $ */}
         <div className="mb-4">
          <label htmlFor="costtotalshippingU" className="mb-2 block text-xs font-medium">
          Cost total shipping U. Q
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="costtotalshippingU"
                name="costtotalshippingU"
                type="text"
                value={(Number(costshipusValue)+Number(costshipgtValue)).toFixed(2) == 'Infinity' ? 0: (Number(costshipusValue)+Number(costshipgtValue)).toFixed(2)  }
                className="peer block w-full rounded-md border border-gray-200   bg-gray-300 py-2 pl-10 text-xs outline-2 placeholder:text-gray-500"
                aria-describedby="costtotalshippingU-error"
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="costtotalshippingU-error" aria-live="polite" aria-atomic="true">
        {state.errors?.costtotalshippingU&&
          state.errors.costtotalshippingU.map((error: string) => (
            <p className="mt-2 text-xs text-red-500" key={error}>
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


        {/* Cost Total Envio GT by purchase*/}
        <div className="mb-4">
          <label htmlFor="costtotalbypurchase" className="mb-2 block text-xs font-medium">
          Cost Total shipping GT by purchase $
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="costtotalbypurchase"
                name="costtotalbypurchase"
                type="text"
                value={(Number(costshipgtValue)*Number(qtyValue)/DollarToQt(1)).toFixed(2) == 'Infinity' ? 0: (Number(costshipgtValue)*Number(qtyValue)/DollarToQt(1)).toFixed(2)  }
                className="peer block w-full rounded-md border border-gray-200   bg-gray-300 py-2 pl-10 text-xs outline-2 placeholder:text-gray-500"
                aria-describedby="costtotalbypurchase-error"
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="costtotalbypurchase-error" aria-live="polite" aria-atomic="true">
        {state.errors?.costtotalbypurchase&&
          state.errors.costtotalbypurchase.map((error: string) => (
            <p className="mt-2 text-xs text-red-500" key={error}>
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


           {/* Cost Sales Q*/}
           <div className="mb-4">
          <label htmlFor="costsaleuq" className="mb-2 block text-xs font-medium">
          Cost Sale U. Q
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="costsaleuq"
                name="costsaleuq"
                type="text"
                value={(((invValue/qtyValue)*DollarToQt(1))+(Number(costshipusValue)+Number(costshipgtValue))).toFixed(2)  }
                className="peer block w-full rounded-md border border-gray-200   bg-gray-300 py-2 pl-10 text-xs outline-2 placeholder:text-gray-500"
                aria-describedby="costsaleuq-error"
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="costsaleuq-error" aria-live="polite" aria-atomic="true">
        {state.errors?.costsaleuq&&
          state.errors.costsaleuq.map((error: string) => (
            <p className="mt-2 text-xs text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
          </div>
        </div>

         {/* MU %*/}
 <div className="mb-4">
          <label htmlFor="mu" className="mb-2 block text-xs font-medium">
          MU %
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="mu"
                name="mu"
                type="number"
                min="-100"
                value={muValue}
                step="1"
                onChange={handleInputChangeMU}
                placeholder="Enter mu"
                className="peer block w-full rounded-md border bg-sky-100 hover:bg-yellow-50 border-gray-200 py-2 pl-10 text-xs outline-2 placeholder:text-gray-500"
                aria-describedby="mu-error"
              />
              <ReceiptPercentIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="mu-error" aria-live="polite" aria-atomic="true">
        {state.errors?.mu &&
          state.errors.mu.map((error: string) => (
            <p className="mt-2 text-xs text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
          </div>
        </div>


           {/* Price Sales Q O5/(1-P5) Q59,48 / (1 - 34%)*/}
           <div className="mb-4">
          <label htmlFor="pricesaleuq" className="mb-2 block text-xs font-medium">
          Price Sale U. Q
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="pricesaleuq"
                name="pricesaleuq"
                type="text"
                value={(Math.floor((((invValue/qtyValue)*DollarToQt(1))+(Number(costshipusValue)+Number(costshipgtValue)))/(1-(muValue/100)))).toFixed(2) }
                //value={Math.floor(59.48/(1-(34/100)))}
                className="peer block w-full rounded-md border border-gray-200  bg-green-400 py-2 pl-10 text-xs outline-2 placeholder:text-gray-500"
                aria-describedby="pricesaleuq-error"
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="pricesaleuq-error" aria-live="polite" aria-atomic="true">
        {state.errors?.pricesaleuq&&
          state.errors.pricesaleuq.map((error: string) => (
            <p className="mt-2 text-xs text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
          </div>
        </div>


           {/* Utility U Q*/}
           <div className="mb-4">
          <label htmlFor="utility" className="mb-2 block text-xs font-medium">
          Utility U. Q
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="utility"
                name="utility"
                type="text"

                value={(( (Math.floor((((invValue/qtyValue)*DollarToQt(1))+(Number(costshipusValue)+Number(costshipgtValue)))/(1-(muValue/100)))).toFixed(2) )  -   (((invValue/qtyValue)*DollarToQt(1))+(Number(costshipusValue)+Number(costshipgtValue))).toFixed(2) ).toFixed(2)  }
                className="peer block w-full rounded-md border border-gray-200  bg-gray-600 text-gray-100 py-2 pl-10 text-xs outline-2 placeholder:text-gray-500"
                aria-describedby="utility-error"
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-100 peer-focus:text-gray-900" />
            </div>
            <div id="utility-error" aria-live="polite" aria-atomic="true">
        {state.errors?.utility&&
          state.errors.utility.map((error: string) => (
            <p className="mt-2 text-xs text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
          </div>
        </div>





           {/* Total Utility by Purchase Q*/}
           <div className="mb-4">
          <label htmlFor="totalutilitybyp" className="mb-2 block text-xs font-medium">
          Total Utility by Purchase Q
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="totalutilitybyp"
                name="totalutilitybyp"
                type="text"
                value={((((Math.floor((((invValue/qtyValue)*DollarToQt(1))+(Number(costshipusValue)+Number(costshipgtValue)))/(1-(muValue/100)))).toFixed(2) )  -   (((invValue/qtyValue)*DollarToQt(1))+(Number(costshipusValue)+Number(costshipgtValue))).toFixed(2))   * qtyValue).toFixed(2)}
                className="peer block w-full rounded-md border border-gray-200  bg-gray-300 py-2 pl-10 text-xs outline-2 placeholder:text-gray-500"
                aria-describedby="totalutilitybyp-error"
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="totalutilitybyp-error" aria-live="polite" aria-atomic="true">
        {state.errors?.totalutilitybyp&&
          state.errors.totalutilitybyp.map((error: string) => (
            <p className="mt-2 text-xs text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
          </div>
        </div>

      
        {/* Image 1 %*/}
 <div className="mb-4">
          <label htmlFor="image1" className="mb-2 block text-xs font-medium">
          Images
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="image1"
                name="image1"
                type="url"
               
                placeholder="Enter image1"
                className="peer block w-full rounded-md border bg-sky-100 hover:bg-yellow-50 border-gray-200 py-2 pl-10 text-xs outline-2 placeholder:text-gray-500"
                aria-describedby="mimage1u-error"
              />
              <PhotoIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="image1-error" aria-live="polite" aria-atomic="true">
        {state.errors?.image1 &&
          state.errors.image1.map((error: string) => (
            <p className="mt-2 text-xs text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
          </div>
        </div>

      <button type="button" onClick={inputImage()}>+ Image</button>



        <div aria-live="polite" aria-atomic="true">
          {state.message ? (
            <p className="mt-2 text-xs text-red-500">{state.message}</p>
          ) : null}
        </div>


      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/ui/dashboard/purchases"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Add Purchase</Button>
      </div>
    </form>
    <div>
      
    </div>


   {/* <div>
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
              */}
    </div>


  );
}