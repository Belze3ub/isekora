import { ThemeToggle } from '@/components/ThemeToggle';
import Image from 'next/image';
import Link from 'next/link';
import logo from '@/public/images/logo.svg';
import MobileNav from '@/components/Navbar/MobileNav';
import NavContent from '@/components/Navbar/NavContent';
import SearchTest from '../SearchModal';

const Navbar = () => {
  return (
    <header className="bg-primary ">
      <nav className="flex-between card w-full gap-5 p-4 bg-primary-100">
        <div className="flex items-center gap-5">
          <Link href="/" className="flex gap-2">
            <Image src={logo} width={30} height={30} alt="Isekora" />
            <p className="h2-bold">Isekora</p>
          </Link>
          <div className="hidden md:block">
            <NavContent />
          </div>
        </div>
        <div className="flex justify-end items-center gap-5">
          <SearchTest />
          <ThemeToggle />
          <div className="md:hidden">
            <MobileNav />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
