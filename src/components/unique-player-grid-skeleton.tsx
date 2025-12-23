import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

const PlayerSkeleton = () => (
  <div className="grid grid-cols-[auto_1fr] gap-2 items-end">
    <Skeleton className="w-[88px] h-[112px] rounded-md" />
    <div className="flex flex-col items-stretch justify-start gap-4">
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
  </div>
);

const LiveSkeleton = () => (
  <div className="grid grid-cols-7 bg-secondary px-2 py-3 rounded-md h-9">
    {Array.from({ length: 7 }).map((_, i) => (
      <div key={i} className="flex items-center justify-center gap-2">
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-3 w-6" />
      </div>
    ))}
  </div>
);

const ManagerSkeleton = () => (
  <div className="py-2 px-2 flex items-center gap-2 rounded-md">
    <div className="flex flex-col gap-1 flex-1">
      <Skeleton className="h-3 w-32" />
      <Skeleton className="h-3 w-24" />
    </div>
    <div className="flex flex-col items-end gap-1 flex-none">
      <Skeleton className="h-3 w-16" />
      <Skeleton className="h-3 w-12" />
    </div>
  </div>
);

const TabsSkeleton = () => (
  <div className="gap-4">
    <div className="inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground w-full mb-4">
      <Skeleton className="h-7 w-24 rounded-md" />
      <Skeleton className="h-7 w-24 rounded-md ml-1" />
      <Skeleton className="h-7 w-24 rounded-md ml-1" />
      <Skeleton className="h-7 w-24 rounded-md ml-1" />
    </div>
    <div className="flex flex-col gap-1">
      {Array.from({ length: 5 }).map((_, j) => (
        <ManagerSkeleton key={j} />
      ))}
    </div>
  </div>
);

export default function UniquePlayerGridSkeleton() {
  return (
    <div className="w-full grid grid-cols-1 gap-2 justify-items-center max-w-96 lg:grid-cols-2 lg:max-w-3xl xl:grid-cols-3 xl:max-w-6xl 2xl:grid-cols-4 2xl:max-w-384">
      {Array.from({ length: 8 }).map((_, i) => (
        <Card key={i} className="relative w-full gap-2 max-w-96">
          <CardHeader className="gap-0">
            <PlayerSkeleton />
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <LiveSkeleton />
            <Separator />
            <TabsSkeleton />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
