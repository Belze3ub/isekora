'use client';
import Link from 'next/link';
import { SheetClose } from '../ui/sheet';
import { navbarLinks } from '@/constants';
import { usePathname } from 'next/navigation';

const MobileNavContent = () => {
  const currentPath = usePathname();
  return (
    <section className="flex flex-col h-full items-center gap-5 pt-10">
      {navbarLinks.map((link) => {
        const isActive =
          (currentPath.includes(link.route) && link.route.length > 1) ||
          currentPath === link.route;
        return (
          <SheetClose asChild key={link.label}>
            <Link
              href={link.route}
              className={`${
                isActive ? 'bg-primary' : 'bg-secondary'
              } w-full rounded-lg flex p-4 justify-center`}
            >
              <p className={`${isActive ? 'base-bold' : 'base-medium'}`}>
                {link.label}
              </p>
            </Link>
          </SheetClose>
        );
      })}
    </section>
  );
};

export default MobileNavContent;
