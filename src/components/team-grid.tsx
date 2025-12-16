import TeamCard from "@/components/team-card";
import { getElements, getEntryPicks } from "@/utils/db";
import type { Manager, Managers, Player, Players, Teams } from "@/utils/type";

interface TeamGridProps {
  managers: Managers;
  currentEventId: number;
}

const TeamGrid = async (props: TeamGridProps) => {
  const { managers, currentEventId } = props;

  const picksPromises = managers.map((manager: Manager) =>
    getEntryPicks({
      entryId: manager.entry,
      eventId: currentEventId,
    })
  );

  const picksResults = await Promise.all(picksPromises);

  const playerIds = picksResults.flatMap((result) =>
    result.picks.map((pick: { element: number }) => pick.element)
  );

  const playerIdMap = Array.from(new Set(playerIds));
  const players = await getElements({ elementIds: playerIdMap });
  const playersMap = new Map(players.map((el: Player) => [el.id, el]));

  const teams = managers.map((manager: Manager, index: number) => {
    const players = picksResults[index].picks
      .map((pick: { element: number }) => playersMap.get(pick.element))
      .filter(Boolean) as Players;

    return {
      manager: manager,
      players: players,
    };
  }) as Teams;

  return (
    <div className="grid grid-cols-1 gap-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {teams.map((team) => (
        <TeamCard key={team.manager.entry} team={team} />
      ))}
    </div>
  );
};

export default TeamGrid;
