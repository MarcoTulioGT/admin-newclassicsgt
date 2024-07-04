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
  { name: 'Home', href: '/ui/dashboard', icon: HomeIcon, mobile: true,  },
  { name: 'Boxes', href: '/ui/dashboard/boxes', icon: SquaresPlusIcon, mobile: false, },
  {
    name: 'Categories',
    href: '/ui/dashboard/categories',
    icon: RectangleStackIcon,
    mobile: false,
  },
  {
    name: 'Purchases',
    href: '/ui/dashboard/purchases',
    icon: ClipboardDocumentListIcon,
    mobile: false,
  },
  {
    name: 'Products',
    href: '/ui/dashboard/products',
    icon: RectangleGroupIcon,
    mobile: false,
  },
  {
    name: 'Sales',
    href: '/ui/dashboard/sales',
    icon: TableCellsIcon,
    mobile: true,
  },
  {
    name: 'Shipping',
    href: '/ui/dashboard/shippings',
    icon: TruckIcon,
    mobile: true,
  },
  {
    name: 'Settings',
    href: '/ui/dashboard/settings',
    icon: AdjustmentsHorizontalIcon,
    mobile: true,
  },
  {
    name: 'Users',
    href: '/ui/dashboard/users',
    icon: UsersIcon,
    mobile: false,
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
              {
                'max-sm:hidden': link.mobile === false,
              },
              'flex h-[30px] grow items-center justify-center gap-2 rounded-sm bg-slate-200 p-3 text-sm font-small hover:bg-slate-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
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