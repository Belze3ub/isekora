'use client';
import Link from 'next/link';
import { navbarLinks } from '@/constants';
import { usePathname } from 'next/navigation';

const NavContent = () => {
  const currentPath = usePathname();
  return (
    <section className="flex gap-5">
      {navbarLinks.map((link) => {
        const isActive = currentPath === link.route;
        return (
          <Link key={link.label} href={link.route}>
            <p
              className={`${
                isActive ? 'base-bold text-accent' : 'base-medium'
              }`}
            >
              {link.label}
            </p>
          </Link>
        );
      })}
    </section>
  );
};

export default NavContent;
