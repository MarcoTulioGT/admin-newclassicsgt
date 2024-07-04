import Form from '@/app/ui/categories/create-form';
import Breadcrumbs from '@/app/ui/categories/breadcrumbs';
import { fetchCategories, fetchOrdeno} from '@/app/lib/data';

export default async function Page() {
  const categories = await fetchCategories();
  const ordenno = await fetchOrdeno();

    return (
      <main>
        <Breadcrumbs
          breadcrumbs={[
            { label: 'Categories', href: '/ui/dashboard/categories' },
            {
              label: 'Add Purchase',
              href: '/ui/dashboard/purchases/create',
              active: true,
            },
          ]}
        />
        <Form categories={categories} ordenno={ordenno}/>
      </main>
    );
  }
