import TeamGridSkeleton from "@/components/team-grid-skeleton";
import UniquePlayerGridSkeleton from "@/components/unique-player-grid-skeleton";

export default function HomeLoading() {
  return (
    <div className="flex min-h-screen items-stretch justify-stretch bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen min-w-full flex-col items-stretch justify-stretch py-32 px-16 bg-white dark:bg-black">
        <UniquePlayerGridSkeleton />

        <TeamGridSkeleton />
      </main>
    </div>
  );
}
