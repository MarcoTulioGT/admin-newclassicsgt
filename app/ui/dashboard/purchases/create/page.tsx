import Form from '@/app/ui/purchases/create-form';
import Breadcrumbs from '@/app/ui/purchases/breadcrumbs';
import { fetchCategories, fetchBoxes} from '@/app/lib/data';

export default async function Page() {
  const categories = await fetchCategories();
  const boxes = await fetchBoxes();

    return (
      <main>
        <Breadcrumbs
          breadcrumbs={[
            { label: 'Purchases', href: '/ui/dashboard/purchases' },
            {
              label: 'Add Purchase',
              href: '/ui/dashboard/purchases/create',
              active: true,
            },
          ]}
        />
        <Form categories={categories} boxes={boxes}/>
      </main>
    );
  }
