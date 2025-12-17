export default function UniquePlayerGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="relative grid grid-cols-[110px_1fr] gap-4 border border-zinc-900 p-4 animate-pulse"
        >
          <div className="h-[140px] w-[110px] bg-zinc-300 rounded" />

          <div className="flex flex-col gap-3 w-full">
            <div className="flex items-center justify-between">
              <div className="space-y-2 w-2/3">
                <div className="h-4 bg-zinc-300 rounded w-3/4" />
                <div className="h-3 bg-zinc-300 rounded w-1/2" />
              </div>

              <div className="flex flex-col items-end gap-2 w-1/3">
                <div className="h-3 bg-zinc-300 rounded w-12" />
                <div className="h-3 bg-zinc-300 rounded w-10" />
              </div>
            </div>

            <div className="h-px bg-zinc-800/30" />

            <div className="flex flex-col gap-2">
              {Array.from({ length: 3 }).map((__, j) => (
                <div
                  key={j}
                  className="w-full grid grid-cols-[28px_1fr_100px] items-start gap-2"
                >
                  <div className="h-4 w-7 bg-zinc-300 rounded" />
                  <div className="h-4 bg-zinc-300 rounded w-full" />
                  <div className="h-4 bg-zinc-300 rounded w-16" />
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
