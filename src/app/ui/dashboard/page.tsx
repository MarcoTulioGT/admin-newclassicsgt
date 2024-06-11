import { lusitana, rajdhani } from '@/app/ui/fonts';
import { Suspense } from 'react';
export default async function Page() {
   return (
    <main>
      <h1 className={`${rajdhani.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
    </main>
  );
}