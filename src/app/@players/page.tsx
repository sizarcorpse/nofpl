import UniquePlayerEmpty from "@/components/unique-player-empty";
import UniquePlayerGrid from "@/components/unique-player-grid";
import {
  getClassicLeague,
  getCurrentEventUseCase,
  getUniquePlayersUseCase,
} from "@/utils/db";
import { searchParamsCache } from "@/utils/parser";

export default async function PlayersPage(props: PageProps<"/">) {
  const params = await searchParamsCache.parse(props.searchParams);
  const { id: currentEventId } = await getCurrentEventUseCase();

  const {
    standings: { results: managers },
  } = await getClassicLeague({
    leagueId: Number(186557),
    page: 1,
    newEntries: 1,
    phase: 1,
  });

  const players = await getUniquePlayersUseCase({
    eventId: currentEventId,
    managers: managers,
    historyCount: 5,
    fixturesCount: 5,
    params,
  });

  if (players.length === 0) {
    return <UniquePlayerEmpty />;
  }

  return (
    <div
      id="players"
      className="w-full grid grid-cols-1 justify-items-center pt-32 lg:pt-20 "
    >
      <UniquePlayerGrid players={players} />
    </div>
  );
}
