import AcmeLogo from '@/app/ui/acme-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import styles from '@/app/ui/home.module.css';
import { lusitana, anton, rajdhani} from '@/app/ui/fonts';
import Image from 'next/image';


export default function Page() {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="flex h-20 shrink-0 items-end rounded-sm bg-black p-4 md:h-28">
        {/* ... */}
        <AcmeLogo size={"text-[40px]"} color={"text-slate-300"}/> 
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-sm bg-white px-6 py-10 md:w-2/5 md:px-20">
          <p className={`${rajdhani.className} text-xl text-slate-800 md:text-3xl md:leading-normal`} >
            <strong>Welcome to web admin </strong> <br></br> for website {' '}
            <a href="https://nextjs.org/learn/" className="text-slate-500">
              https://newclassicsgt
            </a>
          </p>
          <div
  className="h-0 w-0 border-b-[20px] border-l-[15px] border-r-[15px] border-b-black border-l-transparent border-r-transparent"
/>
          <Link
            href="/login"
            className="flex items-center gap-5 self-start rounded-lg bg-white border-2 border-black px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-black hover:text-white md:text-base"
          >
            <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
        </div>
        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
          {/* Add Hero Images Here */}
          <Image
        src="/head.jpg"
        width={600}
        height={380}
        className="hidden md:block"
        alt="Screenshots of the dashboard project showing desktop version"
      />
           <Image
          src="/head.jpg"
        width={560}
        height={620}
        className="block md:hidden"
        alt="Screenshots of the dashboard project showing desktop version"
      />
        </div>
      </div>
    </main>
  );
}
