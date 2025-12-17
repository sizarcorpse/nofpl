import Header from "@/components/header";
import TeamGrid from "@/components/team-grid";
import UniquePlayerGrid from "@/components/unique-player-grid";
import { getClassicLeague, getCurrentEvent } from "@/utils/db";
import { searchParamsCache } from "@/utils/parser";
import type { Manager } from "@/utils/type";

export default async function Home(props: PageProps<"/">) {
  const params = await searchParamsCache.parse(props.searchParams);

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
        <div className="flex flex-col items-stretch justify-start gap-4">
          <Header />
          <UniquePlayerGrid
            managers={managers}
            currentEventId={currentEventId}
            params={params}
          />

          <TeamGrid managers={managers} currentEventId={currentEventId} />
        </div>
      </main>
    </div>
  );
}
