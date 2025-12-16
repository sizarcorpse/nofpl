import { ELEMENT_TYPE, TEAMS } from "@/utils/data";
import type { Team } from "@/utils/type";
import Image from "next/image";

interface TeamCardProps {
  team: Team;
}

const TeamCard = async (props: TeamCardProps) => {
  const {
    team: { manager, players },
  } = props;

  return (
    <div className="border border-zinc-900 p-4">
      <div className="grid grid-cols-[40px_1fr_100px] items-center gap-2">
        <span className="font-light text-base leading-3.5">
          #{manager.rank}
        </span>

        <div className="flex flex-col gap-1">
          <span className="font-light text-base leading-3.5 capitalize">
            {manager.player_name.toLowerCase()}
          </span>
          <span className="text-xs font-extralight capitalize leading-3">
            {manager.entry_name.toLowerCase()}
          </span>
        </div>

        <div className="flex flex-col items-end gap-1">
          <span className="text-xs font-extralight capitalize leading-3">
            {manager.total} Points
          </span>

          <span className="text-xs font-extralight capitalize leading-3">
            {manager.event_total} GWP
          </span>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-0.5">
        {players.map((element) => {
          const image = `https://resources.premierleague.com/premierleague25/photos/players/110x140/${element.code}.png`;

          return (
            <div
              key={element.id}
              className="grid grid-cols-[48px_1fr] gap-2 border-b border-zinc-800 last:border-0 last:pb-0"
            >
              <div className="flex">
                <Image
                  src={image}
                  alt={element.web_name}
                  width={48}
                  height={48}
                  unoptimized
                  className="object-cover align-top object-top aspect-square"
                />
              </div>
              <div className="grid grid-cols-[1fr_60px] items-center">
                <div className="flex flex-col justify-center gap-1">
                  <span className="text-xs font-extralight capitalize leading-3">
                    {ELEMENT_TYPE[element.element_type]}
                  </span>
                  <span className="text-sm font-light capitalize leading-3.5">
                    {element.first_name} {element.second_name}
                  </span>
                  <span
                    className="text-xs font-extralight capitalize leading-3"
                    style={{ color: TEAMS[element.team].color_code }}
                  >
                    {TEAMS[element.team].name}
                  </span>
                </div>

                <div className="flex flex-col items-end justify-center gap-0.5">
                  <span className="text-[11px] font-extralight leading-3">
                    £{(element.now_cost / 10).toFixed(1)}
                  </span>
                  <span className="text-[11px] font-extralight leading-3.5">
                    {element.total_points}
                  </span>
                  <span className="text-[11px] font-extralight leading-3.5">
                    {element.selected_by_percent}%
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TeamCard;
