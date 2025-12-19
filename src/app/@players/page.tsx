import UniquePlayerGrid from "@/components/unique-player-grid";
import {
  getClassicLeague,
  getCurrentEvent,
  getUniquePlayers,
} from "@/utils/db";
import { searchParamsCache } from "@/utils/parser";
import type { Manager } from "@/utils/type";
import Image from "next/image";

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

  return (
    <UniquePlayerGrid players={players} />
    // <div className="grid grid-cols-1 gap-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    //   {players.map(({ player, managers }) => (
    //     <div
    //       key={player.id}
    //       className="relative grid grid-cols-[110px_1fr] gap-4 border border-zinc-900 p-4 hover:bg-zinc-100 dark:hover:bg-zinc-900"
    //     >
    //       <Image
    //         src={`https://resources.premierleague.com/premierleague25/photos/players/110x140/${player.code}.png`}
    //         alt={player.web_name}
    //         width={110}
    //         height={140}
    //         unoptimized
    //       />

    //       <div className="absolute top-4 left-2 bg-zinc-900 text-white text-xs font-light w-8 h-8 aspect-square rounded-full flex items-center justify-center">
    //         {managers.length}
    //       </div>

    //       <div className="flex flex-col gap-2 w-full">
    // <div className="grid grid-cols-[1fr_60px] items-center">
    //   <div className="flex flex-col justify-center gap-1">
    //     <span className="text-xs font-extralight capitalize leading-3">
    //       {ELEMENT_TYPE[player.element_type]}
    //     </span>
    //     <span className="text-sm font-light capitalize leading-3.5">
    //       {player.first_name} {player.second_name}
    //     </span>
    //     <span
    //       className="text-xs font-extralight capitalize leading-3"
    //       style={{ color: TEAMS[player.team].color_code }}
    //     >
    //       {TEAMS[player.team].name}
    //     </span>
    //   </div>

    //   <div className="flex flex-col items-end justify-center gap-0.5">
    //     <span className="text-[11px] font-extralight leading-3">
    //       £{(player.now_cost / 10).toFixed(1)}
    //     </span>
    //     <span className="text-[11px] font-extralight leading-3.5">
    //       {player.total_points}
    //     </span>
    //     <span className="text-[11px] font-extralight leading-3.5">
    //       {player.selected_by_percent}%
    //     </span>
    //   </div>
    // </div>

    //         <div className="flex flex-wrap border-t border-zinc-900" />

    //         <div className="flex flex-wrap">
    //           {managers.map((manager) => (
    //             <div
    //               key={manager.entry}
    //               className="w-full grid grid-cols-[28px_1fr_100px] items-start justify-start hover:bg-zinc-200 dark:hover:bg-zinc-800 py-1 px-1"
    //             >
    //               <span className="font-light text-xs leading-4.5">
    //                 #{manager.rank}
    //               </span>

    //               <div className="flex flex-col gap-1">
    //                 <span className="font-light text-xs leading-3.5 capitalize">
    //                   {manager.player_name.toLowerCase()}
    //                 </span>
    //                 <span className="text-xs font-extralight capitalize leading-3">
    //                   {manager.entry_name.toLowerCase()}
    //                 </span>
    //               </div>

    //               <div className="flex flex-col items-end gap-1">
    //                 <span className="text-[10px] font-extralight capitalize leading-3">
    //                   {manager.total} Points
    //                 </span>

    //                 <span className="text-[10px] font-extralight capitalize leading-3">
    //                   {manager.event_total} GWP
    //                 </span>
    //               </div>
    //             </div>
    //           ))}
    //         </div>
    //       </div>
    //     </div>
    //   ))}
    // </div>
  );
}
