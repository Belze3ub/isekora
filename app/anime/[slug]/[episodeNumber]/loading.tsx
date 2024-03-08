import { Skeleton } from "@/components/ui/skeleton";

const EpisodeLoadingPage = () => {
  return (
    // <div className="flex flex-col gap-5">
    //   <div className="flex flex-col gap-5">
    //     <div className="w-full h-[72px]">
    //       <Skeleton className="w-full h-full rounded-xl" />
    //     </div>
    //     <div className="w-full aspect-video">
    //       <Skeleton className="w-full h-full" />
    //     </div>
    //     <div className="w-[50%] h-52">
    //       <Skeleton className="w-full h-full" />
    //     </div>
    //     <Skeleton>

    //     </Skeleton>
    //   </div>
    // </div>
    <Skeleton className="w-full h-full" />
  );
}

export default EpisodeLoadingPage