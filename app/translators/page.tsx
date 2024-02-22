import CoverImage from "@/components/CoverImage";
import { fetchTranslators } from "@/database/translator";
import Link from "next/link";
import placeholder from '@/public/images/no-image-placeholder.svg'

const TranslatorsPage = async () => {
  const translators = await fetchTranslators();
  return (
    <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 my-3 container">
      {translators.map((translator) => (
        <Link href={`/translators/${translator.translator_name}`} key={translator.translator_id}>
          <CoverImage
            src={translator.translator_logo || placeholder}
            alt={translator.translator_name || 'Unknown translator'}
            title={translator.translator_name || 'Unknown translator'}
            ratioClass="aspect-square"
            radiusClass="rounded-[100vw]"
            centerClass={true}
          />
        </Link>
      ))}
    </div>
  );
}

export default TranslatorsPage