import { Session } from 'next-auth';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Button } from './ui/button';
import Link from 'next/link';
import { FaRegUser } from 'react-icons/fa';

const LoggedInUser = (session: Session) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <Button size="icon">
            <AvatarImage src={session.user?.image!} alt='Awatar użytkownika' />
            <span className="sr-only">Menu Użytkownika</span>
            <AvatarFallback>
              <FaRegUser size={20} />
            </AvatarFallback>
          </Button>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <Link href="/api/auth/signout" className="ml-5">
            Wyloguj
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LoggedInUser;
