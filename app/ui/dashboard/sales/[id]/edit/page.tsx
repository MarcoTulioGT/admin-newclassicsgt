import Form from '@/app/ui/sales/edit-form';
import Breadcrumbs from '@/app/ui/sales/breadcrumbs';
import { fetchSaleById } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit Sales',
};
 
export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const [sale] = await Promise.all([fetchSaleById(id)]);
      if (!sale) {
        notFound();
      }
      
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Sales', href: '/ui/dashboard/sales' },
          {
            label: 'Edit Sale',
            href: `/ui/dashboard/sales/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form sale={sale} />
    </main>
  );
}