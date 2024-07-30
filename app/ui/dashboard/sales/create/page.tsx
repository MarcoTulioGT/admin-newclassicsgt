import Form from '@/app/ui/sales/create-form';
import Breadcrumbs from '@/app/ui/purchases/breadcrumbs';
import { fetchDepartaments, fetchBoxes} from '@/app/lib/data';

export default async function Page() {
  const departamentos = await fetchDepartaments();
  const boxes = await fetchBoxes();

    return (
      <main>
        <Breadcrumbs
          breadcrumbs={[
            { label: 'Sales', href: '/ui/dashboard/sales' },
            {
              label: 'Add Sale',
              href: '/ui/dashboard/sales/create',
              active: true,
            },
          ]}
        />
        <Form departamentos={departamentos} boxes={boxes}/>
      </main>
    );
  }
