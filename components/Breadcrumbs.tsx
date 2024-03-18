'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LuDot } from 'react-icons/lu';

// interface Props {
//   slug: string;
//   title: string;
//   episodeNumber: string;
// }

const Breadcrumbs = ({ title }: { title?: string }) => {
  const currentPath = usePathname();
  const pathnames = currentPath.split('/').filter((x) => x);

  return (
    <>
      <Link href="/" className="hover:text-accent py-2">
        Home
      </Link>
      {pathnames.map((value, index) => {
        value = value[0].toUpperCase() + value.slice(1);
        title && index === 1 ? (value = title) : value;
        const last = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;

        return (
          <div key={to} className="flex items-center">
            <div className="mx-2">
              <LuDot size={20} />
            </div>
            {last ? (
              <div className="cursor-default">{value}</div>
            ) : (
              <Link href={to} className="hover:text-accent py-2">
                {value}
              </Link>
            )}
          </div>
        );
      })}
    </>
    // <>
    //   <Link href="/" className="hover:text-accent">
    //     Home
    //   </Link>
    //   <div>/</div>
    //   <Link href="/anime" className="hover:text-accent">
    //     Anime
    //   </Link>
    //   <div>/</div>
    //   <Link href={`/anime/${slug}`} className="hover:text-accent">
    //     {title}
    //   </Link>
    //   <div>/</div>
    //   <Link href={`/anime/${slug}/${episodeNumber}`} className="hover:text-accent">
    //     {episodeNumber}
    //   </Link>
    // </>
  );
};

export default Breadcrumbs;
