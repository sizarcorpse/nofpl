import { Skeleton } from "@/components/ui/skeleton";

export default function UniquePlayerGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-2 content-start md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="relative grid grid-cols-[1fr] gap-4 border border-zinc-900 rounded-lg"
        >
          {/* Card Header */}
          <div className="grid grid-cols-[74px_1fr] gap-x-4 gap-y-0 items-end p-6 pb-0">
            {/* Player Image */}
            <Skeleton className="w-[73.4px] h-[93.4px]" />

            {/* Player Info */}
            <div className="grid grid-cols-[1fr_60px]">
              <div className="flex flex-col justify-center gap-1">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-20" />
              </div>

              <div className="flex flex-col items-end justify-center gap-0.5">
                <Skeleton className="h-3 w-10" />
                <Skeleton className="h-3.5 w-8" />
                <Skeleton className="h-3.5 w-10" />
              </div>
            </div>
          </div>

          {/* Card Content */}
          <div className="p-6 pt-0">
            {/* Tabs */}
            <div className="gap-4">
              {/* Tabs List */}
              <div className="inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground w-full mb-4">
                <Skeleton className="h-7 w-24 rounded-md" />
                <Skeleton className="h-7 w-24 rounded-md ml-1" />
              </div>

              {/* Tabs Content - Manager List */}
              <div className="flex flex-col gap-1">
                {Array.from({ length: 5 }).map((_, j) => (
                  <div
                    key={j}
                    className="py-2 px-2 flex items-center gap-2 rounded-md"
                  >
                    <div className="flex flex-col gap-1 flex-1">
                      <Skeleton className="h-3 w-32" />
                      <Skeleton className="h-3 w-24" />
                    </div>

                    <div className="flex flex-col items-end gap-1 flex-none">
                      <Skeleton className="h-3 w-16" />
                      <Skeleton className="h-3 w-12" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
