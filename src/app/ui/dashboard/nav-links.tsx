'use client';

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  ClipboardDocumentListIcon,
  SquaresPlusIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Home', href: '/ui/dashboard', icon: HomeIcon },
  {
    name: 'Inventory',
    href: '/ui/dashboard/inventory',
    icon: ClipboardDocumentListIcon,
  },
  { name: 'Boxes', href: '/ui/dashboard/boxes', icon: SquaresPlusIcon },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
             className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-slate-300 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-slate-300 text-blue-600': pathname === link.href,
              },
            )}
            >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}