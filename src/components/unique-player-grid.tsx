import { ELEMENT_TYPE, TEAMS } from "@/utils/data";
import { getElements, getEntryPicks } from "@/utils/db";
import type {
  Manager,
  Managers,
  Player,
  UniquePlayerManager,
} from "@/utils/type";
import Image from "next/image";

interface UniquePlayerGridProps {
  managers: Managers;
  currentEventId: number;
}

const UniquePlayerGrid = async (props: UniquePlayerGridProps) => {
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

  const result: UniquePlayerManager[] = playerIdMap
    .map((playerId) => {
      const player = playersMap.get(playerId);

      if (!player) return null;

      const associated = picksResults
        .map((res, idx) =>
          res.picks.some(
            (pick: { element: number }) => pick.element === playerId
          )
            ? managers[idx]
            : null
        )
        .filter((m): m is Manager => m !== null);

      return { player, managers: associated };
    })
    .filter((item): item is UniquePlayerManager => item !== null);

  return (
    <div className="grid grid-cols-1 gap-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {result.map(({ player, managers }) => {
        const image = `https://resources.premierleague.com/premierleague25/photos/players/110x140/${player.code}.png`;

        return (
          <div
            key={player.id}
            className="relative grid grid-cols-[110px_1fr] gap-4 border border-zinc-900 p-4 hover:bg-zinc-100 dark:hover:bg-zinc-900"
          >
            <Image src={image} alt={player.web_name} width={110} height={140} />

            <div className="absolute top-4 left-2 bg-zinc-900 text-white text-xs font-light w-8 h-8 aspect-square rounded-full flex items-center justify-center">
              {managers.length}
            </div>

            <div className="flex flex-col gap-2 w-full">
              <div className="grid grid-cols-[1fr_60px] items-center">
                <div className="flex flex-col justify-center gap-1">
                  <span className="text-xs font-extralight capitalize leading-3">
                    {ELEMENT_TYPE[player.element_type]}
                  </span>
                  <span className="text-sm font-light capitalize leading-3.5">
                    {player.first_name} {player.second_name}
                  </span>
                  <span
                    className="text-xs font-extralight capitalize leading-3"
                    style={{ color: TEAMS[player.team].color_code }}
                  >
                    {TEAMS[player.team].name}
                  </span>
                </div>

                <div className="flex flex-col items-end justify-center gap-0.5">
                  <span className="text-[11px] font-extralight leading-3">
                    £{(player.now_cost / 10).toFixed(1)}
                  </span>
                  <span className="text-[11px] font-extralight leading-3.5">
                    {player.total_points}
                  </span>
                  <span className="text-[11px] font-extralight leading-3.5">
                    {player.selected_by_percent}%
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap border-t border-zinc-900" />

              <div className="flex flex-wrap">
                {managers.map((manager) => (
                  <div
                    key={manager.entry}
                    className="w-full grid grid-cols-[28px_1fr_100px] items-start justify-start hover:bg-zinc-200 dark:hover:bg-zinc-800 py-1 px-1"
                  >
                    <span className="font-light text-xs leading-4.5">
                      #{manager.rank}
                    </span>

                    <div className="flex flex-col gap-1">
                      <span className="font-light text-xs leading-3.5 capitalize">
                        {manager.player_name.toLowerCase()}
                      </span>
                      <span className="text-xs font-extralight capitalize leading-3">
                        {manager.entry_name.toLowerCase()}
                      </span>
                    </div>

                    <div className="flex flex-col items-end gap-1">
                      <span className="text-[10px] font-extralight capitalize leading-3">
                        {manager.total} Points
                      </span>

                      <span className="text-[10px] font-extralight capitalize leading-3">
                        {manager.event_total} GWP
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UniquePlayerGrid;
