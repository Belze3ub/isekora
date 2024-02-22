import Breadcrumbs from "@/components/Breadcrumbs";

interface Props {
  params: {
    slug: string;
  }
}

const AnimeListLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <>
      <div>{children}</div>
    </>
  );
}

export default AnimeListLayout