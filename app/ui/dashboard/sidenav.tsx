import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import AcmeLogo from '@/app/ui/acme-logo';
import { PowerIcon } from '@heroicons/react/24/outline';
import { signOut } from '@/auth';


export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2 ">
      <Link
        className="mb-2 flex h-90 items-end justify-start rounded-sm bg-slate-200 p-4 md:h-40  hover:bg-slate-100 "
        href="/"
      >
        <div className="w-32 text-slate-50 md:w-40 hover:text-blue-600">
          <AcmeLogo size={"text-[30px]"} />
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-sm bg-slate-200 md:block"></div>
        <form 
           action={async () => {
            'use server';
            await signOut();
          }}>
          <button className="flex h-[40px] w-full grow items-center justify-center gap-2 rounded-sm bg-slate-200 p-3 text-sm font-small hover:bg-slate-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6 " />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}
