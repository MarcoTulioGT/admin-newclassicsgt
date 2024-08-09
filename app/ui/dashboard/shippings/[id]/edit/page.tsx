import Form from '@/app/ui/shippings/edit-form';
import Breadcrumbs from '@/app/ui/shippings/breadcrumbs';
import { fetchShippingById } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit Shippings',
};
 
export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const [shipping] = await Promise.all([fetchShippingById(id)]);
      if (!shipping) {
        notFound();
      }
      
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Shippings', href: '/ui/dashboard/shippings' },
          {
            label: 'Edit Shipping',
            href: `/ui/dashboard/shippings/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form shipping={shipping} />
    </main>
  );
}