import CoverImage from "@/components/CoverImage";
import { fetchTranslators } from "@/database/translator";
import Link from "next/link";
import placeholder from '@/public/images/no-image-placeholder.svg'
import { Metadata } from "next";
import TranslatorsSubscription from "./TranslatorsSubscription";

const TranslatorsPage = async () => {
  const translators = await fetchTranslators();
  return (
    <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 my-3 container">
      <TranslatorsSubscription />
      {translators.map((translator) => (
        <Link
          href={`/translators/${translator.translator_name}`}
          key={translator.translator_id}
        >
          <CoverImage
            src={translator.translator_logo || placeholder}
            alt={
              `Logo grupy suberskiej ${translator.translator_name}` ||
              'Logo nieznanej grupy suberskiej'
            }
            title={translator.translator_name || 'Nieznana grupa suberska'}
            ratioClass="aspect-square"
            radiusClass="rounded-[100vw]"
            centerClass={true}
          />
        </Link>
      ))}
    </div>
  );
}

export const metadata: Metadata = {
  title: 'Lista grup suberskich - Isekora',
  description: 'Lista wszystkich dostępnych grup suberskich dostępnych na naszym serwisie',
};

export default TranslatorsPage