import Form from '@/app/ui/categories/edit-form';
import Breadcrumbs from '@/app/ui/categories/breadcrumbs';
import { fetchCategoryById, fetchCategories } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit Category',
};
 
export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const [category, categories] = await Promise.all([fetchCategoryById(id), fetchCategories(),]);
      if (!category) {
        notFound();
      }
      console.log(category)  
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Categories', href: '/ui/dashboard/categories' },
          {
            label: 'Edit category',
            href: `/ui/dashboard/categories/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form category={category} categories={categories} />
    </main>
  );
}