import Form from '@/app/ui/boxes/edit-form';
import Breadcrumbs from '@/app/ui/boxes/breadcrumbs';
import { fetchBoxById, fetchBoxes } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit Boxes',
};
 
export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const [box, boxes] = await Promise.all([fetchBoxById(id), fetchBoxes(),]);
      if (!box) {
        notFound();
      }
      
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Boxes', href: '/ui/dashboard/boxes' },
          {
            label: 'Edit box',
            href: `/ui/dashboard/boxes/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form box={box} boxes={boxes} />
    </main>
  );
}