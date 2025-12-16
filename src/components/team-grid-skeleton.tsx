const TeamGridSkeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="border border-zinc-900 p-4 animate-pulse">
          <div className="grid grid-cols-[40px_1fr_100px] items-center gap-2">
            <div className="h-4 bg-zinc-300 rounded"></div>
            <div className="flex flex-col gap-1">
              <div className="h-4 bg-zinc-300 rounded w-3/4"></div>
              <div className="h-3 bg-zinc-300 rounded w-1/2"></div>
            </div>
            <div className="flex flex-col items-end gap-1">
              <div className="h-3 bg-zinc-300 rounded w-16"></div>
              <div className="h-3 bg-zinc-300 rounded w-12"></div>
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-0.5">
            {Array.from({ length: 15 }).map((_, j) => (
              <div
                key={j}
                className="grid grid-cols-[48px_1fr] gap-2 border-b border-zinc-800 last:border-0 last:pb-0"
              >
                <div className="h-12 bg-zinc-300 rounded"></div>
                <div className="grid grid-cols-[1fr_60px] items-center">
                  <div className="flex flex-col gap-1">
                    <div className="h-3 bg-zinc-300 rounded w-20"></div>
                    <div className="h-4 bg-zinc-300 rounded w-32"></div>
                    <div className="h-3 bg-zinc-300 rounded w-24"></div>
                  </div>
                  <div className="flex flex-col items-end gap-0.5">
                    <div className="h-3 bg-zinc-300 rounded w-8"></div>
                    <div className="h-3 bg-zinc-300 rounded w-6"></div>
                    <div className="h-3 bg-zinc-300 rounded w-10"></div>
                  </div>
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
