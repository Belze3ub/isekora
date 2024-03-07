import { ThemeToggle } from '@/components/ThemeToggle';
import Image from 'next/image';
import Link from 'next/link';
import logo from '@/public/images/logo.svg';
import MobileNav from '@/components/Navbar/MobileNav';
import NavContent from '@/components/Navbar/NavContent';
import SearchModal from '../SearchModal';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import LoggedInUser from '../LoggedInUser';

const Navbar = async () => {
  const session = await getServerSession(authOptions);

  return (
    <header className="bg-primary">
      <nav className="flex-between card w-full gap-5 p-4 bg-primary-100 flex-wrap">
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
          <SearchModal />
          <ThemeToggle />
          <div className="hidden md:block">
            {!session && <Link href="/api/auth/signin">Sign In</Link>}
            {session && (
              // <div>
              //   {session?.user?.name}
              //   <Link href="/api/auth/signout" className="ml-5">
              //     Sign Out
              //   </Link>
              // </div>
              <LoggedInUser {...session} />
            )}
          </div>
          <div className="md:hidden">
            <MobileNav />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
