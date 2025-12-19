import UniquePlayerGrid from "@/components/unique-player-grid";
import {
  getClassicLeague,
  getCurrentEvent,
  getUniquePlayers,
} from "@/utils/db";
import { searchParamsCache } from "@/utils/parser";
import type { Manager } from "@/utils/type";

export default async function PlayersPage(props: PageProps<"/">) {
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

  const players = await getUniquePlayers({
    currentEventId,
    managers,
    params,
  });

  return <UniquePlayerGrid players={players} />;
}
