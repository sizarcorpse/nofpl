import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

const ManagerSkeleton = () => (
  <div className="flex justify-between items-center w-full">
    <div className="flex flex-col gap-1 place-self-start">
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-3 w-24" />
    </div>
    <div className="flex flex-col items-end gap-1">
      <Skeleton className="h-3 w-12" />
      <Skeleton className="h-3 w-16" />
      <Skeleton className="h-3 w-14" />
    </div>
  </div>
);

const PlayerSkeleton = () => (
  <div className="py-2 px-2 flex items-center gap-2">
    <Skeleton className="size-10 rounded-full flex-none" />
    <div className="flex flex-col gap-1 flex-1">
      <Skeleton className="h-3 w-16" />
      <Skeleton className="h-3.5 w-24" />
      <Skeleton className="h-3 w-20" />
    </div>
    <div className="flex flex-col items-end gap-1 flex-none">
      <Skeleton className="h-3 w-8" />
      <Skeleton className="h-3 w-6" />
      <Skeleton className="h-3 w-10" />
    </div>
  </div>
);

const TeamGridSkeleton = () => {
  return (
    <div className="w-full grid grid-cols-1 gap-2 justify-items-center max-w-96 lg:grid-cols-2 lg:max-w-3xl xl:grid-cols-3 xl:max-w-6xl 2xl:grid-cols-4 2xl:max-w-384">
      {Array.from({ length: 4 }).map((_, i) => (
        <Card key={i} className="relative w-full gap-2 max-w-96">
          <CardHeader className="gap-0">
            <ManagerSkeleton />
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <Separator />
            <div className="flex flex-col gap-0.5">
              {Array.from({ length: 15 }).map((_, j) => (
                <PlayerSkeleton key={j} />
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TeamGridSkeleton;
