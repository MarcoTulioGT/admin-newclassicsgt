import Form from '@/app/ui/clients/edit-form';
import Breadcrumbs from '@/app/ui/clients/breadcrumbs';
import { fetchClientById, fetchDepartaments } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit Clients',
};
 
export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const [client, departamentos] = await Promise.all([fetchClientById(id), fetchDepartaments(),]);
      if (!client) {
        notFound();
      }
      

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Clients', href: '/ui/dashboard/clients' },
          {
            label: 'Edit client',
            href: `/ui/dashboard/clients/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form client={client} departamentos={departamentos} />
    </main>
  );
}