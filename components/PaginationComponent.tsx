'use client';
import { usePathname, useRouter } from 'next/navigation';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from './ui/pagination';
import { updateURLParams } from '@/lib/utils';

interface Props {
  page: number;
  totalPages: number;
}

const PaginationComponent = ({ page, totalPages }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const previousPage = page > 1 ? page - 1 : 1;
  const nextPage = page < totalPages ? page + 1 : totalPages;

  const handlePageChange = (page: number) => {
    const newParam = { page: page === 1 ? '' : page.toString() };
    updateURLParams(router, pathname, newParam);
  };

  return (
    <Pagination>
      <PaginationContent>
        {page > 1 && (
          <>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => handlePageChange(previousPage)}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink onClick={() => handlePageChange(previousPage)}>
                {previousPage}
              </PaginationLink>
            </PaginationItem>
          </>
        )}
        <PaginationItem>
          <PaginationLink href="#" isActive>
            {page}
          </PaginationLink>
        </PaginationItem>
        {page < totalPages && (
          <>
            <PaginationItem>
              <PaginationLink onClick={() => handlePageChange(nextPage)}>
                {nextPage}
              </PaginationLink>
            </PaginationItem>
            {page + 1 !== totalPages && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationNext onClick={() => handlePageChange(nextPage)} />
            </PaginationItem>
          </>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationComponent;
