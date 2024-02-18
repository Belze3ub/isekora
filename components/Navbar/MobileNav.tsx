import { Sheet, SheetClose, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { IoMenu } from 'react-icons/io5';
import { Button } from '../ui/button';
import Link from 'next/link';
import Image from 'next/image';
import logo from '@/public/images/logo.svg';
import MobileNavContent from './MobileNavContent';

const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <IoMenu className="h-[1.5rem] w-[1.5rem]" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetClose asChild>
          <Link href="/" className="flex items-center gap-1">
            <Image src={logo} width={30} height={30} alt="Isekora" />
            <p className="h2-bold">Isekora</p>
          </Link>
        </SheetClose>
        <MobileNavContent />
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
