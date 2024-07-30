import Form from '@/app/ui/sales/create-form';
import Breadcrumbs from '@/app/ui/purchases/breadcrumbs';
import { fetchDepartaments, fetchProducts} from '@/app/lib/data';

export default async function Page() {
  const departamentos = await fetchDepartaments();
  const products = await fetchProducts();

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
        <Form departamentos={departamentos} products={products}/>
      </main>
    );
  }
