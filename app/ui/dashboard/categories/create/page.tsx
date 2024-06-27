import Form from '@/app/ui/categories/create-form';
import Breadcrumbs from '@/app/ui/categories/breadcrumbs';


export default async function Page() {
   
    return (
      <main>
        <Breadcrumbs
          breadcrumbs={[
            { label: 'Categories', href: '/ui/dashboard/categories' },
            {
              label: 'Create Category',
              href: '/ui/dashboard/categories/create',
              active: true,
            },
          ]}
        />
        <Form/>
      </main>
    );
  }
