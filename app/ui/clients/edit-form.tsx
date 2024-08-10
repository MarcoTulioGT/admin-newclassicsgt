'use client';

import { DepartamentField, ClientForm } from '@/app/lib/definitions';
import {
  ArchiveBoxArrowDownIcon, XCircleIcon, CheckCircleIcon, ListBulletIcon, TagIcon, InformationCircleIcon, PhotoIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { updateClient } from '@/app/lib/actions';
import { useFormState } from 'react-dom';
import { useState, useEffect } from 'react';
import { formatDateToLocal, formatDateGT } from '@/app/lib/utils';



export default function EditClientsForm({
    client,
    departamentos,
}: {
    client: ClientForm;
    departamentos: DepartamentField[];
}) {
  let deptos = departamentos.map(function(element, index){
    return  element.departamento
   });
  

   console.log(client)
  const initialState = { message: null, errors: {} };
  const updateClientsWithId = updateClient.bind(null, client.id);
  const [state, dispatch] = useFormState(updateClientsWithId, initialState);
  const [depto, setDepto] = useState();
  const [muni, setMuni] = useState(client.city);
  const [zona, setZona] = useState(client.zone);
  const [municipios, setMunicipios] = useState([]);
  const [zonas, setZonas] = useState([]);

  useEffect(() => {
    let municipio = departamentos.filter( element => element.departamento === client.depto);
    setMunicipios(municipio[0].municipio)

    let zona = municipio[0].municipio.filter( element => element.Municipio === client.city);
    setZonas(zona[0].zonas)
}, []);



 
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


  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">

               {/* Clients Name */}
               <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-xs font-medium">
            Client name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="name"
                name="name"
                type="text"
                defaultValue={client.name}
                placeholder="Enter client"
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


      {/* clients Address */}
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
                defaultValue={client.address}
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
              defaultValue={client.depto}
              className="peer block w-full cursor-pointer rounded-md border  bg-sky-100 hover:bg-yellow-50 border-gray-200 py-2 pl-10 text-xs outline-2 placeholder:text-gray-500"            
              >
              <option value="" >
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

{/* municipio  */}
<div className="mb-4">
          <label htmlFor="city" className="mb-2 block text-xs font-medium">
            Choose municipio
          </label>
          <div className="relative">
            <select
              id="city"
              name="city"
              onChange={handleSelectChangeMuni}
              value={muni}
              className="peer block w-full cursor-pointer rounded-md border  bg-sky-100 hover:bg-yellow-50 border-gray-200 py-2 pl-10 text-xs outline-2 placeholder:text-gray-500"            
              >
              <option value="" >
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

{/* zona  */}
<div className="mb-4">
          <label htmlFor="zone" className="mb-2 block text-xs font-medium">
            Choose zona
          </label>
          <div className="relative">
            <select
              id="zone"
              name="zone"
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
                defaultValue={client.phone}              
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



        <div aria-live="polite" aria-atomic="true">
          {state.message ? (
            <p className="mt-2 text-sm text-red-500">{state.message}</p>
          ) : null}
        </div>

        
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/ui/dashboard/clients"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Edit Clients</Button>
      </div>
    </form>
  );
}
