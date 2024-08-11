import Form from '@/app/ui/sales/create-form-id';
import Breadcrumbs from '@/app/ui/sales/breadcrumbs';
import { fetchClientById, fetchDepartaments, fetchProducts } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Sale',
};

 
export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const [client, departamentos, products] = await Promise.all([fetchClientById(id), fetchDepartaments(), fetchProducts(), ]);
      if (!client) {
        notFound();
      }
      

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Sales', href: '/ui/dashboard/sales' },
          {
            label: 'Create Sale',
            href: `/ui/dashboard/sales/${id}/create`,
            active: true,
          },
        ]}
      />
      <Form client={client} departamentos={departamentos} products={products} />
    </main>
  );
}