'use client'
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
import { updateURLParams } from './FormatSelect';

interface Props {
  page: number;
  totalPages: number;
  genres: string;
  format: string;
}

const PaginationComponent = ({ page, totalPages, genres, format }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const previousPage = page > 1 ? page - 1 : 1;
  const nextPage = page < totalPages ? page + 1 : totalPages;

    const handlePageChange = (page: number) => {
      const params = { page: page === 1 ? '' : page.toString(), genres, format };
      updateURLParams(router, pathname, params);
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
