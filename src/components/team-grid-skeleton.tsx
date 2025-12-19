import { Skeleton } from "@/components/ui/skeleton";

const TeamGridSkeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-2 content-start md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="border border-zinc-900 p-4">
          {/* Manager Card Skeleton */}
          <div className="grid grid-cols-[1fr_auto] items-start gap-2 mb-4">
            <div className="flex flex-col gap-1 place-self-start">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-24" />
            </div>

            <div className="flex flex-col items-end gap-1">
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-3 w-14" />
            </div>
          </div>

          {/* Players List Skeleton */}
          <div className="flex flex-col gap-0.5">
            {Array.from({ length: 15 }).map((_, j) => (
              <div key={j} className="py-2 px-2 flex items-center gap-2">
                {/* Avatar */}
                <Skeleton className="size-10 rounded-full flex-none" />

                {/* Player Info */}
                <div className="flex flex-col gap-1 flex-1">
                  <Skeleton className="h-3 w-16" />
                  <Skeleton className="h-3.5 w-24" />
                  <Skeleton className="h-3 w-20" />
                </div>

                {/* Player Stats */}
                <div className="flex flex-col items-end gap-1 flex-none">
                  <Skeleton className="h-3 w-8" />
                  <Skeleton className="h-3 w-6" />
                  <Skeleton className="h-3 w-10" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TeamGridSkeleton;
