import Form from '@/app/ui/boxes/create-form';
import Breadcrumbs from '@/app/ui/boxes/breadcrumbs';


export default async function Page() {
   
    return (
      <main>
        <Breadcrumbs
          breadcrumbs={[
            { label: 'Boxes', href: '/ui/dashboard/boxes' },
            {
              label: 'Create Box',
              href: '/ui/dashboard/boxes/create',
              active: true,
            },
          ]}
        />
        <Form/>
      </main>
    );
  }
