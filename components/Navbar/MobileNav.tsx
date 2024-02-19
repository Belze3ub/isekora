import { Sheet, SheetClose, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { IoClose, IoMenu } from 'react-icons/io5';
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
        <div className="flex-between">
          <SheetClose asChild>
            <Link href="/" className="inline-flex gap-2">
              <Image src={logo} width={30} height={30} alt="Isekora" />
              <p className="h2-bold">Isekora</p>
            </Link>
          </SheetClose>
          <SheetClose className="hover:bg-accent rounded-lg p-2">
            <IoClose />
            <span className="sr-only">Close</span>
          </SheetClose>
        </div>
        <MobileNavContent />
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
