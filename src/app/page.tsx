import TeamGrid from "@/components/team-grid";
import TeamGridSkeleton from "@/components/team-grid-skeleton";
import UniquePlayerGrid from "@/components/unique-player-grid";
import { getClassicLeague, getCurrentEvent } from "@/utils/db";
import type { Manager } from "@/utils/type";
import { Suspense } from "react";

export default async function Home() {
  const { id: currentEventId } = await getCurrentEvent();

  const {
    standings: { results: managers },
  } = (await getClassicLeague({
    leagueId: Number(186557),
    page: 1,
    newEntries: 1,
    phase: 1,
  })) as {
    standings: {
      results: Manager[];
    };
  };

  return (
    <div className="flex min-h-screen items-stretch justify-stretch bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen min-w-full flex-col items-stretch justify-stretch py-32 px-16 bg-white dark:bg-black">
        <Suspense fallback={<div>Loading Unique Players...</div>}>
          <UniquePlayerGrid
            managers={managers}
            currentEventId={currentEventId}
          />
        </Suspense>
        <Suspense fallback={<TeamGridSkeleton />}>
          <TeamGrid managers={managers} currentEventId={currentEventId} />
        </Suspense>
      </main>
    </div>
  );
}
