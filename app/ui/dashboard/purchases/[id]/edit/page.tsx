import Form from '@/app/ui/purchases/edit-form';
import Breadcrumbs from '@/app/ui/purchases/breadcrumbs';
import { fetchPurchaseById, fetchBoxes } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit Purchase',
};
 
export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const [purchase, boxes] = await Promise.all([fetchPurchaseById(id), fetchBoxes(),]);
      if (!purchase) {
        notFound();
      }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Purchases', href: '/ui/dashboard/purchases' },
          {
            label: 'Edit Purchase',
            href: `/ui/dashboard/purchases/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form purchase={purchase} boxes={boxes} />
    </main>
  );
}