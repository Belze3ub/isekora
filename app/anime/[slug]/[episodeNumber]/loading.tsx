import { Skeleton } from "@/components/ui/skeleton";

const EpisodeLoadingPage = () => {
  return (
    <div className="flex flex-col gap-5">
      <Skeleton className="w-full h-[72px]" />
      <Skeleton className="w-full h-[24rem]" />
      <div className="flex gap-2 flex-wrap">
        <Skeleton className="w-20 h-8" />
        <Skeleton className="w-20 h-8" />
      </div>
      <Skeleton className="w-full h-[15rem]" />
    </div>
  );
}

export default EpisodeLoadingPage