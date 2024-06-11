'use client';

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  ClipboardDocumentListIcon,
  SquaresPlusIcon,
  RectangleStackIcon,
  RectangleGroupIcon,
  TruckIcon,
  TableCellsIcon,
  UsersIcon,
  AdjustmentsHorizontalIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Home', href: '/ui/dashboard', icon: HomeIcon },
  { name: 'Boxes', href: '/ui/dashboard/boxes', icon: SquaresPlusIcon },
  {
    name: 'Category',
    href: '/ui/dashboard/inventory',
    icon: RectangleStackIcon,
  },
  {
    name: 'Product',
    href: '/ui/dashboard/inventory',
    icon: RectangleGroupIcon,
  },
  {
    name: 'Purchases',
    href: '/ui/dashboard/inventory',
    icon: ClipboardDocumentListIcon,
  },
  {
    name: 'Shipping',
    href: '/ui/dashboard/inventory',
    icon: TruckIcon,
  },
  {
    name: 'Sales',
    href: '/ui/dashboard/inventory',
    icon: TableCellsIcon,
  },
  {
    name: 'Settings',
    href: '/ui/dashboard/inventory',
    icon: AdjustmentsHorizontalIcon,
  },
  {
    name: 'Users',
    href: '/ui/dashboard/inventory',
    icon: UsersIcon,
  },
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
              'flex h-[30px] grow items-center justify-center gap-2 rounded-sm bg-gray-50 p-3 text-sm font-small hover:bg-slate-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-slate-100 text-blue-600': pathname === link.href,
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